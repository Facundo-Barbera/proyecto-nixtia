# API Contracts - Nixtia

**Generated:** 2025-11-24
**Project:** proyecto-nixtia
**API Type:** Next.js App Router API Routes

## Overview

Nixtia uses Next.js 16 App Router API routes for server-side logic. All API endpoints follow RESTful conventions and return JSON responses.

**Base URL (Development):** `http://localhost:3000/api`
**Base URL (Production):** `https://[your-domain]/api`

## Authentication

**Method:** Supabase Auth (Session-based)

- Admin routes: Require authenticated session
- Public routes: No authentication required
- Auth middleware: `src/middleware.ts`

---

## API Endpoints

### 1. Database Test Endpoint

**Purpose:** Verify database connectivity

```
GET /api/test-db
```

**Authentication:** None (public endpoint)

**Response:**

**Success (200):**
```json
{
  "status": "success",
  "message": "Database connection successful",
  "timestamp": "2025-11-24T00:00:00.000Z"
}
```

**Error (500):**
```json
{
  "status": "error",
  "message": "Database connection failed",
  "error": "Connection error details"
}
```

**Location:** [`src/app/api/test-db/route.ts`](../../src/app/api/test-db/route.ts)

---

### 2. Orders API

**Purpose:** Create new customer orders

```
POST /api/orders
```

**Authentication:** None (guest checkout)

**Request Body:**
```typescript
{
  customer_phone: string;        // E.164 format recommended (e.g., "+54911...")
  items: Array<{
    product_id: string;
    quantity: number;
    price: number;               // Price snapshot at time of order
    name: string;
  }>;
  total: number;                 // Total order amount
  payment_method: "BANK_TRANSFER" | "CASH_ON_DELIVERY" | "CARD_ON_DELIVERY" | "STRIPE";
}
```

**Validation Rules:**
- `customer_phone`: Required, valid phone number
- `items`: Non-empty array, each item must have valid product_id
- `total`: Must match sum of (item.price * item.quantity)
- `payment_method`: Must be one of enum values

**Response:**

**Success (201):**
```json
{
  "success": true,
  "order": {
    "id": "uuid",
    "order_number": "ORD-20251124-001",
    "customer_phone": "+5491112345678",
    "total": 1250.50,
    "payment_method": "BANK_TRANSFER",
    "payment_status": "PENDING",
    "order_status": "PENDING",
    "created_at": "2025-11-24T00:00:00.000Z"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "error": "Validation error message",
  "details": {
    "field": "customer_phone",
    "message": "Invalid phone number format"
  }
}
```

**Error (500):**
```json
{
  "success": false,
  "error": "Internal server error"
}
```

**Location:** [`src/app/api/orders/route.ts`](../../src/app/api/orders/route.ts)

**Business Logic:**
1. Validate request payload using Zod schema
2. Generate unique `order_number` (format: ORD-YYYYMMDD-NNN)
3. Store items as JSON in `items_json` column
4. Set initial statuses (payment_status: PENDING, order_status: PENDING)
5. Return order confirmation with order_number for tracking

---

### 3. Admin Logout

**Purpose:** Log out admin user

```
POST /api/auth/logout
```

**Authentication:** Required (authenticated admin session)

**Request Body:** None (empty or {})

**Response:**

**Success (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Error (401):**
```json
{
  "success": false,
  "error": "Not authenticated"
}
```

**Location:** [`src/app/api/auth/logout/route.ts`](../../src/app/api/auth/logout/route.ts)

**Implementation:** Calls Supabase Auth `signOut()` method

---

## Future API Endpoints (Not Yet Implemented)

Based on architecture and PRD, these endpoints are planned:

### Products API

```
GET /api/products              # List all active products
GET /api/products/:id          # Get single product details
POST /api/products             # Create product (admin only)
PUT /api/products/:id          # Update product (admin only)
DELETE /api/products/:id       # Soft-delete product (admin only)
```

### Admin Orders API

```
GET /api/admin/orders          # List all orders with filters
PUT /api/admin/orders/:id      # Update order status
```

### Admin Authentication API

```
POST /api/auth/login           # Admin login (email/password)
GET /api/auth/session          # Get current session
```

---

## Error Handling Standards

All API routes follow consistent error response format:

```typescript
{
  success: boolean;
  error?: string;               // Human-readable error message
  details?: {                   // Optional structured error details
    field?: string;
    message?: string;
    code?: string;
  }
}
```

**HTTP Status Codes:**
- `200` - Success (GET, PUT)
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (auth required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Request/Response Headers

**Standard Headers:**

**Request:**
```
Content-Type: application/json
Accept: application/json
```

**Response:**
```
Content-Type: application/json
```

**Authentication (when required):**
- Session cookie managed by Supabase Auth middleware

---

## Rate Limiting

**Not Currently Implemented**

Recommended for production:
- Public endpoints: 100 requests/minute per IP
- Admin endpoints: 1000 requests/minute per user
- Use Vercel Edge Config or Upstash Rate Limiting

---

## API Client Usage Examples

### JavaScript/TypeScript (Fetch API)

```typescript
// Create order
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customer_phone: '+5491112345678',
    items: [
      { product_id: 'prod_123', quantity: 2, price: 450.00, name: 'Harina de Maíz' }
    ],
    total: 900.00,
    payment_method: 'BANK_TRANSFER'
  })
});

const data = await response.json();

if (data.success) {
  console.log('Order created:', data.order.order_number);
} else {
  console.error('Error:', data.error);
}
```

---

## Testing

**Test Files Location:** `tests/e2e/` (Playwright)

**API Test Coverage:**
- Order creation flow
- Admin authentication
- Database connectivity

**Run Tests:**
```bash
npm run test:e2e          # Run all E2E tests
npm run test:e2e:ui       # Run with Playwright UI
```

---

## References

- Next.js API Routes: [Next.js Docs](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- Supabase Auth: [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- Architecture: [architecture.md](../solutioning/architecture.md)
- Data Models: [data-models.md](./data-models.md)
