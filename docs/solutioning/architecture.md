# Nixtia - Decision Architecture Document

## Executive Summary

Nixtia is a modern e-commerce web application built with Next.js 15 (App Router), React 19, shadcn/ui components, and Supabase backend. The architecture prioritizes mobile-first performance, elder-friendly accessibility, and operational simplicity for small artisan food businesses. Key architectural principles: serverless deployment on Vercel, type-safe data access with Prisma, real-time analytics via Supabase subscriptions, and frictionless guest checkout optimized for mobile devices.

## Project Initialization

**First Implementation Story: Project Setup**

```bash
npx create-next-app@latest nixtia --typescript --tailwind --app --src-dir --import-alias "@/*"
cd nixtia
```

This establishes the base architecture with:

- **TypeScript**: Type safety across frontend and backend
- **Tailwind CSS**: Utility-first styling (required for shadcn/ui)
- **App Router**: Next.js 15 modern routing with React Server Components
- **src/ directory**: Clean separation of source code
- **@/\* import alias**: Simplified imports

**Additional Setup Commands:**

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Install Supabase client
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# Install additional dependencies
npm install zod react-hook-form @hookform/resolvers
npm install recharts date-fns react-phone-number-input
npm install stripe @stripe/stripe-js
```

## Decision Summary

| Category           | Decision                 | Version | Affects Epics | Rationale                                                                      |
| ------------------ | ------------------------ | ------- | ------------- | ------------------------------------------------------------------------------ |
| Frontend Framework | Next.js                  | 15.1.x  | All epics     | React Server Components, App Router, built-in optimizations, Vercel deployment |
| React              | React                    | 19.x    | All epics     | Latest concurrent features, server components, streaming                       |
| TypeScript         | TypeScript               | 5.3+    | All epics     | Type safety, IDE autocomplete, reduced runtime errors                          |
| Styling            | Tailwind CSS             | 3.4+    | All epics     | Rapid prototyping, mobile-first responsive, required by shadcn/ui              |
| Component Library  | shadcn/ui                | Latest  | Epics 2, 3, 4 | WCAG AA accessible, customizable, Radix UI primitives                          |
| UI Icons           | Lucide React             | Latest  | All epics     | Modern icon library, tree-shakeable, consistent with shadcn/ui                 |
| Backend/Database   | Supabase                 | Cloud   | All epics     | PostgreSQL, Auth, Storage, Real-time, Row-Level Security                       |
| ORM                | Prisma                   | 6.x     | All epics     | Type-safe database access, migrations, schema management                       |
| Authentication     | Supabase Auth            | Cloud   | Epic 3        | Built-in email/password, session management, secure tokens                     |
| Payment Processing | Stripe                   | Latest  | Epic 2        | PCI compliance, Connect for client portal, test/live modes                     |
| Forms              | React Hook Form          | 7.x     | Epics 2, 3, 4 | Performance, validation, minimal re-renders                                    |
| Validation         | Zod                      | 3.x     | All epics     | Type-safe schema validation, frontend and backend                              |
| Charts             | Recharts                 | 2.x     | Epic 3        | Composable React charts, responsive, customizable                              |
| Phone Input        | react-phone-number-input | Latest  | Epic 2        | Country code selection, format validation, accessible                          |
| Date Handling      | date-fns                 | 3.x     | Epics 2, 3    | Lightweight, tree-shakeable, UTC/timezone support                              |
| Deployment         | Vercel                   | Cloud   | All epics     | Zero-config Next.js hosting, edge functions, CDN                               |
| Version Control    | Git + GitHub             | Latest  | All epics     | Source control, CI/CD integration                                              |
| Package Manager    | npm                      | 10.x    | All epics     | Default Next.js package manager                                                |
| Testing Framework  | Vitest                   | Latest  | All epics     | Fast, ESM-first, compatible with Next.js                                       |
| E2E Testing        | Playwright               | Latest  | Epics 2, 3    | Cross-browser, mobile emulation, accessibility testing                         |
| Linting            | ESLint                   | 8.x     | All epics     | Code quality, Next.js recommended config                                       |
| Formatting         | Prettier                 | 3.x     | All epics     | Consistent code style, auto-formatting                                         |

## Project Structure

```
nixtia/
├── .env.local                    # Local environment variables (gitignored)
├── .env.example                  # Example environment template
├── .gitignore
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json
├── prisma/
│   ├── schema.prisma            # Database schema (Supabase PostgreSQL)
│   ├── migrations/              # Database migrations
│   └── seed.ts                  # Seed data for development/demo
├── public/
│   ├── images/                  # Product images, brand assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                     # Next.js 15 App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page (redirects to /store or landing)
│   │   ├── store/               # Customer-facing store (Epic 2)
│   │   │   ├── page.tsx         # Product catalog grid
│   │   │   ├── products/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx # Product detail page
│   │   │   ├── cart/
│   │   │   │   └── page.tsx     # Cart page (mobile-first)
│   │   │   └── checkout/
│   │   │       ├── page.tsx     # Checkout form
│   │   │       └── success/
│   │   │           └── page.tsx # Order confirmation
│   │   ├── admin/               # Admin dashboard (Epic 3, 4)
│   │   │   ├── layout.tsx       # Admin layout with auth guard
│   │   │   ├── login/
│   │   │   │   └── page.tsx     # Admin login page
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx     # Analytics dashboard
│   │   │   └── products/
│   │   │       ├── page.tsx     # Product management list
│   │   │       ├── new/
│   │   │       │   └── page.tsx # Add product
│   │   │       └── [id]/
│   │   │           └── edit/
│   │   │               └── page.tsx # Edit product
│   │   ├── landing/             # Marketing landing page (Epic 4 - optional)
│   │   │   └── page.tsx
│   │   └── api/                 # API routes
│   │       ├── auth/            # Auth endpoints (Supabase integration)
│   │       ├── orders/          # Order creation, retrieval
│   │       ├── products/        # Product CRUD operations
│   │       ├── analytics/       # Dashboard data aggregation
│   │       └── webhooks/
│   │           └── stripe/
│   │               └── route.ts # Stripe webhook handler
│   ├── components/              # Reusable React components
│   │   ├── ui/                  # shadcn/ui components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   ├── store/               # Customer store components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartWidget.tsx
│   │   │   ├── PhoneInput.tsx
│   │   │   └── PaymentMethodSelector.tsx
│   │   ├── admin/               # Admin dashboard components
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── TransactionsTable.tsx
│   │   │   ├── PaymentBreakdown.tsx
│   │   │   └── ProductForm.tsx
│   │   └── shared/              # Shared components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorBoundary.tsx
│   ├── lib/                     # Utilities and configurations
│   │   ├── supabase/
│   │   │   ├── client.ts        # Supabase client (browser)
│   │   │   ├── server.ts        # Supabase server client
│   │   │   └── middleware.ts    # Auth middleware
│   │   ├── stripe/
│   │   │   ├── client.ts        # Stripe client configuration
│   │   │   └── webhook.ts       # Webhook verification helpers
│   │   ├── prisma.ts            # Prisma client singleton
│   │   ├── utils.ts             # General utilities (cn, formatters)
│   │   └── validations/         # Zod schemas
│   │       ├── product.ts
│   │       ├── order.ts
│   │       └── auth.ts
│   ├── hooks/                   # Custom React hooks
│   │   ├── useCart.ts           # Cart state management
│   │   ├── useAuth.ts           # Authentication state
│   │   └── useLocalStorage.ts   # Persistent storage
│   ├── types/                   # TypeScript type definitions
│   │   ├── database.ts          # Supabase generated types
│   │   ├── models.ts            # Application domain types
│   │   └── api.ts               # API request/response types
│   ├── styles/
│   │   └── globals.css          # Global styles, Tailwind imports
│   └── middleware.ts            # Next.js middleware (auth, redirects)
├── tests/
│   ├── unit/                    # Vitest unit tests
│   │   ├── components/
│   │   ├── lib/
│   │   └── hooks/
│   ├── integration/             # API integration tests
│   │   └── api/
│   └── e2e/                     # Playwright end-to-end tests
│       ├── customer-checkout.spec.ts
│       ├── admin-dashboard.spec.ts
│       └── product-management.spec.ts
└── docs/                        # Project documentation
    ├── planning/                # PRD, UX Design, Epics
    └── solutioning/             # Architecture, test strategy, readiness

