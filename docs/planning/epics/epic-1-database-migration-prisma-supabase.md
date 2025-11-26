# Epic 1: Database Migration (Prisma -> Supabase)

**Goal:** Remove Prisma entirely and migrate all database operations to Supabase client, per Architecture decision.

**User Value:** This epic UNBLOCKS all other work. The app currently uses Prisma which conflicts with Supabase RLS security. After this epic, the app uses Supabase natively with proper security.

**FR Coverage:** Enables ALL FRs (blocking migration)

---

## Story 1.1: Remove Prisma Dependencies and Files

As a **developer**,
I want to **remove all Prisma-related code and dependencies**,
So that **the codebase is clean and ready for Supabase-only data access**.

**Acceptance Criteria:**

**Given** the current codebase with Prisma installed
**When** the developer removes Prisma artifacts
**Then** the following are removed:
- `src/lib/prisma.ts` file deleted
- `@prisma/client` removed from package.json dependencies
- `prisma` removed from package.json dependencies
- `prisma/` directory removed (if exists)
- Build script updated: `"build": "next build"` (remove `prisma generate &&`)

**And** run `npm install` to update lock file
**And** verify no TypeScript errors from missing prisma imports (they will error - that's expected, fixed in next stories)

**Prerequisites:** None (first story)

**Technical Notes:**
- This will BREAK the app temporarily - store page and admin dashboard will have import errors
- That's intentional - Stories 1.2 and 1.3 fix those imports
- Per Architecture doc: `critical-architecture-decision-supabase-only-data-layer.md`

---

## Story 1.2: Migrate Store Page to Supabase

As a **customer**,
I want to **browse products fetched from Supabase**,
So that **I can shop without Prisma dependencies**.

**Acceptance Criteria:**

**Given** the store page at `/store` with broken Prisma import
**When** the developer migrates to Supabase
**Then** `src/app/store/page.tsx` is updated:
- Remove `import { prisma } from '@/lib/prisma'`
- Add `import { createClient } from '@/lib/supabase/server'`
- Replace Prisma query with Supabase:
  ```typescript
  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, description, price, image_url')
    .eq('active', true)
    .order('created_at', { ascending: false })
  ```

**And** handle error case gracefully (show error message if query fails)
**And** keep existing UI and empty state handling unchanged
**And** verify products display correctly when app runs

**Prerequisites:** Story 1.1

**Technical Notes:**
- Supabase client already exists at `src/lib/supabase/server.ts`
- RLS policy must allow anon to read products (verify in Supabase dashboard)
- Keep `revalidate = 300` for ISR caching

---

## Story 1.3: Migrate Landing Page to Supabase

As a **visitor**,
I want to **view the landing page with featured products from Supabase**,
So that **I can see Nixtia's offerings without Prisma dependencies**.

**Acceptance Criteria:**

**Given** the landing page at `/landing` with broken Prisma import
**When** the developer migrates to Supabase
**Then** `src/app/landing/page.tsx` is updated:
- Remove `import { prisma } from '@/lib/prisma'`
- Add `import { createClient } from '@/lib/supabase/server'`
- Replace Prisma query with Supabase:
  ```typescript
  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, description, price, image_url')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(6)
  ```

**And** handle error case gracefully (show placeholder or hide section if query fails)
**And** FeaturedProducts component continues to receive products array
**And** verify landing page renders correctly with real product data

**Prerequisites:** Story 1.1

**Technical Notes:**
- Landing page uses `dynamic = 'force-static'` - verify this still works with Supabase
- Featured products section shows max 6 products
- Keep existing component structure unchanged

---

## Story 1.4: Migrate Admin Dashboard to Supabase

As an **admin**,
I want to **view transactions fetched from Supabase**,
So that **the dashboard works without Prisma**.

**Acceptance Criteria:**

**Given** the admin dashboard at `/admin/dashboard` with broken Prisma import
**When** the developer migrates to Supabase
**Then** `src/app/admin/dashboard/page.tsx` is updated:
- Remove `import { prisma } from '@/lib/prisma'`
- Add `import { createClient } from '@/lib/supabase/server'`
- Replace Prisma query with Supabase:
  ```typescript
  const supabase = await createClient()
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  ```

**And** handle error case gracefully
**And** verify TransactionsTable receives data correctly
**And** verify admin authentication still works (middleware should handle)

**Prerequisites:** Story 1.1

**Technical Notes:**
- RLS policy should restrict orders to authenticated admin users
- Middleware at `src/middleware.ts` handles auth redirect
- Keep `revalidate = 60` for dashboard freshness

---

## Story 1.5: Verify Orders API Route Uses Supabase

As a **customer**,
I want to **place orders that save to Supabase**,
So that **checkout works end-to-end**.

**Acceptance Criteria:**

**Given** the orders API at `/api/orders/route.ts`
**When** the developer verifies Supabase usage
**Then** confirm the route:
- Uses Supabase client (NOT Prisma)
- Creates order record in `orders` table
- Creates order items in `order_items` table
- Returns order with generated ID

**And** if Prisma is used, migrate to Supabase pattern
**And** test checkout flow end-to-end:
  1. Add product to cart
  2. Go to checkout
  3. Enter phone number
  4. Select payment method
  5. Submit order
  6. Verify order appears in database
  7. Verify success page shows order details

**Prerequisites:** Story 1.2, Story 1.3, Story 1.4

**Technical Notes:**
- API route may already use Supabase - verify first before migrating
- Check for any other API routes that might use Prisma

---

## Story 1.6: Build Verification and Clean State

As a **developer**,
I want to **verify the app builds and runs without Prisma**,
So that **the migration is complete and verified**.

**Acceptance Criteria:**

**Given** all Prisma code removed and migrated
**When** running build and verification commands
**Then** all pass:

**And** `npm run build` completes successfully
- No TypeScript errors
- No missing module errors
- Build output generated

**And** `npm run lint` passes (warnings acceptable)

**And** `npm run dev` starts without errors
- Store page loads and shows products
- Admin login works
- Admin dashboard loads and shows transactions
- Checkout flow completes successfully

**And** no references to "prisma" remain in codebase:
- `grep -r "prisma" src/` returns no results
- `grep -r "@prisma" package.json` returns no results

**Prerequisites:** Story 1.5

**Technical Notes:**
- This is the gate for Epic 1 completion
- All subsequent epics depend on this passing
- Document any issues found for immediate fix

---

## Epic 1 Summary

| Story | Title | Dependencies |
|-------|-------|--------------|
| 1.1 | Remove Prisma Dependencies and Files | None |
| 1.2 | Migrate Store Page to Supabase | 1.1 |
| 1.3 | Migrate Landing Page to Supabase | 1.1 |
| 1.4 | Migrate Admin Dashboard to Supabase | 1.1 |
| 1.5 | Verify Orders API Route Uses Supabase | 1.2, 1.3, 1.4 |
| 1.6 | Build Verification and Clean State | 1.5 |

**Output:** Clean codebase using Supabase exclusively, passing build

---
