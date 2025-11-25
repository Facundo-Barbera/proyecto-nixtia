/**
 * Order Status Translation Utility
 * Story 3.5: Transactions Table Widget
 * AC-3.5.2: Column formatting - Status translation to Spanish
 *
 * Translates OrderStatus and PaymentStatus enum values to Spanish labels
 */

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'

const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmado',
  PREPARING: 'Preparando',
  READY: 'Listo',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
}

const paymentStatusLabels: Record<PaymentStatus, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmado',
  FAILED: 'Fallido',
}

export function translateOrderStatus(status: OrderStatus): string {
  return orderStatusLabels[status] || status
}

export function translatePaymentStatus(status: PaymentStatus): string {
  return paymentStatusLabels[status] || status
}