```

## Epic to Architecture Mapping

| Epic                                     | Primary Directories                                                                   | Key Technologies                                            | Database Tables                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------- |
| **Epic 1: Foundation & Infrastructure**  | `prisma/`, `src/lib/supabase/`, `src/middleware.ts`                                   | Next.js, Prisma, Supabase, Vercel                           | Initial schema, migrations          |
| **Epic 2: Customer Store Experience**    | `src/app/store/`, `src/components/store/`, `src/hooks/useCart.ts`                     | React Server Components, shadcn/ui, Stripe, react-hook-form | `products`, `orders`, `order_items` |
| **Epic 3: Admin Business Intelligence**  | `src/app/admin/dashboard/`, `src/components/admin/`, `src/api/analytics/`             | Supabase Auth, Recharts, Supabase Real-time                 | `orders`, `admin_users`             |
| **Epic 4: Product Management & Landing** | `src/app/admin/products/`, `src/app/landing/`, `src/components/admin/ProductForm.tsx` | Supabase Storage (images), Server Actions                   | `products`, `product_images`        |

## Technology Stack Details

### Core Technologies

**Next.js 15 App Router**

- **Routing**: File-system based with app/ directory
- **Rendering**:
  - Server Components by default (product catalog, landing page)
  - Client Components where needed (cart widget, interactive forms)
  - Server-Side Rendering for SEO pages
  - Static Generation for landing page
- **API Routes**: Route handlers in `app/api/` directory
- **Middleware**: Authentication checks, redirects
- **Image Optimization**: Built-in next/image component for product images
- **Font Optimization**: Built-in next/font for typography

**React 19**

- **Server Components**: Default for data fetching pages
- **Client Components**: Interactive UI marked with "use client"
- **Server Actions**: Form submissions, mutations
- **Suspense**: Loading states with fallbacks
- **Error Boundaries**: Graceful error handling

**Supabase Backend**

- **PostgreSQL Database**: Primary data store
- **Authentication**: Email/password for admin users
- **Row-Level Security**: Admin access control
- **Real-time Subscriptions**: Dashboard live updates (optional enhancement)
- **Storage**: Product image uploads
- **Edge Functions**: Webhook handlers, complex business logic

**shadcn/ui + Tailwind CSS**

- **Design System**: Pre-built accessible components
- **Theming**: Custom purple brand color palette
- **Responsive**: Mobile-first breakpoints (320px, 768px, 1024px)
- **Dark Mode**: Optional (not MVP, but architecture supports it)
- **Component Examples**: Button, Card, Dialog, Sheet, Input, Select, Badge, Table

### Integration Points

**Supabase Client Integration**

```typescript
// Browser client (src/lib/supabase/client.ts)
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// Server client (src/lib/supabase/server.ts)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
      },
    }
  )
