# Nixtia - System-Level Test Design Strategy

**Date:** 2025-11-18
**Author:** Murat (Master Test Architect)
**Project**: proyecto-nixtia (Nixtia E-commerce Platform)
**Scope:** Complete system-level testability review for Phase 2 (Solutioning)
**Status:** Ready for Implementation

---

## Executive Summary

This test design strategy provides comprehensive coverage for Nixtia's MVP spanning 4 epics and 23 user stories. The strategy prioritizes critical e-commerce flows (checkout, payments), business analytics accuracy, and mobile accessibility.

**Risk Summary:**

- Total risks identified: 18
- High-priority risks (≥6): 8
- Critical categories: Security (SEC), Data Integrity (DATA), Business Impact (BUS)

**Coverage Summary:**

- **P0 (Critical)** scenarios: 28 tests (56 hours)
- **P1 (High)** scenarios: 42 tests (42 hours)
- **P2 (Medium)** scenarios: 38 tests (19 hours)
- **P3 (Low)** scenarios: 15 tests (4 hours)
- **Total test development effort**: 121 hours (~15 days)

**Testing Levels:**

- **E2E Tests**: 18 scenarios (Playwright) - Critical user journeys
- **API/Integration Tests**: 45 scenarios (Vitest) - Backend logic, database
- **Component Tests**: 42 scenarios (React Testing Library + Vitest) - UI components
- **Unit Tests**: 18 scenarios (Vitest) - Utilities, validation, business logic

---

## Risk Assessment

### High-Priority Risks (Score ≥6)

| Risk ID | Category | Description                                                     | Probability | Impact | Score | Mitigation                                                                   | Owner | Timeline |
| ------- | -------- | --------------------------------------------------------------- | ----------- | ------ | ----- | ---------------------------------------------------------------------------- | ----- | -------- |
| R-001   | SEC      | Admin authentication bypass vulnerability                       | 2           | 3      | 6     | Auth middleware E2E tests, session validation, brute force protection tests  | QA    | Sprint 1 |
| R-002   | DATA     | Order total calculation mismatch (cart vs database)             | 3           | 3      | 9     | Integration tests comparing cart sum to order total, decimal precision tests | QA    | Sprint 2 |
| R-003   | BUS      | Guest checkout phone number validation bypass                   | 3           | 3      | 9     | E.164 format validation tests (client & server), SQL injection prevention    | QA    | Sprint 2 |
| R-004   | DATA     | Cart state lost on page refresh (localStorage corruption)       | 2           | 2      | 4     | localStorage persistence tests, error handling for corrupted data            | DEV   | Sprint 2 |
| R-005   | PERF     | Product catalog load time > 2s on mobile 4G (NFR violation)     | 2           | 3      | 6     | Performance benchmark tests, image optimization validation                   | QA    | Sprint 2 |
| R-006   | SEC      | Payment data exposure via API logs or errors                    | 1           | 3      | 3     | Security tests ensuring no card data in logs, Stripe token validation        | QA    | Sprint 2 |
| R-007   | DATA     | Revenue chart displaying incorrect totals (aggregation bug)     | 3           | 3      | 9     | Analytics API integration tests, SUM/GROUP BY query validation               | QA    | Sprint 3 |
| R-008   | BUS      | Multiple order submissions from double-click (duplicate orders) | 2           | 3      | 6     | E2E tests for submit button disable, API idempotency tests                   | QA    | Sprint 2 |

### Medium-Priority Risks (Score 3-5)

| Risk ID | Category | Description                                                      | Probability | Impact | Score | Mitigation                                                  | Owner |
| ------- | -------- | ---------------------------------------------------------------- | ----------- | ------ | ----- | ----------------------------------------------------------- | ----- |
| R-009   | TECH     | Prisma migration failure in production deployment                | 1           | 3      | 3     | Migration rollback tests, schema validation tests           | DEV   |
| R-010   | DATA     | Product image upload fails for large files (>5MB)                | 2           | 2      | 4     | File size validation tests, Supabase Storage error handling | DEV   |
| R-011   | PERF     | Dashboard chart rendering > 500ms (NFR violation)                | 2           | 2      | 4     | Recharts performance tests, data pagination tests           | DEV   |
| R-012   | BUS      | Elder-friendly UX: Touch target < 44px (accessibility failure)   | 1           | 2      | 2     | Automated accessibility tests (Playwright), manual audit    | QA    |
| R-013   | OPS      | Environment variable misconfiguration breaks Supabase connection | 2           | 3      | 6     | Startup validation tests, env var presence checks           | DEV   |
| R-014   | DATA     | Order status update race condition (concurrent admin edits)      | 1           | 2      | 2     | Concurrency tests, optimistic locking tests                 | QA    |

