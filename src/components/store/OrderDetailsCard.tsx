import { Card } from '@/components/ui/card'

/**
 * OrderDetailsCard Component
 * Story 2.8: Order Confirmation Page & Success State
 * AC-2.8.3: Order Summary Display
 *
 * Displays order summary with customer info, items, and total
 */
interface OrderItem {
  product_id: string
  name: string
  price: number
  quantity: number
  image_url: string | null
}

interface OrderDetailsCardProps {
  customerPhone: string
  paymentMethod: string
  items: OrderItem[]
  total: string
  orderDate: string
}

export default function OrderDetailsCard({
  customerPhone,
  paymentMethod,
  items,
  total,
  orderDate,
}: OrderDetailsCardProps) {
  // AC-2.8.3: Format phone number (not E.164)
  // Convert +521234567890 to +52 123 456 7890
  const formatPhoneNumber = (phone: string): string => {
    if (phone.startsWith('+52')) {
      // Mexico: +52 123 456 7890
      const digits = phone.slice(3)
      return `+52 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    } else if (phone.startsWith('+1')) {
      // US/Canada: +1 (123) 456-7890
      const digits = phone.slice(2)
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    }
    // Generic format for other countries
    return phone
  }

  // AC-2.8.3: Format total amount in MXN currency
  const formatCurrency = (amount: string): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(parseFloat(amount))
  }

  const formattedPhone = formatPhoneNumber(customerPhone)
  const formattedTotal = formatCurrency(total)

  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Order Summary
      </h2>

      {/* Customer Information */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Customer Phone:</span>
          <span className="font-medium text-gray-900">{formattedPhone}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Payment Method:</span>
          <span className="font-medium text-gray-900">{paymentMethod}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Order Date:</span>
          <span className="font-medium text-gray-900">{orderDate}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Order Items List */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Items</h3>
        <div className="space-y-3">
          {items.map((item) => {
            const subtotal = item.price * item.quantity
            const formattedSubtotal = formatCurrency(subtotal.toString())
            const formattedUnitPrice = formatCurrency(item.price.toString())

            return (
              <div key={item.product_id} className="flex gap-3">
                {/* Product Image */}
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Quantity: {item.quantity} × {formattedUnitPrice}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {formattedSubtotal}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Total Amount */}
      <div className="flex justify-between text-lg font-bold text-gray-900">
        <span>Total:</span>
        <span>{formattedTotal}</span>
      </div>
    </Card>
  )
}
