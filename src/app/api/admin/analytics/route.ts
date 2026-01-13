export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  return getHandler(req)
}

async function getHandler(req: Request) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 })
  }

  try {
    const { requireAdmin } = await import('@/lib/auth')
    const { db } = await import('@/lib/db')

    await requireAdmin()

    const { searchParams } = new URL(req.url)
    const period = searchParams.get('period') || '30' // days
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Calculate date range
    const now = new Date()
    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    
    let dateFrom: Date
    let dateTo: Date = new Date(now)

    if (startDate && endDate) {
      dateFrom = new Date(startDate)
      dateTo = new Date(endDate)
    } else {
      const days = parseInt(period)
      dateFrom = new Date(now)
      dateFrom.setDate(dateFrom.getDate() - days)
    }

    // Overview Metrics
    const [
      totalRevenue,
      totalOrders,
      totalCustomers,
      revenueToday,
      revenueThisMonth,
      ordersToday,
      ordersThisMonth,
      completedOrders,
      pendingOrders,
      cancelledOrders,
      paidOrders,
      failedOrders,
      totalUsers,
      newUsersInPeriod,
      activeUsers,
    ] = await Promise.all([
      // Total Revenue (all time)
      db.order.aggregate({
        where: { paymentStatus: 'PAID' },
        _sum: { total: true },
      }),
      // Total Orders (all time)
      db.order.count(),
      // Total Customers (unique users with orders)
      db.user.count({
        where: {
          orders: {
            some: {},
          },
        },
      }),
      // Revenue Today
      db.order.aggregate({
        where: {
          paymentStatus: 'PAID',
          createdAt: {
            gte: todayStart,
          },
        },
        _sum: { total: true },
      }),
      // Revenue This Month
      db.order.aggregate({
        where: {
          paymentStatus: 'PAID',
          createdAt: {
            gte: monthStart,
          },
        },
        _sum: { total: true },
      }),
      // Orders Today
      db.order.count({
        where: {
          createdAt: {
            gte: todayStart,
          },
        },
      }),
      // Orders This Month
      db.order.count({
        where: {
          createdAt: {
            gte: monthStart,
          },
        },
      }),
      // Completed Orders
      db.order.count({ where: { status: 'COMPLETED' } }),
      // Pending Orders
      db.order.count({ where: { status: 'PENDING' } }),
      // Cancelled Orders
      db.order.count({ where: { status: 'CANCELLED' } }),
      // Paid Orders
      db.order.count({ where: { paymentStatus: 'PAID' } }),
      // Failed Orders
      db.order.count({ where: { paymentStatus: 'FAILED' } }),
      // Total Users
      db.user.count(),
      // New Users in Period
      db.user.count({
        where: {
          createdAt: { gte: dateFrom },
        },
      }),
      // Active Users (users with orders)
      db.user.count({
        where: {
          orders: {
            some: {},
          },
        },
      }),
    ])

    // Revenue over time (daily)
    const revenueOverTime = await db.order.findMany({
      where: {
        paymentStatus: 'PAID',
        createdAt: { gte: dateFrom, lte: dateTo },
      },
      select: {
        total: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    // Group by date
    const revenueByDate: Record<string, number> = {}
    revenueOverTime.forEach((order) => {
      const date = new Date(order.createdAt).toISOString().split('T')[0]
      revenueByDate[date] = (revenueByDate[date] || 0) + Number(order.total)
    })

    // Orders over time
    const ordersOverTime = await db.order.findMany({
      where: {
        createdAt: { gte: dateFrom, lte: dateTo },
      },
      select: {
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    const ordersByDate: Record<string, number> = {}
    ordersOverTime.forEach((order) => {
      const date = new Date(order.createdAt).toISOString().split('T')[0]
      ordersByDate[date] = (ordersByDate[date] || 0) + 1
    })

    // Best selling products
    const orderItems = await db.orderItem.findMany({
      where: {
        order: {
          paymentStatus: 'PAID',
          createdAt: { gte: dateFrom, lte: dateTo },
        },
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
          },
        },
      },
    })

    const productStats: Record<string, {
      productId: string
      productName: string
      productSlug: string
      quantity: number
      revenue: number
      orderCount: Set<string>
    }> = {}

    orderItems.forEach((item) => {
      const productId = item.productId
      if (!productStats[productId]) {
        productStats[productId] = {
          productId,
          productName: item.product.name,
          productSlug: item.product.slug,
          quantity: 0,
          revenue: 0,
          orderCount: new Set(),
        }
      }
      productStats[productId].quantity += item.quantity
      productStats[productId].revenue += Number(item.total)
      productStats[productId].orderCount.add(item.orderId)
    })

    const bestSelling = Object.values(productStats)
      .map((stat) => ({
        productId: stat.productId,
        productName: stat.productName,
        productSlug: stat.productSlug,
        quantity: stat.quantity,
        revenue: stat.revenue,
        orderCount: stat.orderCount.size,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10)

    // Revenue by category
    const revenueByCategory = await db.orderItem.findMany({
      where: {
        order: {
          paymentStatus: 'PAID',
          createdAt: { gte: dateFrom, lte: dateTo },
        },
      },
      include: {
        product: {
          select: {
            categoryId: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    const categoryRevenue: Record<string, { name: string; revenue: number }> = {}
    revenueByCategory.forEach((item) => {
      const categoryId = item.product.categoryId
      const categoryName = item.product.category?.name || 'Uncategorized'
      if (!categoryRevenue[categoryId]) {
        categoryRevenue[categoryId] = { name: categoryName, revenue: 0 }
      }
      categoryRevenue[categoryId].revenue += Number(item.total)
    })

    // Top customers by spending
    const customerOrders = await db.order.findMany({
      where: {
        paymentStatus: 'PAID',
        createdAt: { gte: dateFrom, lte: dateTo },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    const customerStats: Record<string, {
      userId: string
      userName: string | null
      userEmail: string | null
      totalSpent: number
      orderCount: number
    }> = {}

    customerOrders.forEach((order) => {
      const userId = order.userId
      if (!customerStats[userId]) {
        customerStats[userId] = {
          userId,
          userName: order.user.name,
          userEmail: order.user.email,
          totalSpent: 0,
          orderCount: 0,
        }
      }
      customerStats[userId].totalSpent += Number(order.total)
      customerStats[userId].orderCount += 1
    })

    const topCustomersData = Object.values(customerStats)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10)

    // Most viewed products
    const mostViewedProducts = await db.product.findMany({
      where: {
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        viewCount: true,
        salesCount: true,
        price: true,
      },
      orderBy: { viewCount: 'desc' },
      take: 10,
    })

    // Products with zero sales
    const zeroSalesProducts = await db.product.count({
      where: {
        salesCount: 0,
        status: 'PUBLISHED',
      },
    })

    // Featured products performance
    const featuredProducts = await db.product.findMany({
      where: {
        isFeatured: true,
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        salesCount: true,
        viewCount: true,
        price: true,
      },
    })

    // Coupon usage
    const ordersWithCoupons = await db.order.findMany({
      where: {
        couponId: { not: null },
        createdAt: { gte: dateFrom, lte: dateTo },
      },
      include: {
        coupon: {
          select: {
            id: true,
            code: true,
          },
        },
      },
    })

    const couponStats: Record<string, {
      couponId: string | null
      couponCode: string
      usageCount: number
      totalDiscount: number
    }> = {}

    ordersWithCoupons.forEach((order) => {
      const couponId = order.couponId || 'unknown'
      if (!couponStats[couponId]) {
        couponStats[couponId] = {
          couponId: order.couponId,
          couponCode: order.coupon?.code || 'Unknown',
          usageCount: 0,
          totalDiscount: 0,
        }
      }
      couponStats[couponId].usageCount += 1
      couponStats[couponId].totalDiscount += Number(order.discount || 0)
    })

    const couponUsageData = Object.values(couponStats)
      .sort((a, b) => b.usageCount - a.usageCount)

    // Calculate metrics
    const totalRevenueValue = Number(totalRevenue._sum.total || 0)
    const revenueTodayValue = Number(revenueToday._sum.total || 0)
    const revenueThisMonthValue = Number(revenueThisMonth._sum.total || 0)
    const totalCustomersCount = totalCustomers
    const averageOrderValue = totalOrders > 0 ? totalRevenueValue / totalOrders : 0
    const conversionRate = totalUsers > 0 ? (totalCustomersCount / totalUsers) * 100 : 0
    const paymentSuccessRate = totalOrders > 0 ? (paidOrders / totalOrders) * 100 : 0

    // Format time series data
    const timeSeriesData: Array<{ date: string; revenue: number; orders: number }> = []
    const currentDate = new Date(dateFrom)
    while (currentDate <= dateTo) {
      const dateStr = currentDate.toISOString().split('T')[0]
      timeSeriesData.push({
        date: dateStr,
        revenue: revenueByDate[dateStr] || 0,
        orders: ordersByDate[dateStr] || 0,
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return NextResponse.json({
      overview: {
        totalRevenue: totalRevenueValue,
        totalOrders,
        totalCustomers: totalCustomersCount,
        totalUsers,
        revenueToday: revenueTodayValue,
        revenueThisMonth: revenueThisMonthValue,
        ordersToday,
        ordersThisMonth,
        averageOrderValue,
        conversionRate,
        newUsersInPeriod,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
      },
      orders: {
        completed: completedOrders,
        pending: pendingOrders,
        cancelled: cancelledOrders,
        paid: paidOrders,
        failed: failedOrders,
        paymentSuccessRate,
      },
      timeSeries: timeSeriesData,
      bestSellingProducts: bestSelling,
      revenueByCategory: Object.values(categoryRevenue).sort((a, b) => b.revenue - a.revenue),
      topCustomers: topCustomersData,
      mostViewedProducts,
      zeroSalesProducts,
      featuredProducts: featuredProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        salesCount: p.salesCount,
        viewCount: p.viewCount,
        revenue: Number(p.price) * p.salesCount,
      })),
      couponUsage: couponUsageData,
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
