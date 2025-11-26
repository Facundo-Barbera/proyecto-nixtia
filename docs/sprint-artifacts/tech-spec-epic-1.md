# Epic Technical Specification: Database Migration (Prisma -> Supabase)

Date: 2025-11-25
Author: Facundo
Epic ID: 1
Status: Draft

---

## Overview

This epic addresses a critical architectural blocker by completely removing Prisma ORM from the codebase and migrating all database operations to use the native Supabase client exclusively. The migration is mandated by ADR-001 (Supabase-Only Data Layer) which identified fundamental conflicts between Prisma and Supabase: Prisma bypasses Row Level Security (RLS) policies, creates schema drift with Supabase-managed schemas, and adds unnecessary ORM overhead. By completing this migration, the application will benefit from native RLS security enforcement (critical for admin authentication), simplified architecture with a single data access tool, and direct access to Supabase real-time capabilities for future features.

This is a **blocking epic** that must be completed before any other feature work can proceed. The current codebase has Prisma installed and configured, but Supabase client already exists at `src/lib/supabase/server.ts` and `src/lib/supabase/client.ts`, making the migration a matter of replacing imports and query syntax rather than creating new infrastructure.

## Objectives and Scope

### In-Scope (MVP)

- **Remove Prisma artifacts**: Delete `src/lib/prisma.ts`, `@prisma/client` and `prisma` from package.json, remove `prisma/` directory
- **Update build pipeline**: Remove `prisma generate &&` from build script
- **Migrate Store Page** (`/store`): Replace Prisma query with Supabase client for product listing
- **Migrate Landing Page** (`/landing`): Replace Prisma query with Supabase client for featured products
- **Migrate Admin Dashboard** (`/admin/dashboard`): Replace Prisma query with Supabase client for orders/transactions
- **Verify Orders API**: Confirm `/api/orders` route uses Supabase (or migrate if using Prisma)
- **Build verification**: Ensure `npm run build`, `npm run lint`, and `npm run dev` all pass without Prisma references
- **Clean state verification**: Grep confirms zero Prisma references in codebase

### Out-of-Scope

- New feature development (deferred to Epic 2+)
- Database schema changes (schema already exists in Supabase)
- RLS policy modifications (policies already configured per Architecture)
- Real-time subscription implementation (post-MVP per ADR-006)
- TypeScript type generation from Supabase (optional enhancement, not required for migration)
- Test suite updates (no existing tests to update)

## System Architecture Alignment

This epic directly implements **ADR-001: Supabase-Only Data Layer** from the Architecture specification:

**Components Affected:**
- `src/lib/prisma.ts` → **DELETE**
- `src/lib/supabase/server.ts` → **USE** (already exists, creates authenticated server-side Supabase client)
- `src/lib/supabase/client.ts` → **USE** (already exists, creates browser-side Supabase client)
- `src/app/store/page.tsx` → **MODIFY** (replace Prisma import with Supabase)
- `src/app/landing/page.tsx` → **MODIFY** (replace Prisma import with Supabase)
- `src/app/admin/dashboard/page.tsx` → **MODIFY** (replace Prisma import with Supabase)
- `src/app/api/orders/route.ts` → **VERIFY/MODIFY** (ensure Supabase usage)

**Architectural Constraints:**
- All database queries MUST use `createClient()` from `@/lib/supabase/server` (server components) or `@/lib/supabase/client` (client components)
- Queries MUST respect RLS policies (automatic with Supabase client)
- Error handling MUST be added for Supabase `{ data, error }` response pattern
- ISR caching (`revalidate`) settings MUST be preserved on affected pages
- Middleware-based auth redirect for admin routes remains unchanged

**Query Pattern Migration:**
```typescript
// FROM (Prisma):
import { prisma } from '@/lib/prisma'
const products = await prisma.product.findMany({ where: { active: true } })

// TO (Supabase):
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()
const { data: products, error } = await supabase.from('products').select('*').eq('is_active', true)
```

## Detailed Design

### Services and Modules