```

**Stripe Integration**

```typescript
// Client-side (src/lib/stripe/client.ts)
import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Server-side (src/lib/stripe/server.ts)
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})
```

**Prisma ORM Integration**

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## Novel Pattern Designs

### Frictionless Guest Checkout Pattern

**Challenge**: Enable customers to purchase without accounts while maintaining order traceability and minimizing friction.

**Solution**: Phone-Number-as-Identity Pattern

**Components**:

1. **PhoneInput Component**: Country code selector + validated phone number input
2. **GuestCheckoutForm**: Minimal form collecting only phone number + payment method
3. **OrderReference System**: Generate unique order codes for customers

**Data Flow**:

```
1. Customer completes cart selection
2. Navigates to /checkout
3. PhoneInput validates format (E.164: +1234567890)
4. Payment method selection (bank transfer / cash-card / Stripe)
5. Server creates order with phone_number field (no user account)
6. Order reference generated: NX-2024-001234
7. Confirmation page displays reference + payment instructions
8. (Future) SMS notification with order details
```

**Implementation Guide**:

- Phone number stored in `orders.customer_phone` column (VARCHAR, E.164 format)
- Order reference pattern: `NX-{YEAR}-{6-digit-increment}`
- No authentication required for checkout flow
- Admin can search orders by phone number
- Future enhancement: Phone-based order lookup for customers

**Affects Epics**: Epic 2 (Customer Store Experience)

### Real-Time Dashboard Analytics Pattern

**Challenge**: Provide business owner with live revenue insights without manual refresh.

**Solution**: Supabase Real-time Subscriptions with Recharts

**Components**:

1. **RevenueChart Component**: Recharts line/bar chart with live data
2. **useRealtimeOrders Hook**: Supabase subscription to orders table
3. **Analytics Aggregation**: Server-side calculations for performance

**Data Flow**:

```
1. Admin loads /admin/dashboard
2. Initial data fetched via Server Component
3. Client Component subscribes to orders table changes
4. New order triggers Supabase real-time event
5. Hook updates local state
6. Recharts re-renders with new data point
7. Toast notification: "New order received: +$XX.XX"
```

**Implementation Guide**:

```typescript
// src/hooks/useRealtimeOrders.ts
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useRealtimeOrders(initialOrders: Order[]) {
  const [orders, setOrders] = useState(initialOrders)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        setOrders((current) => [payload.new as Order, ...current])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return orders
}
```

**Affects Epics**: Epic 3 (Admin Business Intelligence)

## Implementation Patterns

### Naming Conventions

**Files and Directories**:

- **React Components**: PascalCase with .tsx extension (`ProductCard.tsx`, `CartWidget.tsx`)
- **Utility files**: camelCase with .ts extension (`utils.ts`, `formatters.ts`)
- **API routes**: lowercase with route.ts (`app/api/orders/route.ts`)
- **Pages**: lowercase with page.tsx (`app/store/page.tsx`)
- **Test files**: Same name as tested file with .test.ts or .spec.ts suffix

**Database**:

- **Tables**: snake_case plural (`products`, `order_items`, `admin_users`)
- **Columns**: snake_case (`product_name`, `customer_phone`, `created_at`)
- **Foreign keys**: `{table}_id` pattern (`product_id`, `order_id`)
- **Timestamps**: `created_at`, `updated_at` (always include)

**API Endpoints**:

- **REST resources**: Plural nouns (`/api/products`, `/api/orders`)
- **Actions**: POST for create, GET for read, PATCH for update, DELETE for delete
- **Route parameters**: `/api/products/[id]` (Next.js dynamic segment)

**React Components**:

- **Component names**: Descriptive PascalCase (`PaymentMethodSelector`, `RevenueChart`)
- **Props interfaces**: `{ComponentName}Props` pattern (`ProductCardProps`)
- **Event handlers**: `handle{Event}` pattern (`handleAddToCart`, `handleSubmit`)
- **State variables**: Descriptive camelCase (`cartItems`, `isLoading`, `selectedPaymentMethod`)

**TypeScript**:

- **Types**: PascalCase (`Product`, `Order`, `CartItem`)
- **Interfaces**: PascalCase with `I` prefix for data transfer objects only (`IOrderRequest`)
- **Enums**: PascalCase enum name, UPPER_CASE values (`PaymentMethod.BANK_TRANSFER`)
- **Generics**: Single uppercase letter or descriptive PascalCase (`T`, `TData`)

### Code Organization

**Component Structure**:

```typescript
// 1. Imports - external dependencies first, internal second
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types/models'