### Low-Priority Risks (Score 1-2)

| Risk ID | Category | Description                                    | Probability | Impact | Score | Action                            |
| ------- | -------- | ---------------------------------------------- | ----------- | ------ | ----- | --------------------------------- |
| R-015   | BUS      | Empty product catalog shows no helpful message | 1           | 1      | 1     | Component test for empty state UI |
| R-016   | OPS      | Build time > 3 minutes delays deployments      | 1           | 1      | 1     | Monitor build metrics             |
| R-017   | PERF     | Landing page Lighthouse score < 85             | 1           | 2      | 2     | Lighthouse CI tests               |
| R-018   | TECH     | TypeScript type errors in production build     | 1           | 2      | 2     | CI type checking                  |

### Risk Category Legend

- **TECH**: Technical/Architecture (flaws, integration, scalability)
- **SEC**: Security (access controls, auth, data exposure)
- **PERF**: Performance (SLA violations, degradation, resource limits)
- **DATA**: Data Integrity (loss, corruption, inconsistency)
- **BUS**: Business Impact (UX harm, logic errors, revenue)
- **OPS**: Operations (deployment, config, monitoring)

---

## Test Coverage Plan by Epic

### Epic 1: Foundation & Infrastructure

**P0 (Critical) - Foundation Tests**

| Story              | Test Level  | Risk Link    | Test Scenarios                                                    | Owner | Notes            |
| ------------------ | ----------- | ------------ | ----------------------------------------------------------------- | ----- | ---------------- |
| 1.1 Project Setup  | Unit        | R-018        | TypeScript compilation, ESLint passes, dev server starts          | DEV   | Smoke tests      |
| 1.2 Database Setup | Integration | R-009, R-013 | Prisma schema validation, database connection, seed data creation | QA    | Env var tests    |
| 1.3 Deployment     | E2E         | R-013, R-016 | Build succeeds, deployment < 3 min, env vars load correctly       | QA    | CI/CD validation |

**Total P0**: 8 tests, 16 hours

### Epic 2: Customer Store Experience (CRITICAL MVP)

**P0 (Critical) - Core Checkout Flow**

| Story                    | Test Level             | Risk Link    | Test Scenarios                                                                | Owner | Notes             |
| ------------------------ | ---------------------- | ------------ | ----------------------------------------------------------------------------- | ----- | ----------------- |
| 2.1 Product Catalog      | E2E, Integration       | R-005, R-015 | Products load < 2s, grid responsive, empty state, image optimization          | QA    | Performance       |
| 2.2 Product Detail       | E2E                    | -            | Product detail loads, quantity selector works, add to cart success toast      | QA    | User journey      |
| 2.3 Cart Widget          | Component, Integration | R-004        | Cart persistence (localStorage), badge count updates, cart state hydration    | DEV   | State management  |
| 2.4 Cart Sheet           | Component              | -            | Quantity adjustments, item removal, subtotal calculation accuracy             | DEV   | UI logic          |
| 2.5 Checkout Phone Input | Component, Integration | R-003        | E.164 validation, country code selector, SQL injection prevention             | QA    | Security critical |
| 2.6 Payment Selector     | Component              | -            | All payment methods selectable, instructions display correctly                | DEV   | UI coverage       |
| 2.7 Order Review         | E2E, Integration       | R-002, R-008 | Total calculation accuracy, double-submit prevention, terms checkbox required | QA    | Critical path     |
| 2.8 Order Confirmation   | E2E, Integration       | R-002        | Order number generated (NX-format), payment instructions correct, cart clears | QA    | End-to-end        |
| 2.9 Navigation Header    | Component              | -            | Cart widget visibility, responsive menu, sticky header                        | DEV   | UI behavior       |

**Total P0**: 18 tests, 36 hours

**P1 (High) - Secondary Flows**

| Story   | Test Level      | Test Scenarios                                                                | Owner | Notes            |
| ------- | --------------- | ----------------------------------------------------------------------------- | ----- | ---------------- |
| 2.1-2.9 | API Integration | Product API (CRUD), Order API (create, retrieve), payment method persistence  | QA    | Backend coverage |
| 2.1-2.9 | Component       | ProductCard interactions, PhoneInput edge cases, PaymentMethodSelector states | DEV   | Component states |

