/**
 * StatusBadge Component
 * Story 3.5: Transactions Table Widget
 * AC-3.5.2: Status badges with colors
 *
 * Displays payment and order status badges with appropriate colors:
 * - Payment status colors: PENDING=yellow, CONFIRMED=green, FAILED=red
 * - Order status colors: PENDING=gray, CONFIRMED=blue, PREPARING=orange,
 *   READY=green, DELIVERED=green, CANCELLED=red
 */

import { Badge } from '@/components/ui/badge'
import { translateOrderStatus, translatePaymentStatus } from '@/lib/utils/translateOrderStatus'

type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'
type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'

interface StatusBadgeProps {
  type: 'payment' | 'order'
  status: PaymentStatus | OrderStatus
}

/**
 * Get badge variant (color) based on status type and value
 */
function getBadgeVariant(
  type: 'payment' | 'order',
  status: PaymentStatus | OrderStatus
): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (type === 'payment') {
    const paymentStatus = status as PaymentStatus
    switch (paymentStatus) {
      case 'PENDING':
        return 'outline' // Will be styled as yellow
      case 'CONFIRMED':
        return 'default' // Will be styled as green
      case 'FAILED':
        return 'destructive' // Red
      default:
        return 'secondary'
    }
  } else {
    const orderStatus = status as OrderStatus
    switch (orderStatus) {
      case 'PENDING':
        return 'secondary' // Gray
      case 'CONFIRMED':
        return 'outline' // Will be styled as blue
      case 'PREPARING':
        return 'outline' // Will be styled as orange
      case 'READY':
      case 'DELIVERED':
        return 'default' // Green
      case 'CANCELLED':
        return 'destructive' // Red
      default:
        return 'secondary'
    }
  }
}

/**
 * Get custom className for specific color styling
 */
function getCustomClassName(
  type: 'payment' | 'order',
  status: PaymentStatus | OrderStatus
): string {
  if (type === 'payment') {
    const paymentStatus = status as PaymentStatus
    if (paymentStatus === 'PENDING') {
      return 'border-yellow-500 text-yellow-700 bg-yellow-50'
    }
    if (paymentStatus === 'CONFIRMED') {
      return 'bg-green-500 text-white'
    }
  } else {
    const orderStatus = status as OrderStatus
    if (orderStatus === 'CONFIRMED') {
      return 'border-blue-500 text-blue-700 bg-blue-50'
    }
    if (orderStatus === 'PREPARING') {
      return 'border-orange-500 text-orange-700 bg-orange-50'
    }
    if (orderStatus === 'READY' || orderStatus === 'DELIVERED') {
      return 'bg-green-500 text-white'
    }
  }
  return ''
}

export function StatusBadge({ type, status }: StatusBadgeProps) {
  const variant = getBadgeVariant(type, status)
  const customClassName = getCustomClassName(type, status)
  const label = type === 'payment'
    ? translatePaymentStatus(status as PaymentStatus)
    : translateOrderStatus(status as OrderStatus)

  return (
    <Badge variant={variant} className={customClassName}>
      {label}
    </Badge>
  )
}
