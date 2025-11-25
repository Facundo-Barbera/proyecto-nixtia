# Data Models - Nixtia

**Generated:** 2025-11-24
**Project:** proyecto-nixtia
**Database:** PostgreSQL via Prisma ORM

## Overview

The Nixtia platform uses PostgreSQL as its primary database, managed through Prisma ORM. The schema follows a straightforward relational design optimized for an e-commerce platform selling artisan corn products.

## Database Tables

### admin_users

**Purpose:** Stores admin user accounts for business intelligence dashboard access

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PRIMARY KEY | Unique identifier (likely UUID from Supabase Auth) |
| email | String | UNIQUE, NOT NULL | Admin email address for login |
| created_at | DateTime | DEFAULT now() | Account creation timestamp |
| updated_at | DateTime | NOT NULL | Last update timestamp |

**Indexes:** Primary key on `id`, unique constraint on `email`

---

### products

**Purpose:** Product catalog for corn-based artisan products

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PRIMARY KEY | Product unique identifier |
| name | String | NOT NULL | Product name |
| description | String | NULLABLE | Product description (optional) |
| price | Decimal(10,2) | NOT NULL | Product price in local currency |
| image_url | String | NULLABLE | Product image URL (Supabase Storage or external) |
| active | Boolean | DEFAULT true | Product availability flag |
| created_at | DateTime | DEFAULT now() | Product creation timestamp |
| updated_at | DateTime | NOT NULL | Last update timestamp |

**Business Rules:**
- Products can be soft-deleted by setting `active = false`
- Images stored in Supabase Storage with URLs referenced here
- Price precision: 2 decimal places

---

### orders

**Purpose:** Customer orders with payment and fulfillment tracking

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PRIMARY KEY | Order unique identifier |
| order_number | String | UNIQUE, NOT NULL | Human-readable order number for customer reference |
| customer_phone | String | NOT NULL | Customer phone number (primary contact method) |
| items_json | JSON | NOT NULL | Order items in JSON format (denormalized for simplicity) |
| total | Decimal(10,2) | NOT NULL | Order total amount |
| payment_method | PaymentMethod | ENUM, NOT NULL | Payment method selected by customer |
| payment_status | PaymentStatus | ENUM, DEFAULT PENDING | Payment confirmation status |
| order_status | OrderStatus | ENUM, DEFAULT PENDING | Order fulfillment status |
| created_at | DateTime | DEFAULT now() | Order creation timestamp |
| updated_at | DateTime | NOT NULL | Last update timestamp |

**Indexes:**
- Primary key on `id`
- Unique constraint on `order_number`
- Index on `created_at` (for chronological queries)
- Index on `customer_phone` (for customer lookup)

**Design Decision:**
- Order items stored as JSON rather than normalized line-item table
- Rationale: Simplicity for MVP, products rarely change prices retroactively
- Trade-off: Denormalization acceptable for read-heavy order history

---

## Enums

### PaymentMethod

Available payment options for customers:

```prisma
enum PaymentMethod {
  BANK_TRANSFER      // Customer pays via bank transfer
  CASH_ON_DELIVERY   // Cash payment on delivery
  CARD_ON_DELIVERY   // Card payment on delivery (POS terminal)
  STRIPE             // Online credit/debit card via Stripe
}
```

---

### PaymentStatus

Payment confirmation lifecycle:

```prisma
enum PaymentStatus {
  PENDING    // Awaiting payment or confirmation
  CONFIRMED  // Payment received and verified
  FAILED     // Payment attempt failed
}
```

---

### OrderStatus

Order fulfillment workflow:

```prisma
enum OrderStatus {
  PENDING    // Order placed, awaiting admin confirmation
  CONFIRMED  // Admin confirmed order
  PREPARING  // Order being prepared
  READY      // Order ready for pickup/delivery
  DELIVERED  // Order completed
  CANCELLED  // Order cancelled
}
```

**Status Flow:**
```
PENDING → CONFIRMED → PREPARING → READY → DELIVERED
           ↓
        CANCELLED (can occur at any stage before DELIVERED)
```

---

## Relationships

**Current Schema:** No foreign key relationships (denormalized design for MVP)

- `orders.items_json` contains product data snapshot (not FK to products)
- `admin_users` managed by Supabase Auth (external auth system)

**Future Normalization Opportunities:**
- Order line items table with FK to products
- Customer table with FK from orders
- Product categories/variants

---

## Data Access Patterns

### Primary Queries

1. **Product Catalog Display:**
   ```sql
   SELECT * FROM products WHERE active = true ORDER BY created_at DESC
   ```

2. **Order History (Admin):**
   ```sql
   SELECT * FROM orders ORDER BY created_at DESC
   ```

3. **Customer Order Lookup:**
   ```sql
   SELECT * FROM orders WHERE customer_phone = ? ORDER BY created_at DESC
   ```

4. **Order Status Tracking:**
   ```sql
   SELECT * FROM orders WHERE order_number = ?
   ```

---

## Database Migrations

**Migration Strategy:** Prisma Migrate

- Migrations stored in: `prisma/migrations/`
- Migration commands:
  - Development: `npx prisma migrate dev`
  - Production: `npx prisma migrate deploy`
  - Generate client: `npx prisma generate`

**Seed Data:** Configured via `prisma/seed.ts` (referenced in package.json)

---

## Security Considerations

### Row-Level Security (RLS)

**Expected RLS Policies (Supabase):**
- `admin_users`: Only accessible by authenticated admins
- `products`: Public read, admin write
- `orders`: Customers can read own orders (by phone), admins have full access

**Verification Script:** `verify-rls-policies.ts` (found in project root)

---

## Database Connection

**Environment Variable:** `DATABASE_URL`

**Provider:** PostgreSQL (hosted on Supabase)

**Connection Pooling:** Managed by Prisma Client

**Example .env:**
```
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

---

## References

- Prisma Schema: [`prisma/schema.prisma`](../../prisma/schema.prisma)
- Architecture Doc: [architecture.md](../solutioning/architecture.md)
- Functional Requirements: [PRD/functional-requirements.md](../planning/PRD/functional-requirements.md)
