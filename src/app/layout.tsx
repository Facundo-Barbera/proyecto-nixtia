import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

// Body text font per UX Design Specification (3-visual-foundation.md:41)
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

// Monospace font for technical data (order numbers, etc.) per UX spec
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

// TAN Headline is not available on Google Fonts (custom brand font)
// Using Playfair Display as temporary substitute until brand font is provided
// TODO: Replace with actual TAN Headline font file when available
const headingFont = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['700', '900'],
})

export const metadata: Metadata = {
  title: 'Nixtia - Artisan Corn Products',
  description:
    'Premium artisan corn tortillas, tostadas, and traditional Mexican corn products. Fresh, authentic, delivered to your door.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${headingFont.variable} antialiased`}
      >
        <CartProvider>
          {children}
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  )
}