// 2. Type definitions
interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

// 3. Component definition
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // 3a. Hooks (in order: state, context, custom hooks)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  // 3b. Event handlers
  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product)
    onAddToCart?.(product)
    setIsAdding(false)
  }

  // 3c. Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

**API Route Structure**:

```typescript
// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { CreateOrderSchema } from '@/lib/validations/order'

// POST /api/orders
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body = await request.json()
    const validatedData = CreateOrderSchema.parse(body)

    // 2. Business logic
    const order = await prisma.order.create({
      data: {
        customer_phone: validatedData.customerPhone,
        total_amount: validatedData.totalAmount,
        payment_method: validatedData.paymentMethod,
        order_items: {
          create: validatedData.items,
        },
      },
      include: {
        order_items: true,
      },
    })

    // 3. Return response
    return NextResponse.json({ data: order }, { status: 201 })
  } catch (error) {
    // 4. Error handling
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**Test File Co-location**:

- Unit tests: `src/components/store/__tests__/ProductCard.test.tsx`
- Integration tests: `tests/integration/api/orders.test.ts`
- E2E tests: `tests/e2e/customer-checkout.spec.ts`

### Error Handling

**Client-Side Error Handling**:

```typescript
// Use Error Boundaries for component errors
// app/error.tsx (automatically wraps route segments)
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

