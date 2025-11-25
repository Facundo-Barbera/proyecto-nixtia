# Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

## Database Query Pattern (Supabase-Only)

**CRITICAL: Never use Prisma client - use Supabase client exclusively**

```typescript
// ✅ CORRECT: Server-side query with RLS
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('is_active', true)

// ✅ CORRECT: Client-side query with RLS
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data, error } = await supabase
  .from('orders')
  .select('*, order_items(*)')
  .eq('customer_phone', phone)

// ❌ WRONG: Do not use Prisma
// await prisma.product.findMany() // NEVER USE THIS
```

## Server Action Pattern

```typescript
// src/actions/orders.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createOrderSchema = z.object({
  customer_phone: z.string().min(10),
  payment_method: z.enum(['BANK_TRANSFER', 'CASH_ON_DELIVERY', 'STRIPE']),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    quantity: z.number().int().positive()
  }))
})

export async function createOrder(formData: FormData) {
  const supabase = await createClient()

  // Parse and validate
  const data = createOrderSchema.parse(Object.fromEntries(formData))

  // Create order
  const { data: order, error } = await supabase
    .from('orders')
    .insert({ ...data })
    .select()
    .single()

  if (error) throw error

  // Revalidate cache
  revalidatePath('/admin/dashboard')

  return order
}
```

## Form Handling Pattern

```typescript
// Component using react-hook-form + zod + Server Action
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '@/lib/validations/checkout'
import { createOrder } from '@/actions/orders'
import { toast } from 'react-hot-toast'

export function CheckoutForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema)
  })

  const onSubmit = async (data) => {
    try {
      await createOrder(data)
      toast.success('Order created!')
    } catch (error) {
      toast.error('Failed to create order')
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>
}
```

## Type Generation Pattern

```bash
# Generate TypeScript types from Supabase schema
npx supabase gen types typescript --project-id <project-id> > src/types/database.types.ts

# Use generated types
import { Database } from '@/types/database.types'

type Product = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
```

## Image Upload Pattern

```typescript
// Upload to Supabase Storage
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

const { data, error } = await supabase.storage
  .from('product-images')
  .upload(`products/${productId}.jpg`, file, {
    cacheControl: '3600',
    upsert: true
  })

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('product-images')
  .getPublicUrl(`products/${productId}.jpg`)
```
