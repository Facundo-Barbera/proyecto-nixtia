'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import PhoneInputField from '@/components/store/PhoneInputField'
import PaymentMethodSelector from '@/components/store/PaymentMethodSelector'
import {
  CheckoutFormSchema,
  type CheckoutFormData,
  defaultCheckoutFormValues,
} from '@/lib/validations/checkout'
import type { Value } from 'react-phone-number-input'

/**
 * Checkout Form Component
 * Story 2.5: Guest Checkout Form with Phone Input
 * AC-2.5.5: React Hook Form Integration
 *
 * Integrates:
 * - React Hook Form for state management
 * - Zod for schema validation via zodResolver
 * - PhoneInputField (controlled via Controller)
 * - PaymentMethodSelector
 */

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => Promise<void>
  isSubmitting?: boolean
}

export default function CheckoutForm({ onSubmit, isSubmitting = false }: CheckoutFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: defaultCheckoutFormValues,
    mode: 'onBlur', // AC-2.5.3: Validate on blur
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Phone Number Input */}
      <Controller
        name="customerPhone"
        control={control}
        render={({ field }) => (
          <PhoneInputField
            value={field.value as Value}
            onChange={field.onChange}
            error={errors.customerPhone?.message}
            disabled={isSubmitting}
          />
        )}
      />

      {/* Payment Method Selector */}
      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <PaymentMethodSelector
            value={field.value}
            onChange={field.onChange}
            error={errors.paymentMethod?.message}
          />
        )}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Place Order'
        )}
      </Button>
    </form>
  )
}