**Total P1**: 12 tests, 12 hours

### Epic 3: Admin Business Intelligence

**P0 (Critical) - Security & Analytics Accuracy**

| Story                  | Test Level             | Risk Link    | Test Scenarios                                                           | Owner | Notes             |
| ---------------------- | ---------------------- | ------------ | ------------------------------------------------------------------------ | ----- | ----------------- |
| 3.1 Admin Auth         | E2E, Integration       | R-001        | Login success/failure, session persistence, password requirements        | QA    | Security critical |
| 3.2 Protected Routes   | E2E, Integration       | R-001        | Unauthenticated redirect, session timeout (30min), logout clears session | QA    | Auth middleware   |
| 3.3 Admin Layout       | Component              | -            | Sidebar navigation, mobile bottom nav, logout functionality              | DEV   | UI layout         |
| 3.4 Revenue Chart      | Integration, Component | R-007, R-011 | SUM aggregation accuracy, date range filters, rendering < 500ms          | QA    | Data accuracy     |
| 3.5 Transactions Table | Integration            | R-007        | Transaction list accuracy, pagination, sorting by date                   | QA    | Data display      |
| 3.6 Payment Breakdown  | Integration            | R-007        | Payment method counts, percentage calculations, chart rendering          | QA    | Analytics         |

**Total P0**: 14 tests, 28 hours

**P1 (High) - Dashboard Edge Cases**

| Story   | Test Level | Test Scenarios                                                     | Owner | Notes          |
| ------- | ---------- | ------------------------------------------------------------------ | ----- | -------------- |
| 3.4-3.6 | Component  | Empty state charts, date range edge cases, chart responsiveness    | DEV   | UI robustness  |
| 3.4-3.6 | API        | Analytics API error handling, invalid date ranges, large data sets | QA    | API validation |

**Total P1**: 10 tests, 10 hours

### Epic 4: Product Management & Landing Page

**P1 (High) - Product CRUD Operations**

| Story              | Test Level             | Risk Link | Test Scenarios                                                      | Owner | Notes          |
| ------------------ | ---------------------- | --------- | ------------------------------------------------------------------- | ----- | -------------- |
| 4.1 Product List   | Component, Integration | -         | Product list loads, filter by active/inactive, empty state          | DEV   | Admin UI       |
| 4.2 Add Product    | E2E, Integration       | R-010     | Form validation, image upload (< 5MB), Prisma create mutation       | QA    | CRUD operation |
| 4.3 Edit Product   | E2E, Integration       | R-010     | Pre-populated form, image replacement, Prisma update mutation       | QA    | CRUD operation |
| 4.4 Delete Product | E2E, Integration       | -         | Confirmation modal, soft delete (is_active=false), cascade handling | QA    | CRUD operation |
| 4.5 Landing Page   | E2E                    | R-017     | SSG rendering, Lighthouse score > 85, SEO meta tags present         | QA    | Performance    |

**Total P1**: 12 tests, 12 hours

**P2 (Medium) - Secondary Product Features**

| Story   | Test Level | Test Scenarios                                               | Owner | Notes                   |
| ------- | ---------- | ------------------------------------------------------------ | ----- | ----------------------- |
| 4.2-4.4 | Component  | ProductForm validation states, image preview, error messages | DEV   | Form UX                 |
| 4.5     | Component  | Hero section, product showcase, CTA button                   | DEV   | Landing page components |

**Total P2**: 8 tests, 4 hours

---

## Test Coverage Plan by Priority

### P0 (Critical) - Run on Every Commit (CI Pipeline)

**Criteria**: Blocks core journey + High risk (≥6) + No workaround

**Epic 1 - Foundation:**

1. TypeScript compilation succeeds
2. ESLint passes with no errors
3. Development server starts without errors
4. Prisma schema validates and migrates
5. Database connection succeeds
6. Seed data populates correctly
7. Vercel build succeeds in < 3 minutes
8. Environment variables load in deployed app

**Epic 2 - Customer Checkout (E2E Critical Path):** 9. E2E: Browse products → Product detail → Add to cart → Checkout → Payment selection → Submit order → Order confirmation 10. Integration: Cart total calculation matches order total (Decimal precision) 11. Integration: Phone number E.164 validation (client & server) 12. Integration: SQL injection prevention in checkout form 13. E2E: Double-submit prevention (button disable + API idempotency) 14. Performance: Product catalog loads < 2s on 4G throttled connection 15. Component: Cart persists to localStorage and rehydrates correctly 16. Integration: Order number generated in NX-YYYY-NNNNNN format 17. Integration: Cart clears after successful order 18. Component: Empty product catalog shows helpful message

