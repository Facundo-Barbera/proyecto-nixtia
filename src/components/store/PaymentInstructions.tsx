import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, Building2, Banknote, CreditCard } from 'lucide-react'

/**
 * PaymentInstructions Component
 * Story 2.8: Order Confirmation Page & Success State
 * AC-2.8.4: Payment Instructions (Conditional)
 *
 * Displays payment-specific instructions based on payment method
 */
interface PaymentInstructionsProps {
  paymentMethod: string
  orderNumber: string
}

export default function PaymentInstructions({
  paymentMethod,
  orderNumber,
}: PaymentInstructionsProps) {
  // AC-2.8.4: Bank details (hardcoded for MVP)
  const bankDetails = {
    bankName: 'BBVA Bancomer',
    accountNumber: '0123456789',
    clabe: '012345678901234567',
    beneficiary: 'Nixtia Artisan Foods',
  }

  return (
    <Card className="p-6 bg-blue-50 border-blue-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-600" />
        Payment Instructions
      </h2>

      {/* AC-2.8.4: Conditional rendering based on payment method */}
      {paymentMethod === 'BANK_TRANSFER' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="w-6 h-6 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Bank Transfer Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-medium">{bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium">{bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CLABE:</span>
                  <span className="font-medium font-mono">{bankDetails.clabe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Beneficiary:</span>
                  <span className="font-medium">{bankDetails.beneficiary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium">{orderNumber}</span>
                </div>
              </div>
            </div>
          </div>

          <Alert>
            <AlertDescription>
              <strong>Instructions:</strong> Transfer the total amount and send confirmation via WhatsApp using the "Contact Us" button below.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {paymentMethod === 'CASH_ON_DELIVERY' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Banknote className="w-6 h-6 text-green-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Cash on Delivery
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Pay in cash when your order is delivered.
              </p>
              <Alert>
                <AlertDescription>
                  <strong>Note:</strong> Have exact change ready if possible to make the process smoother.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'CARD_ON_DELIVERY' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-purple-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Card on Delivery
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Pay with card when your order is delivered.
              </p>
              <Alert>
                <AlertDescription>
                  <strong>Accepted cards:</strong> We accept Visa, Mastercard, and American Express.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'STRIPE' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-purple-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Card Payment (Online)
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Your payment was processed securely through Stripe.
              </p>
              <Alert>
                <AlertDescription>
                  <strong>Confirmation:</strong> You should receive a payment receipt via email shortly.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
