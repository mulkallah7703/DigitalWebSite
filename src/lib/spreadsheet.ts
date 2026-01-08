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
    range: 'Products!A2:K', // Assumes headers in row 1
  })

  const rows = response.data.values || []

  return rows.map((row, index) => ({
    rowId: `row_${index + 2}`,
    name: row[0] || '',
    description: row[1] || '',
    price: parseFloat(row[2]) || 0,
    comparePrice: row[3] ? parseFloat(row[3]) : undefined,
    category: row[4] || 'Uncategorized',
    tags: row[5] ? row[5].split(',').map((t: string) => t.trim()) : [],
    images: row[6] ? row[6].split(',').map((url: string) => url.trim()) : [],
    fileUrl: row[7] || '',
    status: (row[8] as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') || 'DRAFT',
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

    // Get existing products synced from spreadsheet
    const existingProducts = await db.product.findMany({
      where: { spreadsheetRowId: { not: null } },
      select: { id: true, spreadsheetRowId: true },
    })

    const existingRowIds = new Set(existingProducts.map((p) => p.spreadsheetRowId))
    const newRowIds = new Set(spreadsheetProducts.map((p) => p.rowId))

    // Process each product from spreadsheet
    for (const product of spreadsheetProducts) {
      try {
        // Find or create category
        let category = await db.category.findUnique({
          where: { slug: slugify(product.category) },
        })

        if (!category) {
          category = await db.category.create({
            data: {
              name: product.category,
              slug: slugify(product.category),
            },
          })
        }

        const productData = {
          name: product.name,
          slug: slugify(product.name),
          description: product.description,
          price: product.price,
          comparePrice: product.comparePrice,
          categoryId: category.id,
          status: product.status,
          spreadsheetRowId: product.rowId,
          lastSyncedAt: new Date(),
          aiTags: product.tags,
        }

        // Check if product exists
        const existingProduct = await db.product.findFirst({
          where: { spreadsheetRowId: product.rowId },
        })

        if (existingProduct) {
          // Update existing product
          await db.product.update({
            where: { id: existingProduct.id },
            data: productData,
          })
          rowsUpdated++
        } else {
          // Create new product
          const newProduct = await db.product.create({
            data: productData,
          })

          // Add images
          if (product.images.length > 0) {
            await db.productImage.createMany({
              data: product.images.map((url, index) => ({
                url,
                productId: newProduct.id,
                order: index,
              })),
            })
          }

          // Add file if provided
          if (product.fileUrl) {
            await db.productFile.create({
              data: {
                name: `${product.name} - Download`,
                url: product.fileUrl,
                size: 0,
                type: 'application/octet-stream',
                productId: newProduct.id,
              },
            })
          }

          rowsCreated++
        }

        // Handle tags
        for (const tagName of product.tags) {
          let tag = await db.tag.findUnique({
            where: { slug: slugify(tagName) },
          })

          if (!tag) {
            tag = await db.tag.create({
              data: {
                name: tagName,
                slug: slugify(tagName),
              },
            })
          }

          const productRecord = await db.product.findFirst({
            where: { spreadsheetRowId: product.rowId },
          })

          if (productRecord) {
            await db.productTag.upsert({
              where: {
                productId_tagId: {
                  productId: productRecord.id,
                  tagId: tag.id,
                },
              },
              create: {
                productId: productRecord.id,
                tagId: tag.id,
              },
              update: {},
            })
          }
        }
      } catch (error) {
        errors.push({
          row: product.rowId,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Delete products that are no longer in spreadsheet
    const rowsToDelete = Array.from(existingRowIds).filter((id) => id && !newRowIds.has(id))
    if (rowsToDelete.length > 0) {
      await db.product.deleteMany({
        where: { spreadsheetRowId: { in: rowsToDelete as string[] } },
      })
      rowsDeleted = rowsToDelete.length
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