**Epic 3 - Admin Security & Analytics:** 19. E2E: Admin login success with valid credentials 20. E2E: Admin login failure with invalid credentials 21. E2E: Unauthenticated user redirected to /admin/login 22. Integration: Session timeout after 30 minutes inactivity 23. Integration: Revenue chart SUM aggregation matches database 24. Integration: Payment breakdown percentages sum to 100% 25. Integration: Transaction table shows correct order totals

**Epic 4 - Product Management:** 26. Integration: Product creation via Prisma succeeds 27. Integration: Image upload < 5MB succeeds 28. Integration: Image upload > 5MB rejected with error

**Total P0**: 28 tests, ~56 hours development
**Execution Time**: < 10 minutes (parallel execution)

### P1 (High) - Run on Pull Request to Main

**Criteria**: Important features + Medium risk (3-5) + Common workflows

**API Integration Tests:**

- GET /api/products - List products with filters
- GET /api/products/[id] - Get product by ID
- POST /api/products - Create product (admin auth required)
- PATCH /api/products/[id] - Update product (admin auth required)
- DELETE /api/products/[id] - Delete product (admin auth required)
- POST /api/orders - Create order with order items
- GET /api/orders - List orders (admin auth required)
- GET /api/analytics/revenue - Revenue aggregation with date filters
- GET /api/analytics/payments - Payment method breakdown
- POST /api/auth/login - Admin login
- POST /api/auth/logout - Admin logout

**Component Tests:**

- ProductCard: Add to cart interaction, price formatting, image fallback
- CartWidget: Badge count display, click opens cart sheet
- PhoneInput: Country code selector, format validation, accessibility
- PaymentMethodSelector: Radio selection, payment instructions display
- RevenueChart: Data rendering, date range filter, empty state
- TransactionsTable: Pagination, sorting, data formatting
- PaymentBreakdown: Pie chart rendering, percentage labels
- ProductForm: Validation messages, image preview, submit button states

**E2E Scenarios:**

- Admin: Login → Dashboard → View revenue chart → Logout
- Admin: Login → Products → Add new product with image → Success
- Admin: Login → Products → Edit product → Update price → Success
- Admin: Login → Products → Delete product → Confirmation → Success
- Customer: Visit landing page → Click CTA → Redirected to store

**Total P1**: 42 tests, ~42 hours development
**Execution Time**: < 30 minutes

### P2 (Medium) - Run Nightly/Weekly

**Criteria**: Secondary features + Low risk (1-2) + Edge cases

**Unit Tests (Utilities & Helpers):**

- `src/lib/utils.ts`: cn() utility function, formatCurrency(), formatPhone()
- `src/lib/validations/*.ts`: Zod schema validation (all edge cases)
- `src/hooks/useCart.ts`: Cart state management logic (add, remove, update quantity, clear)
- `src/hooks/useLocalStorage.ts`: Storage operations, error handling

**Component Edge Cases:**

- ProductCard: Out of stock badge, long product names (truncation)
- CartWidget: Large cart counts (99+), empty cart state
- Cart Sheet: Quantity limits (min 1, max 99), remove last item
- PhoneInput: Invalid formats, special characters, paste handling
- RevenueChart: No data state, single data point, large date ranges
- TransactionsTable: Empty table, single row, 1000+ rows (pagination)

**API Edge Cases:**

- Product API: Invalid UUID, non-existent product, duplicate name
- Order API: Empty cart, invalid phone format, negative quantities
- Analytics API: Future date range, invalid date format, zero orders

**Performance Tests:**

- Dashboard chart rendering with 1000 orders
- Product catalog with 500 products
- Transaction table with 10,000 orders (pagination)

**Accessibility Tests (Automated):**

- WCAG AA compliance for all pages (Playwright accessibility scan)
- Keyboard navigation for product catalog and checkout
- Screen reader compatibility (aria-labels, landmarks)

**Total P2**: 38 tests, ~19 hours development
**Execution Time**: < 60 minutes

### P3 (Low) - Run On-Demand (Manual or Scheduled)

**Criteria**: Nice-to-have + Exploratory + Performance Benchmarks

**Exploratory Tests:**

- Mobile device testing (iOS Safari, Chrome Android)
- Slow network simulation (2G, offline)
- Browser compatibility (Edge, Firefox, Safari desktop)

