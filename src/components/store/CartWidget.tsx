'use client'

import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/contexts/CartContext'

/**
 * CartWidget Component
 * Story 2.3: Shopping Cart Widget & Persistent State
 * AC-2.3.3: CartWidget Component in Header
 * AC-2.3.4: Cart state updates immediately when items added
 */

export function CartWidget() {
  const { totalItems } = useCartContext()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative min-h-[44px] min-w-[44px]"
      aria-label={`Shopping cart, ${totalItems} items`}
      onClick={() => {
        // TODO: Open Cart Sheet (Story 2.4) or navigate to /cart
        console.log('[CartWidget] Open cart clicked')
      }}
    >
      <ShoppingCart
        className={totalItems > 0 ? 'text-primary-600' : 'text-slate-400'}
        size={24}
      />
      {totalItems > 0 && (
        <Badge
          variant="default"
          className="absolute -right-1 -top-1 h-5 min-w-[20px] rounded-full bg-primary-600 px-1 text-xs text-white"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  )
}
