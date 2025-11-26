'use client'

/**
 * TransactionsTable Component
 * Story 3.5: Transactions Table Widget
 * AC-3.5.2: Table Structure and Columns
 * AC-3.5.4: Sorting Functionality
 * AC-3.5.5: Pagination
 * AC-3.5.7: Order Detail Link
 * AC-3.5.8: Empty State Handling
 *
 * Client Component for sorting and pagination interactivity
 */

import { useState } from 'react'
import { format } from 'date-fns'
import { ArrowUp, ArrowDown, PackageOpen } from 'lucide-react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { formatPhone } from '@/lib/utils/formatPhone'
import { translatePaymentMethod } from '@/lib/utils/translatePaymentMethod'
import { formatPrice } from '@/lib/utils/formatPrice'
import toast from 'react-hot-toast'

type Order = {
  id: string
  order_number: string
  customer_phone: string
  total_amount: number
  payment_method: string
  payment_status: string
  order_status: string
  created_at: string
}

interface TransactionsTableProps {
  orders: Order[]
}

type SortColumn = 'created_at' | 'total_amount'
type SortDirection = 'asc' | 'desc'
type PaymentMethod = 'BANK_TRANSFER' | 'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY' | 'STRIPE'
type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'
type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'

export function TransactionsTable({ orders }: TransactionsTableProps) {
  // AC-3.5.4: Sorting state (default: Date descending)
  const [sortColumn, setSortColumn] = useState<SortColumn>('created_at')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  // AC-3.5.5: Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  // AC-3.5.8: Empty state handling
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12">
        <PackageOpen className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
        <p className="text-sm text-gray-500 mb-4">Orders will appear here when customers make purchases</p>
        <Link href="/store">
          <Button variant="outline">View Store</Button>
        </Link>
      </div>
    )
  }

  // AC-3.5.4: Sorting logic
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortColumn === 'created_at') {
      const timeA = new Date(a.created_at).getTime()
      const timeB = new Date(b.created_at).getTime()
      return sortDirection === 'asc' ? timeA - timeB : timeB - timeA
    } else if (sortColumn === 'total_amount') {
      return sortDirection === 'asc'
        ? a.total_amount - b.total_amount
        : b.total_amount - a.total_amount
    }
    return 0
  })

  // AC-3.5.5: Pagination logic
  const totalPages = Math.ceil(sortedOrders.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedOrders = sortedOrders.slice(startIndex, endIndex)

  // AC-3.5.4: Handle sort column click
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new column with default descending
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  // AC-3.5.5: Pagination handlers
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  // AC-3.5.7: Order detail link handler (MVP: show toast)
  const handleOrderClick = () => {
    toast('Order details coming soon', {
      icon: 'ℹ️',
    })
  }

  // Sort indicator helper (returns JSX, not a component)
  const renderSortIndicator = (column: SortColumn) => {
    if (sortColumn !== column) return null
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-1 h-4 w-4 inline" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 inline" />
    )
  }

  return (
    <div className="space-y-4">
      {/* AC-3.5.2: Table with shadcn/ui components */}
      <div className="rounded-lg border bg-white overflow-x-auto">
        <Table>
          {/* AC-3.5.2: Table headers */}
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  onClick={() => handleSort('created_at')}
                  className="flex items-center font-semibold hover:text-purple-600 transition-colors"
                >
                  Date
                  {renderSortIndicator('created_at')}
                </button>
              </TableHead>
              <TableHead className="font-semibold">Order #</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('total_amount')}
                  className="flex items-center font-semibold hover:text-purple-600 transition-colors"
                >
                  Total
                  {renderSortIndicator('total_amount')}
                </button>
              </TableHead>
              <TableHead className="font-semibold">Payment Method</TableHead>
              <TableHead className="font-semibold">Payment Status</TableHead>
              <TableHead className="font-semibold">Order Status</TableHead>
            </TableRow>
          </TableHeader>

          {/* AC-3.5.2: Table body with data rows */}
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                {/* AC-3.5.2: Date column (formatted: "Nov 24, 2024 3:45 PM") */}
                <TableCell className="font-medium">
                  {format(new Date(order.created_at), 'MMM dd, yyyy h:mm a')}
                </TableCell>

                {/* AC-3.5.7: Order # (clickable link) */}
                <TableCell>
                  <button
                    onClick={handleOrderClick}
                    className="text-purple-600 hover:text-purple-800 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
                    aria-label={`View order ${order.order_number}`}
                  >
                    {order.order_number}
                  </button>
                </TableCell>

                {/* AC-3.5.2: Customer phone (formatted: +52 123 456 7890) */}
                <TableCell className="font-mono text-sm">
                  {formatPhone(order.customer_phone)}
                </TableCell>

                {/* AC-3.5.2: Total (formatted in MXN) */}
                <TableCell className="font-semibold">
                  {formatPrice(order.total_amount)}
                </TableCell>

                {/* AC-3.5.2: Payment Method (translated to Spanish) */}
                <TableCell>
                  {translatePaymentMethod(order.payment_method as PaymentMethod)}
                </TableCell>

                {/* AC-3.5.2: Payment Status badge */}
                <TableCell>
                  <StatusBadge
                    type="payment"
                    status={order.payment_status as PaymentStatus}
                  />
                </TableCell>

                {/* AC-3.5.2: Order Status badge */}
                <TableCell>
                  <StatusBadge
                    type="order"
                    status={order.order_status as OrderStatus}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* AC-3.5.5: Pagination controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages} ({sortedOrders.length} total orders)
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
