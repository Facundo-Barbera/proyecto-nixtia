'use client'

import { useEffect } from 'react'
import { useCartContext } from '@/contexts/CartContext'

/**
 * ClearCartOnMount Component
 * Story 2.8: Order Confirmation Page & Success State
 * AC-2.8.6: Clear Cart State
 *
 * This component clears the cart when the success page mounts
 * It runs only once on mount to prevent duplicate orders if page is refreshed
 */
export default function ClearCartOnMount() {
  const { clearCart } = useCartContext()

  useEffect(() => {
    // AC-2.8.6: Clear cart from localStorage
    clearCart()

    // This ensures cart is cleared only once when component mounts
    // If user refreshes the success page, cart stays empty (preventing duplicate orders)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - run only on mount

  // This component doesn't render anything
  return null
}
