'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CartItem } from '@/types/cart'

/**
 * Custom hook for cart state management with localStorage persistence
 * Story 2.3: Shopping Cart Widget & Persistent State
 * AC-2.3.1: useCart Hook with localStorage Persistence
 * AC-2.3.5: Cart State Management (Edge Cases)
 */

const CART_STORAGE_KEY = 'nixtia-cart'
const MIN_QUANTITY = 1
const MAX_QUANTITY = 99

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart)
        // Validate that parsed data is an array
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart)
        } else {
          // Invalid data, clear localStorage
          localStorage.removeItem(CART_STORAGE_KEY)
        }
      }
    } catch (error) {
      // Invalid JSON in localStorage, clear it
      console.error('[useCart] Failed to load cart from localStorage:', error)
      localStorage.removeItem(CART_STORAGE_KEY)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      // Handle localStorage quota exceeded or disabled
      console.error('[useCart] Failed to save cart to localStorage:', error)
      // Fallback to memory-only state (cart still works in current session)
    }
  }, [cart, isInitialized])

  // Add item to cart (or increment quantity if already exists)
  const addItem = useCallback((product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (cartItem) => cartItem.product_id === product.product_id
      )

      if (existingItemIndex >= 0) {
        // Product already in cart, increment quantity
        const updatedCart = [...currentCart]
        const currentQuantity = updatedCart[existingItemIndex].quantity
        const addQuantity = product.quantity ?? 1
        const newQuantity = Math.min(currentQuantity + addQuantity, MAX_QUANTITY)
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: newQuantity,
        }
        return updatedCart
      } else {
        // New product, add to cart with specified quantity or default to 1
        const quantity = Math.max(MIN_QUANTITY, Math.min(product.quantity ?? 1, MAX_QUANTITY))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { quantity: _, ...productWithoutQuantity } = product
        return [...currentCart, { ...productWithoutQuantity, quantity }]
      }
    })
  }, [])

  // Remove item from cart by product_id
  const removeItem = useCallback((productId: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product_id !== productId)
    )
  }, [])

  // Update quantity for a specific product
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    // Validate quantity constraints
    const validatedQuantity = Math.max(MIN_QUANTITY, Math.min(quantity, MAX_QUANTITY))

    setCart((currentCart) => {
      const itemIndex = currentCart.findIndex(
        (item) => item.product_id === productId
      )

      if (itemIndex >= 0) {
        const updatedCart = [...currentCart]
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: validatedQuantity,
        }
        return updatedCart
      }

      return currentCart
    })
  }, [])

  // Clear all items from cart
  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  // Calculate total number of items (sum of all quantities)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Calculate total amount (sum of price * quantity for all items)
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount,
  }
}
