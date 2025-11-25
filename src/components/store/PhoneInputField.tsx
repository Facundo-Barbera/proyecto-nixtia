'use client'

import PhoneInput, { type Value } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { forwardRef } from 'react'

/**
 * Phone Input Field Component
 * Story 2.5: Guest Checkout Form with Phone Input
 * AC-2.5.2: Phone Number Input Component
 *
 * Wrapper around react-phone-number-input library
 * - Country selector dropdown (default: Mexico +52)
 * - E.164 format: +1234567890
 * - Visual formatting during typing
 * - Accessible (label, aria attributes)
 * - Touch-friendly for mobile
 */

interface PhoneInputFieldProps {
  value: Value
  onChange: (value: Value) => void
  error?: string
  placeholder?: string
  disabled?: boolean
}

const PhoneInputField = forwardRef<HTMLInputElement, PhoneInputFieldProps>(
  ({ value, onChange, error, placeholder = '+52 123 456 7890', disabled }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
          Phone Number <span className="text-red-500">*</span>
        </label>

        <PhoneInput
          id="phone"
          international
          defaultCountry="MX"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            flex w-full rounded-md border
            ${error ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-300 focus-within:ring-purple-600'}
            bg-white px-3 py-2 text-sm
            ring-offset-white
            focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
          `}
          numberInputProps={{
            className: 'flex-1 border-none outline-none bg-transparent px-2 py-1',
            ref: ref,
          }}
          countrySelectProps={{
            className: 'border-none outline-none bg-transparent',
          }}
        />

        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <p className="text-xs text-gray-600">
          Enter your phone number with country code
        </p>
      </div>
    )
  }
)

PhoneInputField.displayName = 'PhoneInputField'

export default PhoneInputField