**Performance Benchmarks:**

- Lighthouse CI for all pages (target: > 85 score)
- Core Web Vitals monitoring (LCP, FID, CLS)
- API response time percentiles (p50, p95, p99)

**Security Penetration Tests:**

- OWASP Top 10 vulnerability scan (manual)
- SQL injection attempts on all forms
- XSS attempts in product descriptions
- CSRF token validation
- Session hijacking attempts

**Total P3**: 15 tests, ~4 hours development
**Execution Time**: Variable (manual testing)

---

## Testing Framework & Tooling

### Frontend Testing Stack

**E2E Tests: Playwright**

```typescript
// tests/e2e/customer-checkout.spec.ts
import { test, expect } from '@playwright/test'

test('Complete checkout flow', async ({ page }) => {
  // Navigate to store
  await page.goto('/store')

  // Select product
  await page.click('[data-testid="product-card"]:first-child')

  // Add to cart
  await page.fill('[data-testid="quantity-input"]', '2')
  await page.click('[data-testid="add-to-cart-btn"]')

  // Verify cart badge updates
  await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('2')

  // Proceed to checkout
  await page.click('[data-testid="cart-widget"]')
  await page.click('[data-testid="checkout-btn"]')

  // Fill checkout form
  await page.fill('[data-testid="phone-input"]', '+525512345678')
  await page.click('[data-testid="payment-bank-transfer"]')
  await page.check('[data-testid="terms-checkbox"]')

  // Submit order
  await page.click('[data-testid="submit-order-btn"]')

  // Verify success
  await expect(page).toHaveURL(/\/checkout\/success/)
  await expect(page.locator('[data-testid="order-number"]')).toContainText('NX-2025-')
})
```

**Component Tests: React Testing Library + Vitest**

```typescript
// src/components/store/__tests__/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '../ProductCard'
import { describe, it, expect, vi } from 'vitest'

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 10.50,
    image_url: '/test.jpg',
  }

  it('renders product name and price', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$10.50 MXN')).toBeInTheDocument()
  })

  it('calls onAddToCart when button clicked', () => {
    const onAddToCart = vi.fn()
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct)
  })
})
```

**Unit Tests: Vitest**

```typescript
// src/lib/validations/__tests__/order.test.ts
import { describe, it, expect } from 'vitest'
import { CreateOrderSchema } from '../order'

describe('CreateOrderSchema', () => {
  it('validates correct E.164 phone number', () => {
    const data = {
      customerPhone: '+525512345678',
      paymentMethod: 'BANK_TRANSFER',
      items: [{ product_id: 'uuid', quantity: 1, unit_price: 10 }],
    }
    const result = CreateOrderSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('rejects invalid phone format', () => {
    const data = {
      customerPhone: '5512345678', // Missing +52 prefix
      paymentMethod: 'BANK_TRANSFER',
      items: [{ product_id: 'uuid', quantity: 1, unit_price: 10 }],
    }
    const result = CreateOrderSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})
```

### Backend Testing Stack

**API Integration Tests: Vitest + Supertest-like approach**

```typescript
// tests/integration/api/orders.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('POST /api/orders', () => {
  beforeAll(async () => {
    // Setup test database
    await prisma.product.create({ data: { name: 'Test', price: 10, is_active: true } })
  })

  afterAll(async () => {
    // Cleanup
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
  })

  it('creates order with valid data', async () => {
    const product = await prisma.product.findFirst()

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerPhone: '+525512345678',
        paymentMethod: 'BANK_TRANSFER',
        items: [{ product_id: product.id, quantity: 2, unit_price: 10 }],
      }),
    })

    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.order_number).toMatch(/^NX-\d{4}-\d{6}$/)
    expect(data.total_amount).toBe('20.00')
  })
})
```

### Test Data Management

**Factory Pattern: faker + Prisma**

```typescript
// tests/factories/product.factory.ts
import { faker } from '@faker-js/faker'
import { prisma } from '@/lib/prisma'

export async function createProduct(overrides = {}) {
  return prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
      image_url: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
      is_active: true,
      ...overrides,
    },
  })
}

export async function createOrder(overrides = {}) {
  const product = await createProduct()
  return prisma.order.create({
    data: {
      order_number: `NX-2025-${faker.number.int({ min: 100000, max: 999999 })}`,
      customer_phone: `+52${faker.number.int({ min: 1000000000, max: 9999999999 })}`,
      total_amount: 20.0,
      payment_method: 'BANK_TRANSFER',
      order_items: {
        create: {
          product_id: product.id,
          quantity: 2,
          unit_price: product.price,
          subtotal: product.price * 2,
        },
      },
      ...overrides,
    },
    include: { order_items: true },
  })
}
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  unit-component:
    name: Unit & Component Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx prisma generate
      - run: npm run test # Vitest unit + component tests
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3

  integration:
    name: Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx prisma migrate deploy
      - run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

  e2e:
    name: E2E Tests (Playwright)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: npm run lighthouse:ci
```

