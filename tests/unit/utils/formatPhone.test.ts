/**
 * Unit Tests for formatPhone utility
 * Story 3.5: Transactions Table Widget
 * AC-3.5.2: Phone formatting test coverage
 */

import { describe, it, expect } from 'vitest'
import { formatPhone } from '@/lib/utils/formatPhone'

describe('formatPhone', () => {
  it('should format Mexican phone numbers correctly', () => {
    expect(formatPhone('+521234567890')).toBe('+52 123 456 7890')
  })

  it('should handle phone numbers with spaces', () => {
    expect(formatPhone('+52 123 456 7890')).toBe('+52 123 456 7890')
  })

  it('should format other country codes generically', () => {
    expect(formatPhone('+11234567890')).toBe('+1 123 456 7890')
    expect(formatPhone('+541234567890')).toBe('+54 123 456 7890')
  })

  it('should return original string for invalid formats', () => {
    expect(formatPhone('1234567890')).toBe('1234567890')
    expect(formatPhone('invalid')).toBe('invalid')
  })
})
