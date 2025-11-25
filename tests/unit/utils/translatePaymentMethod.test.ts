/**
 * Unit Tests for translatePaymentMethod utility
 * Story 3.5: Transactions Table Widget
 * AC-3.5.2: Payment method translation test coverage
 */

import { describe, it, expect } from 'vitest'
import { translatePaymentMethod } from '@/lib/utils/translatePaymentMethod'

describe('translatePaymentMethod', () => {
  it('should translate BANK_TRANSFER correctly', () => {
    expect(translatePaymentMethod('BANK_TRANSFER')).toBe('Transferencia')
  })

  it('should translate CASH_ON_DELIVERY correctly', () => {
    expect(translatePaymentMethod('CASH_ON_DELIVERY')).toBe('Efectivo')
  })

  it('should translate CARD_ON_DELIVERY correctly', () => {
    expect(translatePaymentMethod('CARD_ON_DELIVERY')).toBe('Tarjeta')
  })

  it('should translate STRIPE correctly', () => {
    expect(translatePaymentMethod('STRIPE')).toBe('Stripe')
  })
})