| Module | Responsibility | Current State | Migration Action |
|--------|---------------|---------------|------------------|
| `src/lib/prisma.ts` | Prisma client singleton | EXISTS | **DELETE** |
| `src/lib/supabase/server.ts` | Server-side Supabase client with cookie-based auth | EXISTS | USE (no changes) |
| `src/lib/supabase/client.ts` | Browser-side Supabase client | EXISTS | USE (no changes) |
| `src/app/store/page.tsx` | Product catalog display | Uses Prisma | **MIGRATE** to Supabase |
| `src/app/landing/page.tsx` | Landing page with featured products | Uses Prisma | **MIGRATE** to Supabase |
| `src/app/admin/dashboard/page.tsx` | Admin transaction dashboard | Uses Prisma | **MIGRATE** to Supabase |
| `src/app/api/orders/route.ts` | Order creation API | TBD (verify) | **VERIFY**/Migrate if needed |
| `package.json` | Dependency manifest | Has Prisma deps | **REMOVE** `@prisma/client`, `prisma` |
| `prisma/` directory | Prisma schema and migrations | EXISTS | **DELETE** entire directory |

**Module Ownership:** All modules owned by Dev agent during implementation.

### Data Models and Contracts

The following Supabase tables are accessed by this epic (schema already exists in Supabase PostgreSQL):

**Products Table:**
```sql
products (
  id: UUID PRIMARY KEY,
  name: TEXT NOT NULL,
  description: TEXT,
  price: DECIMAL(10,2) NOT NULL,
  image_url: TEXT,
  is_active: BOOLEAN DEFAULT true,  -- Note: Prisma uses 'active', Supabase uses 'is_active'
  created_at: TIMESTAMPTZ,
  updated_at: TIMESTAMPTZ
)
```

**Orders Table:**
```sql
orders (
  id: UUID PRIMARY KEY,
  order_number: TEXT UNIQUE NOT NULL,
  customer_phone: TEXT NOT NULL,
  total_amount: DECIMAL(10,2) NOT NULL,
  payment_method: payment_method_enum,  -- BANK_TRANSFER | CASH_ON_DELIVERY | CARD_ON_DELIVERY | STRIPE
  payment_status: payment_status_enum,  -- PENDING | CONFIRMED | FAILED
  order_status: order_status_enum,      -- PENDING | CONFIRMED | PREPARING | READY | DELIVERED | CANCELLED
  created_at: TIMESTAMPTZ,
  updated_at: TIMESTAMPTZ
)
```

**Order Items Table:**
```sql
order_items (
  id: UUID PRIMARY KEY,
  order_id: UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id: UUID REFERENCES products(id),
  quantity: INTEGER NOT NULL,
  unit_price: DECIMAL(10,2) NOT NULL,
  subtotal: DECIMAL(10,2) NOT NULL
)
```

**TypeScript Type Mapping:**
```typescript
// Use Supabase-generated types or define manually:
type Product = {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

type Order = {
  id: string
  order_number: string
  customer_phone: string
  total_amount: number
  payment_method: 'BANK_TRANSFER' | 'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY' | 'STRIPE'
  payment_status: 'PENDING' | 'CONFIRMED' | 'FAILED'
  order_status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
  created_at: string
  updated_at: string
}
```

### APIs and Interfaces

**Supabase Query Interfaces (replacing Prisma):**

| Operation | Prisma (OLD) | Supabase (NEW) |
|-----------|--------------|----------------|
| Get active products | `prisma.product.findMany({ where: { active: true } })` | `supabase.from('products').select('*').eq('is_active', true)` |
| Get products with limit | `prisma.product.findMany({ take: 6 })` | `supabase.from('products').select('*').limit(6)` |
| Get orders (admin) | `prisma.order.findMany({ orderBy: { createdAt: 'desc' } })` | `supabase.from('orders').select('*').order('created_at', { ascending: false })` |
| Get orders with items | `prisma.order.findMany({ include: { items: true } })` | `supabase.from('orders').select('*, order_items(*)')` |

