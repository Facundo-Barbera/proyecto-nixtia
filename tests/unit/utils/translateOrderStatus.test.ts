/**
 * Unit Tests for translateOrderStatus utilities
 * Story 3.5: Transactions Table Widget
 * AC-3.5.2: Status translation test coverage
 */

import { describe, it, expect } from 'vitest'
import {
  translateOrderStatus,
  translatePaymentStatus,
} from '@/lib/utils/translateOrderStatus'

describe('translateOrderStatus', () => {
  it('should translate PENDING correctly', () => {
    expect(translateOrderStatus('PENDING')).toBe('Pendiente')
  })

  it('should translate CONFIRMED correctly', () => {
    expect(translateOrderStatus('CONFIRMED')).toBe('Confirmado')
  })

  it('should translate PREPARING correctly', () => {
    expect(translateOrderStatus('PREPARING')).toBe('Preparando')
  })

  it('should translate READY correctly', () => {
    expect(translateOrderStatus('READY')).toBe('Listo')
  })

  it('should translate DELIVERED correctly', () => {
    expect(translateOrderStatus('DELIVERED')).toBe('Entregado')
  })

  it('should translate CANCELLED correctly', () => {
    expect(translateOrderStatus('CANCELLED')).toBe('Cancelado')
  })
})

describe('translatePaymentStatus', () => {
  it('should translate PENDING correctly', () => {
    expect(translatePaymentStatus('PENDING')).toBe('Pendiente')
  })

  it('should translate CONFIRMED correctly', () => {
    expect(translatePaymentStatus('CONFIRMED')).toBe('Confirmado')
  })

  it('should translate FAILED correctly', () => {
    expect(translatePaymentStatus('FAILED')).toBe('Fallido')
  })
})