// Use try-catch for async operations in components
const handleSubmit = async () => {
  try {
    await createOrder(orderData)
  } catch (error) {
    toast.error('Failed to create order. Please try again.')
    console.error('Order creation error:', error)
  }
}
```

**Server-Side Error Handling**:

```typescript
// API routes return structured errors
export async function POST(request: NextRequest) {
  try {
    // Business logic
  } catch (error) {
    // Log errors for debugging
    console.error('[API Error]', error)

    // Return user-friendly messages
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ error: 'Resource already exists' }, { status: 409 })
      }
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**Error Response Format** (ALL API routes MUST follow):

```typescript
// Success response
{
  "data": { /* actual data */ },
  "meta"?: { /* pagination, etc. */ }
}

// Error response
{
  "error": "User-friendly error message",
  "details"?: { /* validation errors, etc. */ }
}
```

### Logging Strategy

**Development Logging**:

```typescript
// Use descriptive console logs with prefixes
console.log('[ProductCard] Adding product to cart:', product.id)
console.error('[API Error] Failed to create order:', error)
console.warn('[Performance] Slow query detected:', queryTime)
```

**Production Logging** (Future enhancement):

- Integrate with Vercel Analytics or similar
- Log errors to Sentry or similar service
- Track performance metrics

**What to Log**:

- ✅ API errors with context
- ✅ Authentication failures
- ✅ Payment processing events
- ✅ Database query errors
- ❌ Sensitive user data (passwords, payment details)
- ❌ Excessive debug logs in production

## Data Architecture

### Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  image_url   String?
  is_active   Boolean  @default(true)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt

  order_items OrderItem[]

  @@map("products")
}

model Order {
  id             String   @id @default(uuid())
  order_number   String   @unique // NX-2024-001234
  customer_phone String   // E.164 format: +1234567890
  total_amount   Decimal  @db.Decimal(10, 2)
  payment_method PaymentMethod
  payment_status PaymentStatus @default(PENDING)
  order_status   OrderStatus   @default(PENDING)
  created_at     DateTime @default(now())
  updated_at     DateTime @updatedAt

  order_items OrderItem[]

  @@map("orders")
  @@index([customer_phone])
  @@index([created_at])
}

model OrderItem {
  id         String  @id @default(uuid())
  order_id   String
  product_id String
  quantity   Int
  unit_price Decimal @db.Decimal(10, 2)
  subtotal   Decimal @db.Decimal(10, 2)

  order   Order   @relation(fields: [order_id], references: [id], onDelete: Cascade)
  product Product @relation(fields: [product_id], references: [id])

  @@map("order_items")
  @@index([order_id])
  @@index([product_id])
}

model AdminUser {
  id         String   @id @default(uuid())
  email      String   @unique
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  @@map("admin_users")
}

