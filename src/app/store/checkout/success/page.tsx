import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CircleCheck } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ClearCartOnMount from '@/components/store/ClearCartOnMount'
import OrderDetailsCard from '@/components/store/OrderDetailsCard'
import PaymentInstructions from '@/components/store/PaymentInstructions'
import OrderNumberCopy from '@/components/store/OrderNumberCopy'

/**
 * Order Confirmation Success Page
 * Story 2.8: Order Confirmation Page & Success State
 *
 * This is a Server Component that fetches order data and displays confirmation
 * AC-2.8.1: Success Page Route and Access Control
 * AC-2.8.2: Order Confirmation Message
 * AC-2.8.3: Order Summary Display
 * AC-2.8.4: Payment Instructions (Conditional)
 * AC-2.8.5: Next Steps and Actions
 * AC-2.8.6: Clear Cart State
 * AC-2.8.7: SEO and Meta Tags
 */

// AC-2.8.7: Page metadata
export const metadata: Metadata = {
  title: 'Order Confirmed - Nixtia',
  robots: {
    index: false,
    follow: false,
  },
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function OrderSuccessPage({ searchParams }: PageProps) {
  // AC-2.8.1: Extract and validate orderId from query parameters
  const params = await searchParams
  const orderId = params.orderId

  // AC-2.8.1: If orderId missing or invalid → redirect to /store
  if (!orderId || typeof orderId !== 'string' || !UUID_REGEX.test(orderId)) {
    redirect('/store')
  }

  // AC-2.8.1: Fetch order data from database (migrated to Supabase - Story 1.5)
  const supabase = await createClient()
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error) {
    console.error('[OrderSuccessPage] Supabase error:', error.message)
    // On database error, show error state
    return <OrderNotFoundError />
  }

  // AC-2.8.1: If order not found → show error message + link to store
  if (!order) {
    return <OrderNotFoundError />
  }

  // Parse items from JSON
  const items = order.items_json as Array<{
    product_id: string
    name: string
    price: number
    quantity: number
    image_url: string | null
  }>

  // Format order number for display
  const orderNumber = order.order_number

  // Format date: "Nov 24, 2024 at 3:45 PM"
  const formattedDate = format(new Date(order.created_at), 'MMM dd, yyyy \'at\' h:mm a')

  // Translate payment method to Spanish
  const paymentMethodLabels: Record<string, string> = {
    BANK_TRANSFER: 'Transferencia Bancaria',
    CASH_ON_DELIVERY: 'Efectivo en Entrega',
    CARD_ON_DELIVERY: 'Tarjeta en Entrega',
    STRIPE: 'Tarjeta (Online)',
  }

  const paymentMethodLabel = paymentMethodLabels[order.payment_method] || order.payment_method

  // WhatsApp business number (hardcoded for MVP)
  const whatsappNumber = '+525512345678'
  const whatsappMessage = encodeURIComponent(`Hola, mi pedido es #${orderNumber}`)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <>
      {/* AC-2.8.6: Clear cart from localStorage on mount */}
      <ClearCartOnMount />

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* AC-2.8.2: Success Message Section */}
          <div className="text-center mb-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <CircleCheck className="w-16 h-16 text-green-600" aria-label="Success" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your order. We&apos;ll prepare it shortly.
            </p>

            {/* Order Number (copyable) */}
            <OrderNumberCopy orderNumber={orderNumber} />
          </div>

          {/* AC-2.8.3: Order Summary Display */}
          <OrderDetailsCard
            customerPhone={order.customer_phone}
            paymentMethod={paymentMethodLabel}
            items={items}
            total={order.total_amount.toString()}
            orderDate={formattedDate}
          />

          {/* AC-2.8.4: Payment Instructions (Conditional) */}
          <PaymentInstructions
            paymentMethod={order.payment_method}
            orderNumber={orderNumber}
          />

          {/* AC-2.8.5: Next Steps and Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/store">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * Error state component for order not found
 * AC-2.8.1: Show error message + link to store
 */
function OrderNotFoundError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t find the order you&apos;re looking for. It may have been removed or the link is incorrect.
        </p>
        <Button asChild>
          <Link href="/store">Return to Store</Link>
        </Button>
      </div>
    </div>
  )
}