**Error Handling Pattern:**
```typescript
const { data, error } = await supabase.from('products').select('*')
if (error) {
  console.error('Supabase query failed:', error.message)
  // Handle gracefully: show error UI or return empty array
  return []
}
return data ?? []
```

**API Route Contract (`/api/orders`):**
- Method: POST
- Input: `{ customer_phone, payment_method, items: [{ product_id, quantity, unit_price }] }`
- Output: `{ id, order_number, ... }` or `{ error: string }`
- Auth: Anonymous (RLS allows inserts)

### Workflows and Sequencing

**Story Execution Order (Dependencies):**

```
Story 1.1: Remove Prisma Dependencies
    │
    ├──→ Story 1.2: Migrate Store Page ──┐
    │                                     │
    ├──→ Story 1.3: Migrate Landing Page ─┼──→ Story 1.5: Verify Orders API
    │                                     │           │
    └──→ Story 1.4: Migrate Admin Dashboard┘          │
                                                      ↓
                                          Story 1.6: Build Verification
```

**Per-Story Workflow:**

1. **Story 1.1** (Blocker removal):
   - Delete `src/lib/prisma.ts`
   - Remove `@prisma/client` and `prisma` from package.json
   - Delete `prisma/` directory
   - Update build script: remove `prisma generate &&`
   - Run `npm install` to update lockfile
   - Expected: TypeScript errors in pages (fixed by 1.2-1.4)

2. **Stories 1.2-1.4** (Parallel-capable after 1.1):
   - Open affected file
   - Replace `import { prisma } from '@/lib/prisma'` with `import { createClient } from '@/lib/supabase/server'`
   - Add `const supabase = await createClient()` before query
   - Convert Prisma query syntax to Supabase
   - Add error handling for `{ data, error }` response
   - Preserve existing UI logic and caching settings

3. **Story 1.5** (Verification):
   - Inspect `/api/orders/route.ts`
   - If Prisma: apply same migration pattern
   - Test checkout flow end-to-end

4. **Story 1.6** (Gate):
   - Run `npm run build` - must pass
   - Run `npm run lint` - must pass
   - Run `npm run dev` - verify all pages work
   - Run `grep -r "prisma" src/` - must return empty

## Non-Functional Requirements

### Performance

**Migration Performance Targets (per PRD NFRs):**

| Metric | Target | Validation Method |
|--------|--------|-------------------|
| Product catalog load | < 2 seconds on mobile 4G | Manual test after migration |
| Product detail load | < 1.5 seconds | Manual test after migration |
| Admin dashboard load | < 2 seconds | Manual test after migration |
| Order creation | < 3 seconds | End-to-end checkout test |

**Expected Performance Impact:**
- **Positive**: Supabase PostgREST queries have lower overhead than Prisma ORM queries
- **Neutral**: Network latency to Supabase unchanged (same backend)
- **Preserved**: ISR caching settings (`revalidate = 300` for store, `revalidate = 60` for admin) remain unchanged

**No Performance Regression Allowed:**
- If any page loads slower after migration, investigate and resolve before Story 1.6 completion
- Supabase queries should use existing indexes: `idx_orders_created_at`, `idx_orders_customer_phone`

### Security

**RLS Enforcement (Critical Security Improvement):**

This migration **improves** security by enabling Row Level Security enforcement:

| Table | RLS Policy | Prisma Behavior | Supabase Behavior |
|-------|-----------|-----------------|-------------------|
| `products` | Public read active only | ❌ Bypassed RLS | ✅ Enforces `is_active = true` |
| `orders` | Admins view all, anon insert | ❌ Bypassed RLS | ✅ Enforces auth check |
| `order_items` | Cascade from orders | ❌ Bypassed RLS | ✅ Enforces auth check |

**Security Requirements:**
- All Supabase queries MUST use `createClient()` (never raw SQL)
- Server components MUST use `@/lib/supabase/server` (cookie-based auth)
- Client components MUST use `@/lib/supabase/client` (browser auth)
- No secrets exposed: Supabase publishable key is public, secret key stays server-side

