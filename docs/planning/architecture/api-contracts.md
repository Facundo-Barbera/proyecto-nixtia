# API Contracts

## Server Actions (Mutations)

**Create Order:**
```typescript
// POST (Server Action)
createOrder(data: {
  customer_phone: string
  payment_method: 'BANK_TRANSFER' | 'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY' | 'STRIPE'
  items: Array<{
    product_id: string
    quantity: number
    unit_price: number
  }>
}) => Promise<Order>
```

**Admin Login:**
```typescript
// POST (Server Action)
loginAdmin(credentials: {
  email: string
  password: string
}) => Promise<{ success: boolean; error?: string }>
```

**Admin Logout:**
```typescript
// POST (Server Action)
logoutAdmin() => Promise<void>
```

## Supabase Query Patterns

**Get Products:**
```typescript
supabase.from('products').select('*').eq('is_active', true)
// Returns: Product[]
```

**Get Orders (Admin):**
```typescript
supabase.from('orders')
  .select('*, order_items(*, product:products(*))')
  .order('created_at', { ascending: false })
// Returns: Order[] with nested items
```

**Revenue Analytics (Admin):**
```typescript
supabase.from('orders')
  .select('created_at, total_amount, payment_method')
  .gte('created_at', startDate)
  .lte('created_at', endDate)
// Client-side aggregation with date-fns + Recharts
```

## Route Handlers (Webhooks)

**Stripe Webhook (Future):**
```typescript
// POST /api/webhooks/stripe
// Headers: stripe-signature
// Body: Stripe event payload
```