enum PaymentMethod {
  BANK_TRANSFER
  CASH_ON_DELIVERY
  CARD_ON_DELIVERY
  STRIPE
}

enum PaymentStatus {
  PENDING
  CONFIRMED
  FAILED
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  DELIVERED
  CANCELLED
}
```

### Data Relationships

- **Product → OrderItem**: One-to-Many (a product can appear in multiple order items)
- **Order → OrderItem**: One-to-Many (an order contains multiple items)
- **Order.customer_phone**: No foreign key (guest checkout, no user table)
- **AdminUser**: Managed by Supabase Auth, minimal user table for reference

### Data Validation (Zod Schemas)

```typescript
// src/lib/validations/order.ts
import { z } from 'zod'

export const CreateOrderSchema = z.object({
  customerPhone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format'),
  paymentMethod: z.enum(['BANK_TRANSFER', 'CASH_ON_DELIVERY', 'CARD_ON_DELIVERY', 'STRIPE']),
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().int().positive(),
        unit_price: z.number().positive(),
      })
    )
    .min(1, 'Order must contain at least one item'),
})

// src/lib/validations/product.ts
export const CreateProductSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  price: z.number().positive(),
  image_url: z.string().url().optional(),
})
```

## API Contracts

### REST API Standards

**Base URL**: `https://nixtia.vercel.app/api`

**Request Headers**:

```
Content-Type: application/json
Authorization: Bearer {token}  // Admin endpoints only
```

**Response Format**:

```typescript
// Success
{
  "data": T,
  "meta"?: {
    "page": number,
    "total": number,
    "hasMore": boolean
  }
}

// Error
{
  "error": string,
  "details"?: object
}
```

**HTTP Status Codes**:

- `200 OK`: Successful GET, PATCH
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid auth token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource
- `500 Internal Server Error`: Server error

### API Endpoints

**Products**:

```
GET    /api/products           # List all active products
GET    /api/products/[id]      # Get product by ID
POST   /api/products           # Create product (admin)
PATCH  /api/products/[id]      # Update product (admin)
DELETE /api/products/[id]      # Delete product (admin)
```

**Orders**:

```
GET    /api/orders             # List orders (admin, with filters)
GET    /api/orders/[id]        # Get order by ID
POST   /api/orders             # Create order (guest checkout)
PATCH  /api/orders/[id]/status # Update order status (admin)
```

**Analytics**:

```
GET    /api/analytics/revenue  # Revenue data with date range filters (admin)
GET    /api/analytics/payments # Payment method breakdown (admin)
```

**Authentication**:

```
POST   /api/auth/login         # Admin login (email/password)
POST   /api/auth/logout        # Admin logout
GET    /api/auth/session       # Get current session
```

## Security Architecture

### Authentication & Authorization

**Admin Authentication**:

- Supabase Auth with email/password
- Session stored in httpOnly cookies (secure, not accessible via JavaScript)
- Session timeout: 30 minutes of inactivity (configurable)
- Password requirements: Minimum 8 characters, at least 1 uppercase, 1 number

**Authorization Middleware**:

```typescript
// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const supabase = createServerClient(/* ... */)
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

**Row-Level Security (Supabase)**:

```sql
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read access to active products
CREATE POLICY "Public can view active products"
ON products FOR SELECT
USING (is_active = true);

-- Admin full access
CREATE POLICY "Admins can do everything"
ON products FOR ALL
USING (auth.uid() IN (SELECT id FROM admin_users));
```

### Data Protection

**HTTPS**:

- All traffic served over HTTPS (enforced by Vercel)
- HTTP Strict Transport Security (HSTS) headers enabled

**Input Sanitization**:

- Zod validation on all API inputs
- SQL injection prevention via Prisma parameterized queries
- XSS prevention via React automatic escaping

**Sensitive Data Storage**:

- Passwords: Hashed by Supabase Auth (bcrypt)
- Phone numbers: Stored in plain text (needed for customer contact)
- Payment data: NEVER stored (handled by Stripe)

**Environment Variables**:

```
# .env.local (NEVER commit to git)
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..." # Server-side only
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### CORS & CSRF