**Auth Flow Unchanged:**
- Admin login via Supabase Auth (email/password)
- Session stored in HTTP-only cookies via `@supabase/ssr`
- Middleware at `src/middleware.ts` protects `/admin/*` routes

### Reliability/Availability

**Availability Targets:**
- Supabase provides 99.9% uptime SLA (inherited from their infrastructure)
- No changes to availability model from this migration

**Error Handling Requirements:**
- All Supabase queries MUST handle `{ data, error }` response pattern
- Failed queries MUST NOT crash the page - graceful degradation required:
  - Store page: Show "Unable to load products" message
  - Landing page: Hide featured products section or show placeholder
  - Admin dashboard: Show "Unable to load transactions" with retry option

**Rollback Plan:**
- If migration fails catastrophically, revert git commits
- Prisma can be reinstalled via `npm install @prisma/client prisma`
- However, this should not be needed - migration is straightforward

### Observability

**Logging Requirements:**
- Supabase query errors MUST be logged to console with error details
- Log format: `console.error('Supabase query failed:', error.message, { table, operation })`

**Monitoring (Existing):**
- Supabase Dashboard provides query analytics (no code changes needed)
- Network tab in browser DevTools shows PostgREST requests

**No New Observability Requirements:**
- This is a migration epic, not a feature epic
- Existing Supabase dashboard monitoring is sufficient
- Future epics may add structured logging (out of scope for Epic 1)

## Dependencies and Integrations

### Dependencies to REMOVE

| Package | Current Version | Location | Action |
|---------|----------------|----------|--------|
| `@prisma/client` | ^6.19.0 | dependencies | **REMOVE** from package.json |
| `prisma` | ^6.19.0 | dependencies | **REMOVE** from package.json |
| `prisma` config | seed script | package.json `"prisma"` section | **REMOVE** entire section |

### Build Script Modification

```json
// BEFORE:
"build": "prisma generate && next build"

// AFTER:
"build": "next build"
```

### Dependencies to KEEP (Supabase Stack)

| Package | Version | Purpose | Status |
|---------|---------|---------|--------|
| `@supabase/supabase-js` | ^2.84.0 | Supabase JavaScript client | ✅ Already installed |
| `@supabase/ssr` | ^0.7.0 | Server-side rendering support with cookies | ✅ Already installed |
| `supabase` (dev) | ^2.61.2 | CLI for type generation | ✅ Already installed |

### Files/Directories to DELETE

| Path | Description | Action |
|------|-------------|--------|
| `src/lib/prisma.ts` | Prisma client singleton | **DELETE** |
| `prisma/` directory | Schema, migrations, seed | **DELETE** entire directory |
| `prisma/schema.prisma` | Prisma schema file | **DELETE** (part of directory) |
| `prisma/seed.ts` | Seed script | **DELETE** (part of directory) |

### Integration Points (Unchanged)

| Integration | Status | Notes |
|-------------|--------|-------|
| Supabase PostgreSQL | ✅ Active | Database backend - no changes |
| Supabase Auth | ✅ Active | Admin authentication - no changes |
| Supabase RLS | ✅ Active | Will now be enforced (improvement) |
| Stripe | ⏸️ Post-demo | Not affected by this migration |
| Next.js Middleware | ✅ Active | Auth redirect - no changes |

### Post-Migration Verification

After removing Prisma dependencies, verify:
1. `npm install` completes without errors
2. No TypeScript errors referencing `@prisma/client`
3. `node_modules/.prisma/` directory no longer exists
4. `package-lock.json` updated without Prisma entries

## Acceptance Criteria (Authoritative)

The following acceptance criteria are extracted from Epic 1 stories and normalized into atomic, testable statements:

