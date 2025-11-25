import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Query products table using Prisma
    const products = await prisma.products.findMany({
      take: 3, // Limit to 3 products for testing
      orderBy: {
        created_at: 'desc',
      },
    })

    const productCount = await prisma.products.count()

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        totalProducts: productCount,
        sampleProducts: products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price.toString(),
          active: p.active,
        })),
      },
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
