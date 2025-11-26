import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CheckoutFormSchema } from '@/lib/validations/checkout'
import { z } from 'zod'

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
 * Story 1.5: Migrated from Prisma to Supabase
 */
async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const supabase = await createClient()

  // Count existing orders using Supabase
  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('[generateOrderNumber] Supabase count error:', error.message)
    throw new Error('Failed to generate order number')
  }

  const orderCount = count ?? 0
  const increment = (orderCount + 1).toString().padStart(6, '0')

  return `NX-${year}-${increment}`
}

/**
 * POST /api/orders
 * Create a new order
 * Story 1.5: Migrated from Prisma to Supabase
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

    // Create Supabase client
    const supabase = await createClient()

    // Create order in database using Supabase
    const { data: order, error: insertError } = await supabase
      .from('orders')
      .insert({
        id: crypto.randomUUID(),
        order_number: orderNumber,
        customer_phone: validatedData.customerPhone,
        payment_method: validatedData.paymentMethod,
        items_json: validatedData.items, // Supabase handles JSON natively
        total_amount: totalAmount, // Plain number, not Prisma Decimal
        payment_status: 'PENDING', // AC-2.5.7: Payment starts pending
        order_status: 'CONFIRMED', // AC-2.5.7: Order confirmed on creation
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select('id, order_number, customer_phone, payment_method, total_amount, payment_status, order_status, created_at')
      .single()

    if (insertError) {
      console.error('[POST /api/orders] Supabase insert error:', insertError.message)
      return NextResponse.json(
        {
          success: false,
          error: 'Database error',
          message: 'Failed to create order. Please try again.',
        },
        { status: 500 }
      )
    }

    // AC-2.5.7: Return order ID and details
    return NextResponse.json(
      {
        success: true,
        order: {
          id: order.id,
          orderNumber: order.order_number,
          customerPhone: order.customer_phone,
          paymentMethod: order.payment_method,
          total: order.total_amount.toString(), // Convert number to string for API compatibility
          paymentStatus: order.payment_status,
          orderStatus: order.order_status,
          createdAt: order.created_at,
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

    // Generic error (including order number generation failures)
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
