/**
 * Cart Type Definitions
 * Story 2.3: Shopping Cart Widget & Persistent State
 * AC-2.3.6: TypeScript Types for Cart
 */

export interface CartItem {
  product_id: string
  name: string
  price: number
  quantity: number
  image_url: string | null
}

export interface CartContextType {
  cart: CartItem[]
  addItem: (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (product_id: string) => void
  updateQuantity: (product_id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalAmount: number
}