### AC-1: Prisma Removal (Story 1.1)
1. **AC-1.1**: `src/lib/prisma.ts` file is deleted from the codebase
2. **AC-1.2**: `@prisma/client` is removed from package.json dependencies
3. **AC-1.3**: `prisma` is removed from package.json dependencies
4. **AC-1.4**: `prisma/` directory is deleted (including schema.prisma and seed.ts)
5. **AC-1.5**: Build script updated to `"build": "next build"` (no `prisma generate`)
6. **AC-1.6**: `npm install` completes successfully after removal
7. **AC-1.7**: `"prisma"` config section removed from package.json

### AC-2: Store Page Migration (Story 1.2)
1. **AC-2.1**: `src/app/store/page.tsx` imports `createClient` from `@/lib/supabase/server`
2. **AC-2.2**: Store page uses Supabase query: `supabase.from('products').select(...).eq('is_active', true)`
3. **AC-2.3**: Error handling implemented for Supabase `{ data, error }` response
4. **AC-2.4**: Products display correctly when app runs at `/store`
5. **AC-2.5**: Empty state handling preserved from original implementation
6. **AC-2.6**: `revalidate = 300` ISR caching setting preserved

### AC-3: Landing Page Migration (Story 1.3)
1. **AC-3.1**: `src/app/landing/page.tsx` imports `createClient` from `@/lib/supabase/server`
2. **AC-3.2**: Landing page uses Supabase query with `.limit(6)` for featured products
3. **AC-3.3**: Error handling gracefully hides section or shows placeholder on failure
4. **AC-3.4**: FeaturedProducts component receives products array correctly
5. **AC-3.5**: Landing page renders correctly with real product data
6. **AC-3.6**: `dynamic = 'force-static'` setting preserved

### AC-4: Admin Dashboard Migration (Story 1.4)
1. **AC-4.1**: `src/app/admin/dashboard/page.tsx` imports `createClient` from `@/lib/supabase/server`
2. **AC-4.2**: Dashboard uses Supabase query: `supabase.from('orders').select('*').order('created_at', { ascending: false })`
3. **AC-4.3**: Error handling implemented for failed queries
4. **AC-4.4**: TransactionsTable receives data correctly
5. **AC-4.5**: Admin authentication still works (middleware unchanged)
6. **AC-4.6**: `revalidate = 60` ISR caching setting preserved

### AC-5: Orders API Verification (Story 1.5)
1. **AC-5.1**: `/api/orders/route.ts` uses Supabase client (NOT Prisma)
2. **AC-5.2**: Order creation inserts into `orders` table via Supabase
3. **AC-5.3**: Order items insert into `order_items` table via Supabase
4. **AC-5.4**: API returns order with generated ID
5. **AC-5.5**: Checkout flow completes end-to-end (add to cart → checkout → submit → success)
6. **AC-5.6**: Order appears in Supabase database after submission

### AC-6: Build Verification (Story 1.6)
1. **AC-6.1**: `npm run build` completes successfully with no errors
2. **AC-6.2**: `npm run lint` passes (warnings acceptable)
3. **AC-6.3**: `npm run dev` starts without errors
4. **AC-6.4**: Store page loads and displays products
5. **AC-6.5**: Admin login works and dashboard loads transactions
6. **AC-6.6**: `grep -r "prisma" src/` returns no results
7. **AC-6.7**: `grep -r "@prisma" package.json` returns no results

## Traceability Mapping

