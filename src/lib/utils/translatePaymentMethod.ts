/**
 * Payment Method Translation Utility
 * Story 3.5: Transactions Table Widget
 * AC-3.5.2: Column formatting - Payment method translation to Spanish
 *
 * Translates PaymentMethod enum values to Spanish labels
 */

type PaymentMethod = 'BANK_TRANSFER' | 'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY' | 'STRIPE'

const paymentMethodLabels: Record<PaymentMethod, string> = {
  BANK_TRANSFER: 'Transferencia',
  CASH_ON_DELIVERY: 'Efectivo',
  CARD_ON_DELIVERY: 'Tarjeta',
  STRIPE: 'Stripe',
}

export function translatePaymentMethod(method: PaymentMethod): string {
  return paymentMethodLabels[method] || method
}
