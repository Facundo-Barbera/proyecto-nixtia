import type { ReactNode } from 'react'
import { Header } from '@/components/shared/Header'

/**
 * Store Layout
 * Wraps all customer store pages with Header
 * Story 2.3: Shopping Cart Widget & Persistent State
 * Story 2.9: Basic Navigation Header
 */

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
