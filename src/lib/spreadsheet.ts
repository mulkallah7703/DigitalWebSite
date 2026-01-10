import { google } from 'googleapis'
import { db } from './db'
import { slugify } from './utils'
import type { SpreadsheetProduct } from '@/types'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  })
  return auth
}

export async function fetchSpreadsheetProducts(): Promise<SpreadsheetProduct[]> {
  const auth = await getAuthClient()
  const sheets = google.sheets({ version: 'v4', auth })

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID is not configured')
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Products!A2:J', // Columns: slug, title_en, title_ar, description_en, description_ar, price, image_url, video_url, category, status
  })

  const rows = response.data.values || []

  return rows
    .filter((row) => row[0] && row[1]) // Must have slug and title_en
    .map((row, index) => ({
      rowId: `row_${index + 2}`,
      slug: (row[0] || '').trim().toLowerCase(),
      titleEn: (row[1] || '').trim(),
      titleAr: row[2] ? (row[2] as string).trim() : undefined,
      descriptionEn: (row[3] || '').trim(),
      descriptionAr: row[4] ? (row[4] as string).trim() : undefined,
      price: parseFloat(row[5] || '0') || 0,
      imageUrl: (row[6] || '').trim(),
      videoUrl: row[7] ? (row[7] as string).trim() : undefined,
      category: (row[8] || 'Uncategorized').trim(),
      status: (row[9]?.toUpperCase() as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') || 'DRAFT',
    }))
}

export async function syncProductsFromSpreadsheet() {
  const startedAt = new Date()
  let rowsProcessed = 0
  let rowsCreated = 0
  let rowsUpdated = 0
  let rowsDeleted = 0
  const errors: { row: string; error: string }[] = []

  try {
    const spreadsheetProducts = await fetchSpreadsheetProducts()
    rowsProcessed = spreadsheetProducts.length

    // Get all existing products (to track which ones are in spreadsheet)
    const allProducts = await db.product.findMany({
      where: { spreadsheetRowId: { not: null } },
      select: { id: true, slug: true, spreadsheetRowId: true },
    })

    const spreadsheetSlugs = new Set(spreadsheetProducts.map((p) => p.slug))
    const existingSlugMap = new Map(allProducts.map((p) => [p.slug, p]))

    // Process each product from spreadsheet
    for (const product of spreadsheetProducts) {
      try {
        // Validate required fields
        if (!product.slug || !product.titleEn) {
          errors.push({
            row: product.rowId,
            error: 'Missing required fields: slug or title_en',
          })
          continue
        }

        if (product.price <= 0) {
          errors.push({
            row: product.rowId,
            error: 'Price must be greater than 0',
          })
          continue
        }

        // Find or create category
        const categorySlug = slugify(product.category)
        let category = await db.category.findUnique({
          where: { slug: categorySlug },
        })

        if (!category) {
          category = await db.category.create({
            data: {
              name: product.category,
              slug: categorySlug,
            },
          })
        }

        const productData = {
          name: product.titleEn,
          nameAr: product.titleAr || null,
          slug: product.slug,
          description: product.descriptionEn,
          descriptionAr: product.descriptionAr || null,
          price: product.price,
          categoryId: category.id,
          status: product.status,
          videoUrl: product.videoUrl || null,
          spreadsheetRowId: product.rowId,
          lastSyncedAt: new Date(),
        }

        // Check if product exists by slug
        const existingProduct = existingSlugMap.get(product.slug)

        if (existingProduct) {
          // Update existing product
          await db.product.update({
            where: { id: existingProduct.id },
            data: productData,
          })

          // Update images - delete old and create new
          if (product.imageUrl) {
            await db.productImage.deleteMany({
              where: { productId: existingProduct.id },
            })

            await db.productImage.create({
              data: {
                url: product.imageUrl,
                productId: existingProduct.id,
                order: 0,
              },
            })
          }

          rowsUpdated++
        } else {
          // Create new product
          const newProduct = await db.product.create({
            data: productData,
          })

          // Add image if provided
          if (product.imageUrl) {
            await db.productImage.create({
              data: {
                url: product.imageUrl,
                productId: newProduct.id,
                order: 0,
              },
            })
          }

          rowsCreated++
        }
      } catch (error) {
        errors.push({
          row: product.rowId,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Soft-delete products that are no longer in spreadsheet (set status to ARCHIVED)
    const productsToArchive = allProducts.filter(
      (p) => p.spreadsheetRowId && !spreadsheetSlugs.has(p.slug)
    )

    if (productsToArchive.length > 0) {
      await db.product.updateMany({
        where: {
          id: { in: productsToArchive.map((p) => p.id) },
        },
        data: {
          status: 'ARCHIVED',
          lastSyncedAt: new Date(),
        },
      })
      rowsDeleted = productsToArchive.length
    }

    // Log sync result
    await db.spreadsheetSyncLog.create({
      data: {
        status: errors.length > 0 ? 'COMPLETED_WITH_ERRORS' : 'SUCCESS',
        rowsProcessed,
        rowsCreated,
        rowsUpdated,
        rowsDeleted,
        errors: errors.length > 0 ? errors : undefined,
        startedAt,
        completedAt: new Date(),
      },
    })

    return {
      success: true,
      rowsProcessed,
      rowsCreated,
      rowsUpdated,
      rowsDeleted,
      errors,
    }
  } catch (error) {
    await db.spreadsheetSyncLog.create({
      data: {
        status: 'FAILED',
        rowsProcessed,
        rowsCreated,
        rowsUpdated,
        rowsDeleted,
        errors: [{ error: error instanceof Error ? error.message : 'Unknown error' }],
        startedAt,
        completedAt: new Date(),
      },
    })

    throw error
  }
}
