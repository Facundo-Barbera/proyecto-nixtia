'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Copy, Check } from 'lucide-react'

/**
 * OrderNumberCopy Component
 * Story 2.8: Order Confirmation Page & Success State
 * AC-2.8.2: Order Confirmation Message
 *
 * Displays order number with click-to-copy functionality
 */
interface OrderNumberCopyProps {
  orderNumber: string
}

export default function OrderNumberCopy({ orderNumber }: OrderNumberCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      // AC-2.8.2: Copy order number to clipboard
      await navigator.clipboard.writeText(orderNumber)
      setCopied(true)
      toast.success('Order number copied!')

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('[OrderNumberCopy] Failed to copy:', error)
      toast.error('Failed to copy order number')
    }
  }

  return (
    <div className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-lg">
      <span className="text-xl font-semibold text-gray-900">
        Order #{orderNumber}
      </span>
      <button
        onClick={handleCopy}
        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
        aria-label="Copy order number"
        title="Copy order number"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Copy className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>
  )
}