### Test Execution Matrix

| Trigger                  | P0 (Critical) | P1 (High)   | P2 (Medium) | P3 (Low)    | Total Time |
| ------------------------ | ------------- | ----------- | ----------- | ----------- | ---------- |
| **On Commit (Push)**     | ✅ 28 tests   | ❌          | ❌          | ❌          | ~10 min    |
| **Pull Request**         | ✅ 28 tests   | ✅ 42 tests | ❌          | ❌          | ~30 min    |
| **Nightly (Scheduled)**  | ✅ 28 tests   | ✅ 42 tests | ✅ 38 tests | ❌          | ~60 min    |
| **Pre-Release (Manual)** | ✅ 28 tests   | ✅ 42 tests | ✅ 38 tests | ✅ 15 tests | ~90 min    |

---

## Quality Gates

### Pre-Merge Quality Gate (Pull Request)

**Automated Checks (CI Must Pass):**

- [ ] All P0 tests pass (28/28)
- [ ] All P1 tests pass (42/42)
- [ ] TypeScript compilation succeeds
- [ ] ESLint passes with no errors
- [ ] Prettier formatting check passes
- [ ] Code coverage ≥ 70% (statements)
- [ ] No high-severity security vulnerabilities (npm audit)

**Manual Checks (Required for Merge):**

- [ ] Code review approved by 1+ team member
- [ ] No unresolved comments on PR
- [ ] Branch up-to-date with main

### Pre-Release Quality Gate (Production Deployment)

**Functional Testing:**

- [ ] All P0 tests pass (28/28)
- [ ] All P1 tests pass (42/42)
- [ ] All P2 tests pass (38/38)
- [ ] All high-risk mitigations complete (R-001 to R-008)
- [ ] Smoke tests pass on staging environment

**Security Testing:**

- [ ] All SEC category risks mitigated (R-001, R-006)
- [ ] No critical/high vulnerabilities in npm audit
- [ ] Supabase Row-Level Security policies verified
- [ ] Admin authentication tested manually

**Performance Testing:**

- [ ] Product catalog loads < 2s on 4G throttled connection
- [ ] Dashboard chart renders < 500ms
- [ ] Lighthouse score ≥ 85 for all pages
- [ ] Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)

**Data Integrity:**

- [ ] Order total calculation verified (cart vs database)
- [ ] Revenue analytics accuracy verified with known data
- [ ] Database migrations applied successfully
- [ ] Seed data populates correctly

**Accessibility:**

- [ ] WCAG AA compliance verified via automated scan
- [ ] Touch targets ≥ 44px verified for checkout flow
- [ ] Keyboard navigation tested for critical paths

### Coverage Targets

| Category                       | Target | Measurement                               |
| ------------------------------ | ------ | ----------------------------------------- |
| **Critical Paths (P0)**        | 100%   | E2E tests covering full user journeys     |
| **Security Scenarios (SEC)**   | 100%   | All SEC risks have corresponding tests    |
| **Business Logic**             | ≥ 70%  | Unit + integration tests for calculations |
| **Code Coverage (Statements)** | ≥ 70%  | Vitest coverage report                    |
| **Code Coverage (Branches)**   | ≥ 60%  | Vitest coverage report                    |
| **E2E Critical Flows**         | 100%   | Checkout, admin login, product CRUD       |

---

## High-Risk Mitigation Plans

### R-002: Order Total Calculation Mismatch (Score: 9)

**Risk Description:** Cart total calculated client-side may not match order total calculated server-side due to floating-point arithmetic, currency rounding differences, or race conditions.

**Impact:** Customer sees one price in cart but is charged a different amount. Severe trust issue, potential legal compliance problem.

**Mitigation Strategy:**

1. **Use Decimal Type:** All monetary calculations use Prisma Decimal type (database) and decimal.js library (client-side)
2. **Server-Side Validation:** API endpoint recalculates total from order items, rejects if mismatch with submitted total
3. **Integration Tests:** Test suite includes scenarios with:
   - Multiple items with decimal prices ($10.99, $5.50, $12.33)
   - Quantity multipliers (2x $10.99 = $21.98)
   - Large orders (100 items)
