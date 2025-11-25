'use client'

import Link from 'next/link'
import { CartWidget } from '@/components/store/CartWidget'

/**
 * Header Component
 * Story 2.3: Shopping Cart Widget & Persistent State
 * Story 2.9: Basic Navigation Header (Customer Store)
 * AC-2.3.3: CartWidget Component in Header
 */

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-300 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/store"
          className="font-heading text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          Nixtia
        </Link>

        {/* Cart Widget */}
        <CartWidget />
      </div>
    </header>
  )
}