**CORS**: Not needed (same-origin requests only)
**CSRF**:

- Next.js API routes use SameSite cookies by default
- Admin mutations require valid session token

## Performance Considerations

### Performance Targets (from PRD)

**Customer Store**:

- Product catalog: < 2 seconds on mobile 4G
- Product detail: < 1.5 seconds
- Cart updates: < 200ms
- Checkout submission: < 3 seconds

**Admin Dashboard**:

- Dashboard load: < 2 seconds
- Chart rendering: < 500ms
- Real-time updates: < 1 second latency

### Optimization Strategies

**Image Optimization**:

```typescript
// Use Next.js Image component ALWAYS
import Image from 'next/image'

<Image
  src={product.image_url}
  alt={product.name}
  width={400}
  height={400}
  sizes="(max-width: 768px) 100vw, 400px"
  quality={85}
  loading="lazy"
/>
```

**Code Splitting**:

- Automatic by Next.js App Router (route-based)
- Dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic'

const RevenueChart = dynamic(() => import('@/components/admin/RevenueChart'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Client-side only for charts
})
```

**Database Query Optimization**:

- Indexes on frequently queried columns (`customer_phone`, `created_at`)
- Prisma query optimization: select only needed fields

```typescript
const products = await prisma.product.findMany({
  where: { is_active: true },
  select: {
    id: true,
    name: true,
    price: true,
    image_url: true,
    // Exclude description to reduce payload size
  },
})
```

**Caching**:

- Next.js automatic static caching for Server Components
- Revalidation strategy:

```typescript
// app/store/page.tsx
export const revalidate = 300 // Revalidate every 5 minutes
```

**Bundle Size**:

- Tree-shaking enabled by default (ES modules)
- Use `import { Button } from '@/components/ui/button'` (NOT `import * as UI`)
- Analyze bundle: `npm run build && npm run analyze`

## Deployment Architecture

### Vercel Deployment

**Build Configuration**:

```json
// vercel.json
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

**Environment Variables** (set in Vercel dashboard):

- Production: `DATABASE_URL`, `SUPABASE_*`, `STRIPE_*`
- Preview: Same as production with test Stripe keys
- Development: Use `.env.local` file

**Deployment Workflow**:

1. Push to `main` branch triggers production deployment
2. Pull requests trigger preview deployments
3. Vercel runs: `prisma generate` → `npm run build`
4. Edge functions deployed to Vercel Edge Network
5. Static assets cached on CDN

**Database Migrations**:

```bash
# Run migrations manually via Vercel CLI or GitHub Actions
npx prisma migrate deploy
```

**Edge Functions** (Future Enhancement):

- Move analytics aggregation to edge for global low latency
- Use `export const runtime = 'edge'` in API routes

### Supabase Configuration

**Database**: PostgreSQL (managed by Supabase)
**Connection Pooling**: Enabled via Supabase (Supavisor)
**Backups**: Automatic daily backups (Supabase Pro plan)
**SSL**: Required for all connections

**Supabase Storage**:

- Bucket: `product-images` (public read access)
- Max file size: 5MB per image
- Allowed formats: JPEG, PNG, WebP

## Development Environment

### Prerequisites

- **Node.js**: 20.x LTS
- **npm**: 10.x
- **Git**: 2.x
- **Supabase Account**: Free tier sufficient for development
- **Stripe Account**: Test mode for development
- **Vercel Account** (optional): For preview deployments

### Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/your-org/nixtia.git
cd nixtia

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Stripe credentials

# 4. Initialize Prisma
npx prisma generate
npx prisma migrate dev

# 5. Seed database (optional)
npx prisma db seed

# 6. Run development server
npm run dev

# Navigate to http://localhost:3000
```

### Development Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "db:migrate": "prisma migrate dev",
    "db:reset": "prisma migrate reset",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio"
  }
}
```

### IDE Configuration (VSCode recommended)

**Extensions**:

- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense

