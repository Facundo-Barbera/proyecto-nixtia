'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartContext } from '@/contexts/CartContext'
import { toast } from 'react-hot-toast'
import { Card } from '@/components/ui/card'
import CheckoutForm from '@/components/store/CheckoutForm'
import type { CheckoutFormData } from '@/lib/validations/checkout'

/**
 * Checkout Page
 * Story 2.5: Guest Checkout Form with Phone Input
 * AC-2.5.1: Checkout Page Route and Layout
 * AC-2.5.6: Order Summary Display
 * AC-2.5.7: Form Submission and Order Creation
 */

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, totalItems, totalAmount, clearCart } = useCartContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // AC-2.5.1: If cart is empty → redirect to /store with message
  useEffect(() => {
    if (cart.length === 0) {
      toast.error('Cart is empty')
      router.push('/store')
    }
  }, [cart.length, router])

  // AC-2.5.7: Handle form submission
  const handleSubmit = async (formData: CheckoutFormData) => {
    setIsSubmitting(true)

    try {
      // Prepare order payload
      const orderPayload = {
        customerPhone: formData.customerPhone,
        paymentMethod: formData.paymentMethod,
        items: cart,
      }

      // AC-2.5.7: POST /api/orders
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create order')
      }

      // Show success toast
      toast.success('Order placed successfully!')

      // AC-2.5.7: Redirect to success page
      // Story 2.8: Order Confirmation Page & Success State
      // Note: Cart will be cleared by the success page component (AC-2.8.6)
      router.push(`/store/checkout/success?orderId=${data.order.id}`)
    } catch (error) {
      console.error('[CheckoutPage] Order submission error:', error)

      // AC-2.5.7: On error - display error message
      toast.error(
        error instanceof Error ? error.message : 'Failed to process order. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while redirect happens
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order</p>
        </div>

        {/* Mobile-first layout: Order summary on top, form below */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact & Payment Information
              </h2>
              <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </Card>
          </div>

          {/* AC-2.5.6: Order Summary Display */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Cart Items List */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const subtotal = item.price * item.quantity
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
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          ${subtotal.toFixed(2)} MXN
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Total Items Count */}
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)} MXN</span>
              </div>

              {/* Edit Cart Link */}
              <div className="mt-6">
                <button
                  onClick={() => router.push('/store')}
                  className="text-sm text-purple-600 hover:text-purple-700 underline"
                >
                  ← Edit Cart
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
