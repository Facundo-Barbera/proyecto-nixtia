# FR Category to Architecture Mapping

| FR Category | Routes | Components | Data Models | Integration Points |
|-------------|--------|------------|-------------|-------------------|
| **User Account & Access (FR1-10)** | `/admin/login` | `AdminLogin`, `AuthGuard` | `admin_users` table | Supabase Auth (email/password) |
| **Product Catalog (FR11-20)** | `/store`, `/store/[id]` | `ProductCard`, `ProductDetail` | `products` table | Supabase Storage (images) |
| **Shopping Cart (FR21-26)** | `/store/*` | `CartFAB`, `CartSummary`, `CartContext` | Client-side state | React Context |
| **Checkout (FR27-34)** | `/store/checkout`, `/store/checkout/success` | `PhoneInput`, `PaymentMethodSelector` | `orders`, `order_items` tables | Supabase (order creation) |
| **Payment Processing (FR35-43)** | `/store/checkout` | `PaymentMethodSelector`, `OrderConfirmation` | `orders` table (payment_method) | Stripe (future live mode) |
| **Analytics & Dashboard (FR44-54)** | `/admin/dashboard` | `KPICard`, `RevenueChart`, `TransactionsTable`, `PaymentBreakdownChart` | `orders` table (aggregations) | Supabase (queries), Recharts |
| **Landing Page (FR55-59)** | `/landing` | `Hero`, `ProductShowcase`, `About` | None | Static content |
