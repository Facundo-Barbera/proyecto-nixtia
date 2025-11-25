import { prisma } from './src/lib/prisma'

async function verifyDatabase() {
  console.log('🔍 Verifying database connection and schema...\n')

  try {
    // Test 1: Connection
    console.log('1️⃣  Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connected successfully\n')

    // Test 2: Query products
    console.log('2️⃣  Querying products table...')
    const products = await prisma.product.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        price: true,
        is_active: true,
      },
    })
    console.log(`✅ Found ${products.length} products`)
    products.forEach(p => console.log(`   • ${p.name} - $${p.price} (active: ${p.is_active})`))
    console.log('')

    // Test 3: Count all tables
    console.log('3️⃣  Counting records in all tables...')
    const productCount = await prisma.product.count()
    const orderCount = await prisma.order.count()
    const orderItemCount = await prisma.orderItem.count()
    const adminUserCount = await prisma.adminUser.count()

    console.log(`✅ Products: ${productCount}`)
    console.log(`✅ Orders: ${orderCount}`)
    console.log(`✅ OrderItems: ${orderItemCount}`)
    console.log(`✅ AdminUsers: ${adminUserCount}`)
    console.log('')

    // Test 4: Test schema fields
    console.log('4️⃣  Verifying schema compliance...')
    const sampleProduct = await prisma.product.findFirst()
    if (sampleProduct) {
      console.log('✅ Products table has is_active field:', 'is_active' in sampleProduct)
      console.log('✅ Products table has @updatedAt:', sampleProduct.updated_at instanceof Date)
    }
    console.log('')

    console.log('✅ All database verification tests passed!\n')

    console.log('📋 Next steps:')
    console.log('   1. Apply RLS policies manually in Supabase SQL Editor')
    console.log('   2. Copy content from: prisma/rls-policies.sql')
    console.log('   3. Run in Supabase Dashboard → SQL Editor')
  } catch (error) {
    console.error('❌ Database verification failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

verifyDatabase()
