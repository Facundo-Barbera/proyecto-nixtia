import { LogoutButton } from '@/components/admin/LogoutButton'
import { TransactionsTable } from '@/components/admin/TransactionsTable'
import { prisma } from '@/lib/prisma'

// AC-3.5.3: Revalidate every 60 seconds
export const revalidate = 60

/**
 * Admin Dashboard Page
 * Story 3.5: Transactions Table Widget
 * AC-3.5.1: Admin Dashboard Page with Table
 * AC-3.5.3: Data Fetching (Server Component)
 */
export default async function AdminDashboardPage() {
  // AC-3.5.3: Fetch orders via Prisma in Server Component
  // Query: findMany({ orderBy: { created_at: 'desc' }, take: 100 })
  const orders = await prisma.orders.findMany({
    orderBy: { created_at: 'desc' },
    take: 100,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
                <span className="text-lg font-bold text-white">N</span>
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">
                Nixtia Admin
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <a
                href="/admin/dashboard"
                className="text-purple-600 font-medium border-b-2 border-purple-600 pb-1"
              >
                Dashboard
              </a>
              <span className="text-gray-400 font-medium cursor-not-allowed">
                Products
              </span>
            </div>

            {/* Logout Button */}
            <div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* AC-3.5.1: Dashboard page renders with "Transactions" heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="mt-2 text-gray-600">
            View and manage all customer orders
          </p>
        </div>

        {/* AC-3.5.1: TransactionsTable component displays below heading */}
        <TransactionsTable orders={orders} />
      </main>
    </div>
  )
}
