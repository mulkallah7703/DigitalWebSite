import OpenAI from 'openai'
import { db } from './db'
import type { AIRecommendation } from '@/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateProductRecommendations(
  userId: string,
  limit = 8
): Promise<AIRecommendation[]> {
  try {
    // Get user's purchase history and browsing behavior
    const [userOrders, recentProducts] = await Promise.all([
      db.order.findMany({
        where: { userId, paymentStatus: 'PAID' },
        include: {
          items: {
            include: {
              product: {
                include: { category: true },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      db.product.findMany({
        where: { status: 'PUBLISHED' },
        include: { category: true },
        orderBy: { viewCount: 'desc' },
        take: 50,
      }),
    ])

    // Extract user preferences
    const purchasedCategories = new Set<string>()
    const purchasedTags = new Set<string>()
    const purchasedProductIds = new Set<string>()

    userOrders.forEach((order) => {
      order.items.forEach((item) => {
        purchasedCategories.add(item.product.category.name)
        purchasedProductIds.add(item.productId)
        item.product.aiTags.forEach((tag) => purchasedTags.add(tag))
      })
    })

    // Filter out already purchased products
    const candidateProducts = recentProducts.filter(
      (p) => !purchasedProductIds.has(p.id)
    )

    if (candidateProducts.length === 0) {
      return []
    }

    // Use AI to rank products
    const prompt = `You are a product recommendation AI. Based on the user's preferences, rank these products.

User Preferences:
- Purchased Categories: ${Array.from(purchasedCategories).join(', ') || 'None'}
- Interested Tags: ${Array.from(purchasedTags).join(', ') || 'None'}

Available Products:
${candidateProducts
  .map(
    (p, i) =>
      `${i + 1}. "${p.name}" - Category: ${p.category.name}, Tags: ${p.aiTags.join(', ')}, Rating: ${p.rating}, Sales: ${p.salesCount}`
  )
  .join('\n')}

Return a JSON array of the top ${limit} product recommendations with this format:
[{"index": 1, "score": 0.95, "reason": "Brief reason"}]

Only return the JSON array, no other text.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    })

    const responseText = completion.choices[0]?.message?.content || '[]'
    const recommendations = JSON.parse(responseText) as {
      index: number
      score: number
      reason: string
    }[]

    return recommendations.map((rec) => ({
      productId: candidateProducts[rec.index - 1]?.id || '',
      score: rec.score,
      reason: rec.reason,
    }))
  } catch (error) {
    console.error('AI recommendation error:', error)
    // Fallback to simple recommendation based on popularity
    const popularProducts = await db.product.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [{ salesCount: 'desc' }, { rating: 'desc' }],
      take: limit,
    })

    return popularProducts.map((p) => ({
      productId: p.id,
      score: Number(p.rating) / 5,
      reason: 'Popular product',
    }))
  }
}

export async function generateSEOSuggestions(productId: string) {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      include: { category: true },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    const prompt = `Generate SEO optimization suggestions for this digital product:

Product Name: ${product.name}
Category: ${product.category.name}
Description: ${product.description.slice(0, 500)}
Current Tags: ${product.aiTags.join(', ')}

Provide suggestions in JSON format:
{
  "metaTitle": "Optimized title (max 60 chars)",
  "metaDescription": "Optimized description (max 160 chars)",
  "suggestedTags": ["tag1", "tag2", "tag3"],
  "improvements": ["suggestion1", "suggestion2"]
}

Only return the JSON, no other text.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    })

    const responseText = completion.choices[0]?.message?.content || '{}'
    return JSON.parse(responseText)
  } catch (error) {
    console.error('SEO suggestion error:', error)
    return null
  }
}

export async function categorizeProduct(name: string, description: string) {
  try {
    const categories = await db.category.findMany({
      select: { id: true, name: true },
    })

    const prompt = `Categorize this digital product into one of the available categories.

Product Name: ${name}
Description: ${description.slice(0, 300)}

Available Categories:
${categories.map((c) => `- ${c.name}`).join('\n')}

Return only the category name that best fits this product.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 50,
    })

    const suggestedCategory = completion.choices[0]?.message?.content?.trim()
    const matchedCategory = categories.find(
      (c) => c.name.toLowerCase() === suggestedCategory?.toLowerCase()
    )

    return matchedCategory?.id || categories[0]?.id
  } catch (error) {
    console.error('Product categorization error:', error)
    return null
  }
}
