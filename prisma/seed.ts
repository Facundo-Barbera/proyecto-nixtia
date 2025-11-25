import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { createClient } from '@supabase/supabase-js'

const prisma = new PrismaClient()

// Initialize Supabase Admin client for user creation
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

async function main() {
  console.log('🔐 Creating admin user...')

  // Admin user credentials
  const ADMIN_EMAIL = 'admin@nixtia.com'
  const ADMIN_PASSWORD = 'Admin123!'

  try {
    // Check if admin user already exists in Supabase
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const existingAdmin = existingUsers?.users?.find(
      (user) => user.email === ADMIN_EMAIL
    )

    let adminUserId: string

    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists in Supabase Auth')
      adminUserId = existingAdmin.id
    } else {
      // Create admin user in Supabase Auth
      const { data: authData, error: authError } =
        await supabaseAdmin.auth.admin.createUser({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          email_confirm: true, // Auto-confirm email for seed user
        })

      if (authError || !authData.user) {
        console.error('❌ Failed to create admin user in Supabase:', authError)
        throw authError
      }

      adminUserId = authData.user.id
      console.log(`✅ Created admin user in Supabase: ${ADMIN_EMAIL}`)
    }

    // Create or update admin user in database
    await prisma.adminUser.upsert({
      where: { id: adminUserId },
      update: {
        email: ADMIN_EMAIL,
      },
      create: {
        id: adminUserId,
        email: ADMIN_EMAIL,
      },
    })

    console.log(`✅ Admin user linked to database: ${ADMIN_EMAIL}`)
    console.log(`\n📋 Admin credentials (development only):`)
    console.log(`   Email: ${ADMIN_EMAIL}`)
    console.log(`   Password: ${ADMIN_PASSWORD}\n`)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    // Continue with product seeding even if admin creation fails
  }

  console.log('🌽 Seeding database with artisan corn products...')

  // Clear existing products (for re-seeding)
  await prisma.product.deleteMany()

  // Seed artisan corn products
  const products = await prisma.product.createMany({
    data: [
      {
        id: randomUUID(),
        name: 'Masa de Maíz Azul Orgánica',
        description:
          'Masa fresca de maíz azul ancestral, molida a mano con técnicas tradicionales. Perfecta para tortillas, tamales y antojitos. Rico sabor a tierra y tradición.',
        price: 45.0,
        image_url: null,
        is_active: true,
      },
      {
        id: randomUUID(),
        name: 'Tortillas de Maíz Tradicionales',
        description:
          'Tortillas hechas a mano con maíz nixtamalizado, siguiendo recetas de generaciones. Suaves, aromáticas y llenas de sabor auténtico.',
        price: 35.0,
        image_url: null,
        is_active: true,
      },
      {
        id: randomUUID(),
        name: 'Harina de Maíz Nixtamalizado',
        description:
          'Harina fina de maíz nixtamalizado, ideal para preparar tortillas, atoles y postres tradicionales. Sin conservantes ni aditivos.',
        price: 120.5,
        image_url: null,
        is_active: true,
      },
      {
        id: randomUUID(),
        name: 'Tostadas de Maíz Crujientes',
        description:
          'Tostadas artesanales doradas al comal, extra crujientes. Base perfecta para tostadas de tinga, ceviche o frijoles. Paquete de 20 piezas.',
        price: 28.0,
        image_url: null,
        is_active: true,
      },
      {
        id: randomUUID(),
        name: 'Tlayudas Oaxaqueñas Grandes',
        description:
          'Tlayudas tradicionales oaxaqueñas de gran tamaño, elaboradas con maíz criollo. Perfectas para preparar la clásica tlayuda con frijoles, quesillo y tasajo.',
        price: 55.0,
        image_url: null,
        is_active: true,
      },
      {
        id: randomUUID(),
        name: 'Pinole de Maíz Tostado',
        description:
          'Pinole artesanal de maíz tostado y molido con canela. Bebida nutritiva y energizante de tradición prehispánica. Bolsa de 500g.',
        price: 38.0,
        image_url: null,
        is_active: true,
      },
      {
        id: randomUUID(),
        name: 'Atole de Maíz Morado Premium',
        description:
          'Mezcla premium para atole de maíz morado, endulzado naturalmente con piloncillo. Sabor reconfortante y tradicional. Rinde 6 tazas.',
        price: 42.0,
        image_url: null,
        is_active: true,
      },
      {
        id: randomUUID(),
        name: 'Tamales de Elote Frescos',
        description:
          'Tamales dulces de elote tierno, envueltos en hoja de maíz. Elaborados con granos frescos y mantequilla artesanal. Paquete de 6 tamales.',
        price: 85.0,
        image_url: null,
        is_active: true,
      },
      {
        id: randomUUID(),
        name: 'Esquites Gourmet Preparados',
        description:
          'Granos de maíz tierno cocidos con epazote, servidos con mayonesa, queso cotija, chile piquín y limón. Porción individual lista para calentar.',
        price: 32.0,
        image_url: null,
        is_active: true,
      },
      {
        id: randomUUID(),
        name: 'Maíz Pozolero Cacahuazintle',
        description:
          'Granos grandes de maíz cacahuazintle para pozole tradicional. Maíz de calidad premium, blanco y carnoso. Bolsa de 1kg.',
        price: 65.0,
        image_url: null,
        is_active: true,
      },
    ],
  })

  console.log(`✅ Created ${products.count} artisan corn products`)

  // Display seeded products
  const allProducts = await prisma.product.findMany()
  console.log('\n📦 Seeded products:')
  allProducts.forEach((product) => {
    console.log(`   • ${product.name} - $${product.price}`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
