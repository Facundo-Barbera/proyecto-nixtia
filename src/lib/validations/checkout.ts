import { z } from 'zod'

/**
 * Checkout Form Validation Schema
 * Story 2.5: Guest Checkout Form with Phone Input
 * AC-2.5.3: Phone Number Validation (Zod Schema)
 * AC-2.5.4: Payment Method Selector
 */

/**
 * Payment Method Enum
 * MVP supports 3 methods:
 * - Bank Transfer (most common in Mexico)
 * - Cash on Delivery (elder-friendly)
 * - Card on Delivery (convenience)
 */
export const PaymentMethodEnum = z.enum([
  'BANK_TRANSFER',
  'CASH_ON_DELIVERY',
  'CARD_ON_DELIVERY',
])

export type PaymentMethod = z.infer<typeof PaymentMethodEnum>

/**
 * Checkout Form Schema
 * AC-2.5.3: Phone must match E.164 format: +[country code][number]
 * Example: +525512345678 (Mexico)
 *
 * E.164 regex explanation:
 * - ^\\+ : Must start with +
 * - [1-9] : Country code cannot start with 0
 * - \\d{1,14} : 1-14 digits after country code
 * - $ : End of string
 */
export const CheckoutFormSchema = z.object({
  customerPhone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  paymentMethod: PaymentMethodEnum,
})

export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>

/**
 * Default form values
 */
export const defaultCheckoutFormValues: CheckoutFormData = {
  customerPhone: '',
  paymentMethod: 'BANK_TRANSFER', // Default per AC-2.5.4
}
