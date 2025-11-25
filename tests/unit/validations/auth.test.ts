import { describe, it, expect } from 'vitest'
import { LoginSchema } from '@/lib/validations/auth'

describe('LoginSchema Validation', () => {
  describe('Email validation', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'admin@nixtia.com',
        'user@example.com',
        'test.user@domain.co.uk',
        'admin+tag@nixtia.com',
      ]

      validEmails.forEach((email) => {
        const result = LoginSchema.safeParse({
          email,
          password: 'ValidPassword123',
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'not-an-email',
        '@nixtia.com',
        'user@',
        'user domain.com',
        '',
      ]

      invalidEmails.forEach((email) => {
        const result = LoginSchema.safeParse({
          email,
          password: 'ValidPassword123',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0].path).toContain('email')
          expect(result.error.issues[0].message).toContain('valid email')
        }
      })
    })

    it('should reject empty email', () => {
      const result = LoginSchema.safeParse({
        email: '',
        password: 'ValidPassword123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('Password validation', () => {
    it('should accept passwords with 8 or more characters', () => {
      const validPasswords = [
        '12345678',
        'ValidPass123',
        'SuperSecurePassword!@#',
        'Admin123',
      ]

      validPasswords.forEach((password) => {
        const result = LoginSchema.safeParse({
          email: 'admin@nixtia.com',
          password,
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject passwords with less than 8 characters', () => {
      const invalidPasswords = ['short', '1234567', 'Pass1', '']

      invalidPasswords.forEach((password) => {
        const result = LoginSchema.safeParse({
          email: 'admin@nixtia.com',
          password,
        })
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0].path).toContain('password')
          expect(result.error.issues[0].message).toContain('at least 8')
        }
      })
    })
  })

  describe('Combined validation', () => {
    it('should validate complete valid credentials', () => {
      const result = LoginSchema.safeParse({
        email: 'admin@nixtia.com',
        password: 'Admin123!',
      })

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('admin@nixtia.com')
        expect(result.data.password).toBe('Admin123!')
      }
    })

    it('should reject if both fields are invalid', () => {
      const result = LoginSchema.safeParse({
        email: 'invalid-email',
        password: 'short',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2)
        const paths = result.error.issues.map((issue) => issue.path[0])
        expect(paths).toContain('email')
        expect(paths).toContain('password')
      }
    })
  })
})