| AC ID | Spec Section | Component(s)/API(s) | Test Idea |
|-------|--------------|---------------------|-----------|
| AC-1.1 | Services/Modules | `src/lib/prisma.ts` | Verify file does not exist |
| AC-1.2 | Dependencies | `package.json` | Check `@prisma/client` not in deps |
| AC-1.3 | Dependencies | `package.json` | Check `prisma` not in deps |
| AC-1.4 | Dependencies | `prisma/` | Verify directory does not exist |
| AC-1.5 | Dependencies | `package.json` scripts | Check build script value |
| AC-1.6 | Dependencies | `npm` | Run `npm install`, expect success |
| AC-1.7 | Dependencies | `package.json` | Check no `prisma` config section |
| AC-2.1 | Services/Modules | `src/app/store/page.tsx` | Grep for Supabase import |
| AC-2.2 | APIs/Interfaces | `src/app/store/page.tsx` | Grep for Supabase query pattern |
| AC-2.3 | Reliability | `src/app/store/page.tsx` | Check error handling code |
| AC-2.4 | Performance | `/store` route | Manual: load page, see products |
| AC-2.5 | Reliability | `/store` route | Manual: empty DB, see empty state |
| AC-2.6 | Performance | `src/app/store/page.tsx` | Check `revalidate` export |
| AC-3.1 | Services/Modules | `src/app/landing/page.tsx` | Grep for Supabase import |
| AC-3.2 | APIs/Interfaces | `src/app/landing/page.tsx` | Grep for `.limit(6)` |
| AC-3.3 | Reliability | `src/app/landing/page.tsx` | Check error handling code |
| AC-3.4 | APIs/Interfaces | FeaturedProducts component | Check props passed correctly |
| AC-3.5 | Performance | `/landing` route | Manual: load page, see products |
| AC-3.6 | Performance | `src/app/landing/page.tsx` | Check `dynamic` export |
| AC-4.1 | Services/Modules | `src/app/admin/dashboard/page.tsx` | Grep for Supabase import |
| AC-4.2 | APIs/Interfaces | `src/app/admin/dashboard/page.tsx` | Grep for orders query |
| AC-4.3 | Reliability | `src/app/admin/dashboard/page.tsx` | Check error handling code |
| AC-4.4 | APIs/Interfaces | TransactionsTable component | Check props passed correctly |
| AC-4.5 | Security | `/admin/*` routes | Manual: verify auth redirect |
| AC-4.6 | Performance | `src/app/admin/dashboard/page.tsx` | Check `revalidate` export |
| AC-5.1 | Services/Modules | `src/app/api/orders/route.ts` | Grep for Supabase import |
| AC-5.2 | APIs/Interfaces | `src/app/api/orders/route.ts` | Check orders insert |
| AC-5.3 | APIs/Interfaces | `src/app/api/orders/route.ts` | Check order_items insert |
| AC-5.4 | APIs/Interfaces | `/api/orders` POST | Check response includes ID |
| AC-5.5 | Workflows | Full checkout flow | E2E: complete purchase |
| AC-5.6 | Data Models | Supabase orders table | Check DB after order |
| AC-6.1 | Dependencies | Build pipeline | Run `npm run build` |
| AC-6.2 | Dependencies | Lint pipeline | Run `npm run lint` |
| AC-6.3 | Dependencies | Dev server | Run `npm run dev` |
| AC-6.4 | Performance | `/store` | Manual: verify products load |
| AC-6.5 | Security | `/admin/dashboard` | Manual: login + verify data |
| AC-6.6 | Dependencies | `src/` directory | Run grep command |
| AC-6.7 | Dependencies | `package.json` | Run grep command |

## Risks, Assumptions, Open Questions

### Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|------------|--------|------------|
| R1 | **Field name mismatch**: Prisma schema uses `active`, Supabase uses `is_active` | Medium | High | Verify Supabase schema field names before migration; use `.eq('is_active', true)` not `.eq('active', true)` |
| R2 | **RLS policy blocks queries**: Supabase queries fail due to missing RLS permissions | Medium | High | Test each query pattern against Supabase before deploying; verify anon can read products, insert orders |
| R3 | **Missing error handling**: Developer forgets to handle `{ data, error }` pattern | Low | Medium | Code review checklist item; all Supabase queries must check `error` before using `data` |
| R4 | **TypeScript type errors**: Supabase returns different types than Prisma | Low | Low | Use `as` assertions temporarily; optional: generate types with `supabase gen types typescript` |
| R5 | **Build breaks other pages**: Removing Prisma affects files not identified in scope | Low | Medium | Run `grep -r "prisma" src/` before and after to catch all references |

### Assumptions

| ID | Assumption | Validation |
|----|------------|------------|
| A1 | Supabase client files already exist at `src/lib/supabase/server.ts` and `client.ts` | Verify files exist before starting Story 1.1 |
| A2 | Supabase database schema matches Architecture doc (products, orders, order_items tables) | Query Supabase to confirm table structure |
| A3 | RLS policies are already configured correctly in Supabase | Test query as anon user for products; test query as auth user for orders |
| A4 | No other files besides those identified use Prisma | Run `grep -r "prisma" src/` to confirm |
| A5 | ISR caching settings (`revalidate`) work the same with Supabase queries | Manual verification after migration |

### Open Questions

| ID | Question | Owner | Resolution Path |
|----|----------|-------|-----------------|
| Q1 | Does `/api/orders/route.ts` already use Supabase or Prisma? | Dev | Inspect file in Story 1.5; migrate if Prisma |
| Q2 | Are there any server actions using Prisma? | Dev | Run `grep -r "prisma" src/actions/` before migration |
| Q3 | Should we generate TypeScript types from Supabase schema? | Facundo | Decide during Story 1.6; optional enhancement |

## Test Strategy Summary

### Test Levels

| Level | Approach | Coverage |
|-------|----------|----------|
| **Code Review** | Manual inspection of each migrated file | All AC criteria related to code changes |
| **Manual Smoke Test** | Run app locally, verify pages load | AC-2.4, AC-3.5, AC-4.4, AC-6.3, AC-6.4, AC-6.5 |
| **Build Verification** | Run `npm run build` and `npm run lint` | AC-6.1, AC-6.2 |
| **Grep Verification** | Command-line grep for Prisma references | AC-6.6, AC-6.7 |
| **E2E Checkout Test** | Complete purchase flow manually | AC-5.5, AC-5.6 |

### Test Cases by Story

**Story 1.1 (Prisma Removal):**
- [ ] `ls src/lib/prisma.ts` returns "No such file"
- [ ] `grep "@prisma/client" package.json` returns empty
- [ ] `grep '"prisma"' package.json` returns empty (no config section)
- [ ] `ls -d prisma/` returns "No such directory"
- [ ] `npm install` exits with code 0

**Story 1.2 (Store Page):**
- [ ] `grep "createClient" src/app/store/page.tsx` returns match
- [ ] `grep "prisma" src/app/store/page.tsx` returns empty
- [ ] Navigate to `/store` - products display
- [ ] Check Network tab - request goes to Supabase PostgREST

**Story 1.3 (Landing Page):**
- [ ] `grep "createClient" src/app/landing/page.tsx` returns match
- [ ] `grep "limit(6)" src/app/landing/page.tsx` returns match
- [ ] Navigate to `/landing` - featured products display
- [ ] FeaturedProducts component renders correctly

**Story 1.4 (Admin Dashboard):**
- [ ] `grep "createClient" src/app/admin/dashboard/page.tsx` returns match
- [ ] Login as admin at `/admin/login`
- [ ] Dashboard at `/admin/dashboard` shows transactions
- [ ] Unauthenticated access redirects to login

**Story 1.5 (Orders API):**
- [ ] `grep "supabase" src/app/api/orders/route.ts` returns match
- [ ] `grep "prisma" src/app/api/orders/route.ts` returns empty
- [ ] Add product to cart → Checkout → Submit order → Success page shows
- [ ] Check Supabase dashboard - new order appears in `orders` table

**Story 1.6 (Build Verification):**
- [ ] `npm run build` exits with code 0
- [ ] `npm run lint` exits with code 0 (warnings OK)
- [ ] `npm run dev` starts server successfully
- [ ] `grep -r "prisma" src/` returns empty
- [ ] All smoke tests from Stories 1.2-1.5 pass

### Frameworks/Tools

- **Manual Testing**: Browser DevTools, Supabase Dashboard
- **Command-line**: `grep`, `ls`, `npm run` commands
- **No Automated Tests**: This is a migration epic; no new test code required
- **Future**: Playwright E2E tests can be added in Epic 2+ to automate checkout flow verification
