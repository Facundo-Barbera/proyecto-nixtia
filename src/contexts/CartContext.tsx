'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useCart } from '@/hooks/useCart'
import type { CartContextType } from '@/types/cart'

/**
 * Cart Context Provider
 * Story 2.3: Shopping Cart Widget & Persistent State
 * AC-2.3.2: Cart Context Provider
 */

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const cart = useCart()

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

/**
 * Hook to consume cart context
 * Throws error if used outside CartProvider
 */
export function useCartContext() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }

  return context
}