4. **Unit Tests:** Test currency formatting, rounding rules, arithmetic operations

**Owner:** QA Lead (Murat)
**Timeline:** Sprint 2 (before checkout implementation)
**Status:** Planned

**Verification:**

- [ ] Integration test: `calculateOrderTotal.test.ts` passes
- [ ] API test: `POST /api/orders` rejects mismatched totals (400 error)
- [ ] E2E test: Complete checkout with 3 items, verify DB matches displayed total

---

### R-003: Phone Number Validation Bypass (Score: 9)

**Risk Description:** Guest checkout relies solely on phone number for customer identity. Inadequate validation could allow SQL injection, XSS, or invalid formats causing order processing failures.

**Impact:** Data breach (SQL injection), order data corruption, inability to contact customer.

**Mitigation Strategy:**

1. **Client-Side Validation:** react-phone-number-input with strict E.164 format
2. **Server-Side Validation:** Zod schema with regex `/^\+[1-9]\d{1,14}$/` enforced on API
3. **Prisma Parameterization:** Prevents SQL injection (ORM handles escaping)
4. **Sanitization Tests:** Injection attempts logged and blocked
5. **Format Tests:** Test cases for:
   - Valid: `+525512345678`
   - Invalid: `5512345678` (missing +), `+1-234-567-8900` (dashes), `<script>` (XSS)

**Owner:** QA Lead (Murat)
**Timeline:** Sprint 2 (before checkout implementation)
**Status:** Planned

**Verification:**

- [ ] Component test: PhoneInput rejects invalid formats
- [ ] API test: `POST /api/orders` returns 400 for invalid phone
- [ ] Security test: SQL injection attempt logged and rejected
- [ ] E2E test: Cannot submit checkout with invalid phone number

---

### R-007: Revenue Chart Incorrect Totals (Score: 9)

**Risk Description:** Analytics aggregation query (SUM, GROUP BY) has bug causing incorrect revenue totals displayed to business owner. Owner makes bad business decisions based on wrong data.

**Impact:** Business harm (incorrect pricing, inventory decisions), loss of trust in system.

**Mitigation Strategy:**

1. **Integration Tests:** Create known orders, query analytics API, assert exact totals
2. **Test Scenarios:**
   - Single order: $50.00
   - Multiple orders same day: $50 + $30 + $20 = $100.00
   - Date range filter: Last 7 days vs last 30 days
   - Payment method split: Bank $60, Cash $40
3. **SQL Query Validation:** Manual review of Prisma query by senior engineer
4. **Decimal Precision:** Ensure SUM uses Decimal type, not float

**Owner:** QA Lead (Murat) + Winston (Architect)
**Timeline:** Sprint 3 (before admin dashboard implementation)
**Status:** Planned

**Verification:**

- [ ] Integration test: `GET /api/analytics/revenue` matches manual SUM
- [ ] Integration test: Date range filters return correct subset
- [ ] Manual QA: Create 10 test orders, verify dashboard chart matches

---

### R-001: Admin Authentication Bypass (Score: 6)

**Risk Description:** Admin authentication middleware has vulnerability allowing unauthenticated access to protected routes (/admin/dashboard, /admin/products).

**Impact:** Security breach, unauthorized access to customer data (phone numbers, order history).

**Mitigation Strategy:**

1. **Middleware Tests:** E2E tests verify redirect to /admin/login for unauthenticated requests
2. **Session Validation:** Integration tests for session token validation, expiry, logout
3. **Protected Route Coverage:** Test ALL /admin/\* routes for auth requirement
4. **Brute Force Protection:** Rate limiting on login endpoint (Supabase built-in)

**Owner:** QA Lead (Murat)
**Timeline:** Sprint 1 (before admin features)
**Status:** Planned

**Verification:**

- [ ] E2E test: Access /admin/dashboard without login → redirects to /admin/login
- [ ] E2E test: Login with valid credentials → dashboard loads
- [ ] E2E test: Session expires after 30 min → redirect to login
- [ ] Integration test: Invalid session token → 401 Unauthorized

---

## Resource Requirements

### Test Development Effort

