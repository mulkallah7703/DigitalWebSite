export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user orders
    const orders = await db.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    // Get user preferences from settings or use defaults
    const settings = await db.setting.findMany({
      where: {
        key: {
          in: [`user.${user.id}.language`, `user.${user.id}.emailNotifications`, `user.${user.id}.marketing`],
        },
      },
    })

    const settingsMap: Record<string, unknown> = {}
    settings.forEach((setting) => {
      settingsMap[setting.key] = setting.value
    })

    return NextResponse.json({
      data: {
        user,
        orders,
        preferences: {
          language: (settingsMap[`user.${user.id}.language`] as string) || 'en',
          emailNotifications: (settingsMap[`user.${user.id}.emailNotifications`] as boolean) ?? true,
          marketing: (settingsMap[`user.${user.id}.marketing`] as boolean) ?? false,
        },
      },
    })
  } catch (error) {
    console.error('Account fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch account data' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { z } = await import('zod')

    const updateSchema = z.object({
      name: z.string().min(1).optional(),
      image: z.string().url().optional().or(z.literal('')),
      language: z.enum(['en', 'ar']).optional(),
      emailNotifications: z.boolean().optional(),
      marketing: z.boolean().optional(),
    })

    const body = await req.json()
    const data = updateSchema.parse(body)

    // Update user profile
    const updateData: {
      name?: string
      image?: string | null
    } = {}

    if (data.name !== undefined) {
      updateData.name = data.name
    }
    if (data.image !== undefined) {
      updateData.image = data.image || null
    }

    if (Object.keys(updateData).length > 0) {
      await db.user.update({
        where: { id: session.user.id },
        data: updateData,
      })
    }

    // Update preferences in settings
    const settingsToUpdate: Array<{ key: string; value: unknown }> = []

    if (data.language !== undefined) {
      settingsToUpdate.push({
        key: `user.${session.user.id}.language`,
        value: data.language,
      })
    }
    if (data.emailNotifications !== undefined) {
      settingsToUpdate.push({
        key: `user.${session.user.id}.emailNotifications`,
        value: data.emailNotifications,
      })
    }
    if (data.marketing !== undefined) {
      settingsToUpdate.push({
        key: `user.${session.user.id}.marketing`,
        value: data.marketing,
      })
    }

    if (settingsToUpdate.length > 0) {
      await Promise.all(
        settingsToUpdate.map((setting) => {
          const normalizedValue = setting.value as Prisma.InputJsonValue
          return db.setting.upsert({
            where: { key: setting.key },
            update: { value: normalizedValue },
            create: {
              key: setting.key,
              value: normalizedValue,
            },
          })
        })
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Account updated successfully',
    })
  } catch (error) {
    console.error('Account update error:', error)

    const { z } = await import('zod')
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update account' },
      { status: 500 }
    )
  }
}
