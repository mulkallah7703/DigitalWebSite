const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    const hashedPassword = await bcrypt.hash('admin123', 12)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@nexus.store' },
        update: {},
        create: {
            email: 'admin@nexus.store',
            name: 'Admin User',
            password: hashedPassword,
            role: 'SUPER_ADMIN',
        },
    })

    console.log('✅ Admin created:', admin.email)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })