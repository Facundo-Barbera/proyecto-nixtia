'use client'

import { CreditCard, Building2, Wallet } from 'lucide-react'
import type { PaymentMethod } from '@/lib/validations/checkout'

/**
 * Payment Method Selector Component
 * Story 2.5: Guest Checkout Form with Phone Input
 * AC-2.5.4: Payment Method Selector (Radio Group)
 *
 * Visual radio cards for payment options:
 * - Bank Transfer (Transferencia Bancaria)
 * - Cash on Delivery (Efectivo al Entregar)
 * - Card on Delivery (Tarjeta al Entregar)
 */

interface PaymentOption {
  value: PaymentMethod
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const paymentOptions: PaymentOption[] = [
  {
    value: 'BANK_TRANSFER',
    label: 'Bank Transfer',
    description: 'Transferencia Bancaria',
    icon: Building2,
  },
  {
    value: 'CASH_ON_DELIVERY',
    label: 'Cash on Delivery',
    description: 'Efectivo al Entregar',
    icon: Wallet,
  },
  {
    value: 'CARD_ON_DELIVERY',
    label: 'Card on Delivery',
    description: 'Tarjeta al Entregar',
    icon: CreditCard,
  },
]

interface PaymentMethodSelectorProps {
  value: PaymentMethod
  onChange: (value: PaymentMethod) => void
  error?: string
}

export default function PaymentMethodSelector({
  value,
  onChange,
  error,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        Payment Method <span className="text-red-500">*</span>
      </label>

      {/* Payment Method Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {paymentOptions.map((option) => {
          const Icon = option.icon
          const isSelected = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                relative flex flex-col items-start p-4 rounded-lg border-2 transition-all
                min-h-[100px] hover:border-purple-400
                ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-300 bg-white'
                }
                ${error ? 'border-red-500' : ''}
              `}
              aria-pressed={isSelected}
              aria-label={`${option.label} - ${option.description}`}
            >
              {/* Checkmark badge for selected option */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}

              {/* Icon */}
              <Icon
                className={`w-8 h-8 mb-3 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`}
              />

              {/* Label & Description */}
              <div className="text-left">
                <p
                  className={`font-semibold text-sm ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}
                >
                  {option.label}
                </p>
                <p className="text-xs text-gray-600 mt-1">{option.description}</p>
              </div>

              {/* Hidden radio input for accessibility */}
              <input
                type="radio"
                name="paymentMethod"
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
                aria-label={option.label}
              />
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
