# Consistency Rules

## Naming Conventions

**Files & Directories:**
- Components: `PascalCase.tsx` (e.g., `ProductCard.tsx`, `CartFAB.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatPrice.ts`, `validatePhone.ts`)
- Server Actions: `camelCase.ts` in `/actions` (e.g., `createOrder`, `loginAdmin`)
- API Routes: `route.ts` in feature folder (e.g., `/api/webhooks/stripe/route.ts`)

**Database:**
- Tables: `snake_case` plural (e.g., `products`, `order_items`, `admin_users`)
- Columns: `snake_case` (e.g., `customer_phone`, `created_at`, `is_active`)
- Enums: `SCREAMING_SNAKE_CASE` (e.g., `BANK_TRANSFER`, `PENDING`, `CONFIRMED`)

**TypeScript:**
- Interfaces/Types: `PascalCase` (e.g., `Product`, `OrderItem`, `CartState`)
- Functions: `camelCase` (e.g., `formatPrice`, `createOrder`, `validatePhone`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `MAX_QUANTITY`, `DEFAULT_CURRENCY`)
- React Hooks: `camelCase` with `use` prefix (e.g., `useCart`, `useAuth`)

**Components:**
- Props types: `{ComponentName}Props` (e.g., `ProductCardProps`, `KPICardProps`)
- Event handlers: `handle{Event}` (e.g., `handleSubmit`, `handleAddToCart`)

## Code Organization

**Import Order:**
1. External libraries (React, Next.js, third-party)
2. Absolute imports from `@/` (components, lib, types)
3. Relative imports (local files)
4. CSS/styles (if any)

```typescript
// ✅ CORRECT import order
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Product } from '@/types'

import { calculateTotal } from './utils'
```

**Component Structure:**
1. Imports
2. Type definitions
3. Component function
4. Sub-components (if any)
5. Exports

**Directory Organization:**
- Feature-based: Group by feature (admin/, store/, landing/)
- Shared utilities in lib/
- Reusable UI in components/ui/
- Business logic in actions/ (Server Actions)

## Error Handling

**Pattern: Error Boundaries + Toast Notifications**

```typescript
// Error boundary (Next.js built-in)
// app/error.tsx
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// Toast for user-facing errors
import { toast } from 'react-hot-toast'

try {
  await createOrder(data)
  toast.success('Order created successfully!')
} catch (error) {
  console.error('Order creation failed:', error)
  toast.error('Failed to create order. Please try again.')
}

// Server-side error handling
export async function createOrder(data) {
  const supabase = await createClient()

  const { data: order, error } = await supabase
    .from('orders')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('[createOrder] Database error:', error.message)
    throw new Error('Failed to create order')
  }

  return order
}
```

**Error Response Format:**
```typescript
// Consistent error shape
interface ErrorResponse {
  error: {
    message: string
    code?: string
    details?: unknown
  }
}
```

## Logging Strategy

**Server-side logging only (console):**

```typescript
// ✅ CORRECT: Server-side logging
// actions/orders.ts
export async function createOrder(data) {
  console.log('[createOrder] Creating order for phone:', data.customer_phone)

  try {
    const result = await supabase.from('orders').insert(data)
    console.log('[createOrder] Order created:', result.data?.id)
    return result
  } catch (error) {
    console.error('[createOrder] Failed:', error)
    throw error
  }
}

// ❌ WRONG: Client-side logging in production
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info') // OK in dev only
}
```

**Log Format:**
- Prefix with `[functionName]` for context
- Include relevant IDs (order ID, user ID, product ID)
- Log errors with full stack trace
- No sensitive data (passwords, tokens, full phone numbers)

**Log Levels:**
- `console.log()` - General info (order created, user logged in)
- `console.warn()` - Warnings (deprecated API usage, rate limits)
- `console.error()` - Errors (database failures, validation errors)