| Priority  | Count   | Hours/Test | Total Hours | Notes                              |
| --------- | ------- | ---------- | ----------- | ---------------------------------- |
| P0        | 28      | 2.0        | 56          | Complex E2E, security, integration |
| P1        | 42      | 1.0        | 42          | API tests, component tests         |
| P2        | 38      | 0.5        | 19          | Edge cases, unit tests             |
| P3        | 15      | 0.25       | 4           | Exploratory, manual                |
| **Total** | **123** | **-**      | **121**     | **~15 days**                       |

**Assumptions:**

- 1 QA Engineer (Murat or equivalent)
- Developers write unit/component tests for their stories (included in story points)
- QA focuses on P0/P1 E2E and integration tests

### Test Execution Time (CI Pipeline)

| Suite             | Tests   | Parallel Execution   | Total Time  |
| ----------------- | ------- | -------------------- | ----------- |
| Unit Tests        | 18      | Yes (8 workers)      | ~2 min      |
| Component Tests   | 42      | Yes (8 workers)      | ~3 min      |
| Integration Tests | 45      | Sequential (DB)      | ~12 min     |
| E2E Tests         | 18      | Parallel (4 workers) | ~8 min      |
| **Full Suite**    | **123** | **Mixed**            | **~25 min** |

**Optimization Strategies:**

- Playwright sharding (4 shards for E2E)
- Database per integration test worker (parallel execution)
- In-memory SQLite for fast unit/component tests
- Reuse test data factories across tests

### Infrastructure Requirements

**CI/CD:**

- GitHub Actions minutes: ~500 min/month (free tier: 2000 min/month)
- PostgreSQL test database (Docker container in CI)
- Playwright browsers (Chromium, Firefox, WebKit)

**Staging Environment:**

- Vercel preview deployment (free tier sufficient)
- Supabase staging project (free tier)
- Test Stripe account (free)

**Tools & Licenses:**

- Vitest: Free (MIT license)
- Playwright: Free (Apache 2.0)
- React Testing Library: Free (MIT)
- Codecov: Free for public repos (optional)

---

## Assumptions and Dependencies

### Assumptions

1. **Test Data Isolation:** Each test creates and cleans up its own data (no shared state)
2. **CI Environment:** GitHub Actions with Ubuntu runners (free tier sufficient)
3. **Manual Testing:** Exploratory P3 tests performed by developer before release
4. **Code Review:** Developers write tests for their stories (part of DoD)
5. **Database Migrations:** Migrations tested in CI before production deployment

### Dependencies

1. **Prisma Migration Files:** Required before integration tests can run
2. **Supabase Test Project:** Staging Supabase instance for E2E tests
3. **Environment Variables:** All secrets configured in GitHub Actions
4. **Playwright Browsers:** Installed in CI (added to workflow)
5. **Test Factories:** Created during Epic 1 implementation

### Risks to Test Plan

**Risk:** Test development takes longer than estimated (121 hours)

- **Impact:** Delays sprint delivery, incomplete test coverage
- **Contingency:** Prioritize P0 tests first, defer P2/P3 to later sprints

**Risk:** Flaky E2E tests due to timing issues

- **Impact:** False negatives in CI, reduced confidence in tests
- **Contingency:** Use Playwright auto-wait, explicit waits, retry logic

**Risk:** Test database performance degrades with large data sets

- **Impact:** Slow integration tests (> 12 min)
- **Contingency:** Optimize queries, use database snapshots, parallel test DBs

---

## Approval

**Test Design Strategy Approved By:**

- [ ] Product Manager (John): ****\_\_**** Date: ****\_\_****
- [ ] Tech Lead (Winston): ****\_\_**** Date: ****\_\_****
- [ ] QA Lead (Murat): ****\_\_**** Date: ****\_\_****
- [ ] Scrum Master (Bob): ****\_\_**** Date: ****\_\_****

**Comments:**

---

## Related Documents

- **Architecture:** [architecture.md](./architecture.md)
- **PRD:** [PRD Index](../planning/PRD/index.md)
- **Epic Breakdown:** [Epic Breakdown Technical](./epic-breakdown-technical.md)
- **UX Design:** [UX Design Specification](../planning/ux-design-specification/index.md)
- **Implementation Readiness:** [Implementation Readiness Report](./implementation-readiness-report.md) _(next deliverable)_

---

**Document Metadata:**

- Generated by: BMM Test Architect Agent (Murat)
- Workflow: `.bmad/bmm/workflows/testarch/test-design`
- Date: 2025-11-18
- For: Facundo
- Project: proyecto-nixtia
- Phase: Solutioning (Phase 2)
- Status: **Implementation-Ready**
