import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CheckoutFormSchema } from '@/lib/validations/checkout'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

/**
 * Orders API Endpoint
 * Story 2.5: Guest Checkout Form with Phone Input
 * AC-2.5.7: Form Submission and Order Creation
 *
 * POST /api/orders
 * Creates a new order with customer phone, payment method, and cart items
 */

/**
 * Request body schema
 * Extends CheckoutFormSchema with cart items
 */
const CreateOrderSchema = CheckoutFormSchema.extend({
  items: z.array(
    z.object({
      product_id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().int().min(1).max(99),
      image_url: z.string().nullable(),
    })
  ).min(1, 'Cart must have at least one item'),
})

/**
 * Generate order number in format: NX-YYYY-XXXXXX
 * Example: NX-2024-000001
 *
 * AC-2.5.7: Order number generated server-side
 */
async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear()

  // Count existing orders to generate next increment
  const orderCount = await prisma.orders.count()
  const increment = (orderCount + 1).toString().padStart(6, '0')

  return `NX-${year}-${increment}`
}

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = CreateOrderSchema.parse(body)

    // Generate unique order number
    const orderNumber = await generateOrderNumber()

    // Calculate total amount from items
    const totalAmount = validatedData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    // Create order in database
    const order = await prisma.orders.create({
      data: {
        id: crypto.randomUUID(),
        order_number: orderNumber,
        customer_phone: validatedData.customerPhone,
        payment_method: validatedData.paymentMethod,
        items_json: validatedData.items as Prisma.InputJsonValue,
        total: new Prisma.Decimal(totalAmount.toFixed(2)),
        payment_status: 'PENDING', // AC-2.5.7: Payment starts pending
        order_status: 'CONFIRMED', // AC-2.5.7: Order confirmed on creation
        created_at: new Date(),
        updated_at: new Date(),
      },
      select: {
        id: true,
        order_number: true,
        customer_phone: true,
        payment_method: true,
        total: true,
        payment_status: true,
        order_status: true,
        created_at: true,
      },
    })

    // AC-2.5.7: Return order ID and details
    return NextResponse.json(
      {
        success: true,
        order: {
          id: order.id,
          orderNumber: order.order_number,
          customerPhone: order.customer_phone,
          paymentMethod: order.payment_method,
          total: order.total.toString(),
          paymentStatus: order.payment_status,
          orderStatus: order.order_status,
          createdAt: order.created_at.toISOString(),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/orders] Error:', error)

    // Validation error (Zod)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    // Database error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database error',
          message: 'Failed to create order. Please try again.',
        },
        { status: 500 }
      )
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/orders
 * List orders (future enhancement for admin)
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Not implemented',
      message: 'GET /api/orders is not yet implemented. Use admin dashboard.',
    },
    { status: 501 }
  )
}
