import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nexus.store' },
    update: {},
    create: {
      email: 'admin@nexus.store',
      name: 'Admin User',
      password: adminPassword,
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'software' },
      update: {},
      create: {
        name: 'Software',
        slug: 'software',
        description: 'Desktop and mobile applications',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'templates' },
      update: {},
      create: {
        name: 'Templates',
        slug: 'templates',
        description: 'Website and design templates',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'courses' },
      update: {},
      create: {
        name: 'Courses',
        slug: 'courses',
        description: 'Online courses and tutorials',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'ebooks' },
      update: {},
      create: {
        name: 'E-Books',
        slug: 'ebooks',
        description: 'Digital books and guides',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'graphics' },
      update: {},
      create: {
        name: 'Graphics',
        slug: 'graphics',
        description: 'Icons, illustrations, and design assets',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'audio' },
      update: {},
      create: {
        name: 'Audio',
        slug: 'audio',
        description: 'Music, sound effects, and audio files',
      },
    }),
  ])
  console.log('✅ Categories created:', categories.length)

  // Create sample products
  const products = [
    {
      name: 'Pro Dashboard UI Kit',
      slug: 'pro-dashboard-ui-kit',
      description: '<p>A comprehensive UI kit for building modern admin dashboards. Includes 100+ components, dark mode support, and responsive layouts.</p><ul><li>100+ UI Components</li><li>Dark & Light Mode</li><li>Figma & Sketch Files</li><li>React Components</li></ul>',
      shortDescription: 'Complete UI kit for modern admin dashboards',
      price: 79,
      comparePrice: 129,
      categoryId: categories[1].id,
      featured: true,
      status: 'PUBLISHED',
      aiTags: ['dashboard', 'ui-kit', 'admin', 'react', 'figma'],
      rating: 4.8,
      reviewCount: 124,
      salesCount: 856,
    },
    {
      name: 'Full-Stack Development Course',
      slug: 'full-stack-development-course',
      description: '<p>Master full-stack development with this comprehensive course. Learn React, Node.js, PostgreSQL, and deployment strategies.</p><ul><li>50+ Hours of Content</li><li>Real-World Projects</li><li>Certificate of Completion</li><li>Lifetime Access</li></ul>',
      shortDescription: 'Complete guide to modern full-stack development',
      price: 149,
      comparePrice: 299,
      categoryId: categories[2].id,
      featured: true,
      status: 'PUBLISHED',
      aiTags: ['course', 'react', 'nodejs', 'fullstack', 'programming'],
      rating: 4.9,
      reviewCount: 312,
      salesCount: 1245,
    },
    {
      name: 'AI Productivity Toolkit',
      slug: 'ai-productivity-toolkit',
      description: '<p>Boost your productivity with AI-powered tools. Includes automation scripts, templates, and integrations for popular platforms.</p>',
      shortDescription: 'AI-powered tools for maximum productivity',
      price: 49,
      categoryId: categories[0].id,
      featured: true,
      status: 'PUBLISHED',
      aiTags: ['ai', 'productivity', 'automation', 'tools'],
      rating: 4.7,
      reviewCount: 89,
      salesCount: 432,
    },
    {
      name: 'E-Commerce Starter Kit',
      slug: 'ecommerce-starter-kit',
      description: '<p>Launch your online store quickly with this complete e-commerce starter kit. Built with Next.js and Stripe integration.</p>',
      shortDescription: 'Complete e-commerce solution with Next.js',
      price: 199,
      comparePrice: 349,
      categoryId: categories[1].id,
      featured: true,
      status: 'PUBLISHED',
      aiTags: ['ecommerce', 'nextjs', 'stripe', 'template'],
      rating: 4.6,
      reviewCount: 67,
      salesCount: 289,
    },
    {
      name: 'Icon Pack Pro',
      slug: 'icon-pack-pro',
      description: '<p>5000+ premium icons in multiple formats. Perfect for web and mobile applications.</p>',
      shortDescription: '5000+ premium icons for your projects',
      price: 29,
      categoryId: categories[4].id,
      status: 'PUBLISHED',
      aiTags: ['icons', 'design', 'svg', 'ui'],
      rating: 4.5,
      reviewCount: 156,
      salesCount: 1890,
    },
    {
      name: 'Startup Business Guide',
      slug: 'startup-business-guide',
      description: '<p>Everything you need to know about starting and scaling a successful startup. Written by industry experts.</p>',
      shortDescription: 'Complete guide to building a successful startup',
      price: 39,
      categoryId: categories[3].id,
      status: 'PUBLISHED',
      aiTags: ['ebook', 'startup', 'business', 'entrepreneurship'],
      rating: 4.4,
      reviewCount: 78,
      salesCount: 567,
    },
    {
      name: 'Ambient Music Pack',
      slug: 'ambient-music-pack',
      description: '<p>50 royalty-free ambient tracks perfect for videos, podcasts, and applications.</p>',
      shortDescription: '50 royalty-free ambient music tracks',
      price: 59,
      categoryId: categories[5].id,
      status: 'PUBLISHED',
      aiTags: ['music', 'ambient', 'royalty-free', 'audio'],
      rating: 4.7,
      reviewCount: 45,
      salesCount: 234,
    },
    {
      name: 'SaaS Landing Page Template',
      slug: 'saas-landing-page-template',
      description: '<p>High-converting landing page template for SaaS products. Includes multiple sections and animations.</p>',
      shortDescription: 'High-converting SaaS landing page',
      price: 69,
      categoryId: categories[1].id,
      featured: true,
      status: 'PUBLISHED',
      aiTags: ['landing-page', 'saas', 'template', 'conversion'],
      rating: 4.8,
      reviewCount: 92,
      salesCount: 678,
    },
  ]

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        ...productData,
        status: productData.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
      },
    })

    // Add sample image
    await prisma.productImage.upsert({
      where: { id: `img_${product.id}` },
      update: {},
      create: {
        id: `img_${product.id}`,
        url: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 100000000)}?w=800&h=600&fit=crop`,
        alt: product.name,
        productId: product.id,
        order: 0,
      },
    })

    // Add sample file
    await prisma.productFile.upsert({
      where: { id: `file_${product.id}` },
      update: {},
      create: {
        id: `file_${product.id}`,
        name: `${product.name}.zip`,
        url: '/downloads/sample.zip',
        size: 1024 * 1024 * Math.floor(Math.random() * 50 + 1),
        type: 'application/zip',
        productId: product.id,
      },
    })
  }
  console.log('✅ Products created:', products.length)

  // Create tags
  const tags = ['react', 'nextjs', 'typescript', 'design', 'ui-kit', 'template', 'course', 'ebook', 'audio', 'icons']
  for (const tagName of tags) {
    await prisma.tag.upsert({
      where: { slug: tagName },
      update: {},
      create: {
        name: tagName.charAt(0).toUpperCase() + tagName.slice(1),
        slug: tagName,
      },
    })
  }
  console.log('✅ Tags created:', tags.length)

  console.log('🎉 Database seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