**Settings** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Architecture Decision Records (ADRs)

### ADR-001: Choose Next.js App Router over Pages Router

**Status**: Accepted

**Context**: Next.js offers two routing paradigms. App Router (Next.js 13+) is the modern approach with React Server Components.

**Decision**: Use Next.js 15 App Router

**Rationale**:

- Server Components reduce bundle size (product catalog, landing page)
- Streaming and Suspense for better loading states
- Built-in layouts and error boundaries
- Better performance for SEO pages
- Future-proof (Pages Router is legacy)

**Consequences**:

- Team must learn Server Components vs Client Components distinction
- Some libraries require "use client" directive
- Cannot use certain React hooks in Server Components

### ADR-002: Use Supabase instead of custom backend

**Status**: Accepted

**Context**: Need PostgreSQL database, authentication, file storage, and optionally real-time subscriptions.

**Decision**: Use Supabase as backend-as-a-service

**Rationale**:

- Reduces infrastructure complexity
- Built-in authentication (no need for custom auth)
- Row-Level Security for data protection
- Generous free tier for MVP
- Real-time capabilities for dashboard
- Storage for product images

**Consequences**:

- Vendor lock-in (mitigated: PostgreSQL is standard)
- Must learn Supabase-specific patterns
- Limited customization compared to custom backend

### ADR-003: Use shadcn/ui instead of pre-built component library (MUI, Chakra)

**Status**: Accepted

**Context**: Need accessible, mobile-first component library for rapid development.

**Decision**: Use shadcn/ui with Radix UI primitives

**Rationale**:

- Full control over component code (copy-paste, not npm install)
- Tailwind CSS integration (consistent with project styling)
- WCAG AA accessible by default (elder-friendly requirement)
- Highly customizable (purple brand colors)
- No bundle size bloat (only copy components you use)

**Consequences**:

- Components are copied into codebase (more code to maintain)
- Must manually update components if shadcn/ui releases fixes
- Team must understand Radix UI primitives

### ADR-004: Phone number as guest identity instead of email

**Status**: Accepted

**Context**: Want frictionless checkout without forcing account creation.

**Decision**: Use phone number (E.164 format) as primary customer identifier

**Rationale**:

- WhatsApp is primary communication channel in target market
- Phone more familiar than email for elder demographic
- Enables future WhatsApp order notifications
- Easier to remember than order numbers
- Single field reduces checkout friction

**Consequences**:

- No email for order confirmations in MVP
- Phone number validation must be strict
- Privacy considerations (phone numbers are sensitive)
- Duplicate phone detection needed

### ADR-005: Use Prisma ORM instead of Supabase client directly

**Status**: Accepted

**Context**: Need type-safe database access with migrations.

**Decision**: Use Prisma as ORM layer on top of Supabase PostgreSQL

**Rationale**:

- Full TypeScript type safety (auto-generated types)
- Declarative migrations (version controlled)
- Better query ergonomics than raw SQL
- Prisma Studio for database GUI
- Compatible with Supabase PostgreSQL

**Consequences**:

- Prisma + Supabase client both in project (slight complexity)
- Must run `prisma generate` before builds
- Migrations must be applied to Supabase manually

### ADR-006: Use Recharts instead of Chart.js for admin analytics

**Status**: Accepted

**Context**: Need charting library for revenue visualization.

**Decision**: Use Recharts

**Rationale**:

- React-first (composable components)
- TypeScript support
- Responsive by default
- Smaller bundle size than Chart.js
- Integrates well with shadcn/ui theming

**Consequences**:

- Learning curve for Recharts API
- Less powerful than D3.js (but sufficient for needs)

---

**Document Metadata**:

- Generated by: BMad Architecture Workflow v1.0
- Date: 2025-11-18
- Author: Winston (Architect Agent)
- Reviewed by: BMad Master, Mary (Analyst), Murat (Test Architect)
- For: Facundo
- Project: proyecto-nixtia (Nixtia E-commerce Platform)
- Status: Ready for Implementation Phase
