# proyecto-nixtia - Epic Breakdown

**Author:** Facundo
**Date:** 2025-11-25
**Project Level:** Method Track
**Target Scale:** MVP Demo (2-3 day delivery target)

---

## Overview

This document provides the complete epic and story breakdown for Nixtia, decomposing the requirements from the [PRD](./planning/PRD/index.md) into implementable stories.

**Living Document Notice:** This is the initial version incorporating full context from PRD, UX Design, and Architecture documents.

<!-- epics_summary will be populated in Step 2 -->

---

## Functional Requirements Inventory

### User Account & Access
| FR | Description | Scope |
|----|-------------|-------|
| FR1 | Customers can browse product catalog without creating an account | MVP |
| FR2 | Customers can add products to cart as guest users | MVP |
| FR3 | Customers can complete checkout by providing only phone number | MVP |
| FR4 | Customers can view order confirmation immediately after purchase | MVP |
| FR5 | System stores order reference for future phone-based lookup | Post-MVP |
| FR6 | Business owner can create admin account with email and password | MVP |
| FR7 | Business owner can log in securely with email/password authentication | MVP |
| FR8 | Business owner can access password reset via email | Post-Demo |
| FR9 | Admin sessions persist across browser sessions (remember me) | MVP |
| FR10 | Admin can log out and clear session data | MVP |

### Product Catalog Management
| FR | Description | Scope |
|----|-------------|-------|
| FR11 | Customers can view all available products in grid layout | MVP |
| FR12 | Customers can see product image, name, price, and description preview | MVP |
| FR13 | Customers can click product to view detailed information page | MVP |
| FR14 | Customers can see product availability status | MVP |
| FR15 | Product images load efficiently with progressive enhancement | MVP |
| FR16 | Admin can add new products with image, name, description, price | Post-Demo |
| FR17 | Admin can edit existing product information | Post-Demo |
| FR18 | Admin can delete products with confirmation | Post-Demo |
| FR19 | Admin can toggle product active/inactive status | Post-Demo |
| FR20 | Admin can upload and manage product images | Post-Demo |

### Shopping Cart & Checkout
| FR | Description | Scope |
|----|-------------|-------|
| FR21 | Customers can add products to cart from catalog or detail pages | MVP |
| FR22 | Customers can adjust product quantities in cart | MVP |
| FR23 | Customers can remove products from cart | MVP |
| FR24 | Customers can see real-time cart total and item count | MVP |
| FR25 | Cart persists during browsing session | MVP |
| FR26 | Cart displays clear pricing breakdown (subtotal, taxes if applicable) | MVP |
| FR27 | Customers can proceed to checkout from cart | MVP |
| FR28 | Customers can enter phone number with country code selection | MVP |
| FR29 | Customers can select payment method (bank transfer, cash/card on delivery, Stripe) | MVP |
| FR30 | System displays payment instructions based on selected method | MVP |
| FR31 | Customers can review order summary before confirming | MVP |
| FR32 | Customers receive order confirmation with reference number | MVP |
| FR33 | System validates phone number format | MVP |
| FR34 | System prevents duplicate order submission | MVP |

### Payment Processing
| FR | Description | Scope |
|----|-------------|-------|
| FR35 | Customers can choose bank transfer and view account details | MVP |
| FR36 | Customers can choose cash/card on delivery option | MVP |
| FR37 | Customers can choose Stripe card payment (post-demo: live processing) | MVP (UI) |
| FR38 | System displays clear instructions for each payment method | MVP |
| FR39 | System records payment method selection with order | MVP |
| FR40 | System creates order record with customer details, items, total, payment method | MVP |
| FR41 | System generates unique order reference number | MVP |
| FR42 | System stores order timestamp and status | MVP |
| FR43 | Admin can view all orders in chronological list (post-demo: filtering) | MVP (basic) |

### Business Analytics & Dashboard
| FR | Description | Scope |
|----|-------------|-------|
| FR44 | Admin can view revenue chart showing trends over time | MVP |
| FR45 | Admin can filter revenue by date range (daily, weekly, monthly) | MVP |
| FR46 | Admin can see total revenue for selected period | MVP |
| FR47 | Revenue chart displays visual trend line or bars | MVP |
| FR48 | Admin can view table of recent transactions | MVP |
| FR49 | Transaction table shows date, customer phone, order total, payment method | MVP |
| FR50 | Admin can sort transactions by date or amount | Post-Demo |
| FR51 | Admin can search transactions by customer phone | Post-Demo |
| FR52 | Admin can view payment method breakdown (chart visualization) | MVP |
| FR53 | Payment breakdown shows percentage and count for each method | MVP |
| FR54 | Admin can compare payment methods across date ranges | Post-Demo |

### Landing Page (Optional MVP)
| FR | Description | Scope |
|----|-------------|-------|
| FR55 | Visitors can view hero section with Nixtia value proposition | MVP (if time) |
| FR56 | Visitors can read educational content about nixtamalized corn | MVP (if time) |
| FR57 | Visitors can see product showcase with sample items | MVP (if time) |
| FR58 | Visitors can access social media links | MVP (if time) |
| FR59 | Visitors can navigate to virtual store via clear CTA | MVP (if time) |

**MVP Summary:** 44 FRs required for MVP | **Post-Demo:** 11 FRs deferred

---

## FR Coverage Map

<!-- fr_coverage_map will be populated in Step 2 -->

---

## Epic 0: Codebase Audit & Development Readiness

**Goal:** Establish a clean, understood, buildable codebase so the dev agent can work confidently without building on broken foundations or duplicating existing work.

**User Value:** This epic enables all subsequent development by eliminating technical debt, documenting reality, and ensuring the dev agent has accurate context.

**FR Coverage:** Preparatory epic - enables delivery of all MVP FRs

---

### Story 0.1: Codebase Health Check & Feature Audit

As a **developer**,
I want to **understand what currently works in the codebase**,
So that **I know what needs to be built vs fixed vs left alone**.

**Acceptance Criteria:**

**Given** the existing codebase with partial implementation
**When** the developer runs the application locally
**Then** they can access all existing routes and document their status

**And** for each feature area, document:
- Landing page (`/landing`): renders? content complete?
- Store page (`/store`): renders? shows products? (hardcoded or from DB?)
- Product detail page: exists? accessible?
- Cart functionality: add/remove/update works?
- Checkout (`/store/checkout`): form renders? validation works? order submission works?
- Order confirmation (`/store/checkout/success`): renders with order data?
- Admin login (`/admin/login`): renders? authentication works?
- Admin dashboard (`/admin/dashboard`): renders? shows data?

**And** test database connectivity:
- Supabase connection works?
- Can read products?
- Can write orders?
- Auth flow works?

**And** create output file: `docs/audit/codebase-health-check.md`

**Prerequisites:** None (first story)

**Technical Notes:**
- Run `npm run dev` and manually test each route
- Check browser console for errors
- Check terminal for server errors
- Note any environment variables missing

---

### Story 0.2: Dead Code & Orphaned Files Cleanup

As a **developer**,
I want to **remove dead code and commit pending deletions**,
So that **the codebase reflects reality and doesn't confuse future development**.

**Acceptance Criteria:**

**Given** files staged for deletion in git (Docker, Prisma, Supabase config, tests, scripts)
**When** the developer reviews and commits the cleanup
**Then** all orphaned files are removed from the repository

**And** check for dead code references:
- Remove `src/lib/prisma.ts` if Prisma is no longer used
- Remove any imports referencing deleted files
- Remove unused dependencies from `package.json`

**And** verify no broken imports remain:
- Run `npm run build` - should complete without import errors
- Run TypeScript check - no missing module errors

**And** commit cleanup with clear message: "chore: remove orphaned files from previous implementation attempt"

**Prerequisites:** Story 0.1 (need to know what's dead vs alive)

**Technical Notes:**
- Use `git status` to see all pending changes
- Check imports in files that might reference Prisma
- Run `npm ls` to check for unused packages
- Don't remove anything that Story 0.1 identified as working

---

### Story 0.3: Codebase Map for Dev Agent

As a **dev agent**,
I want to **understand the existing codebase structure and what's implemented**,
So that **I don't duplicate work or miss integration points**.

**Acceptance Criteria:**

**Given** the cleaned-up codebase from Story 0.2
**When** the developer documents the current state
**Then** create `docs/audit/codebase-map.md` containing:

**And** document folder structure:
```
src/
├── app/           # Next.js app router pages
├── components/    # React components by domain
├── contexts/      # React context providers
├── hooks/         # Custom React hooks
├── lib/           # Utilities, Supabase client, validations
├── types/         # TypeScript type definitions
└── middleware.ts  # Auth middleware
```

**And** list all components with status:
| Component | Path | Status | Notes |
|-----------|------|--------|-------|
| ProductCard | src/components/store/ProductCard.tsx | Working/Partial/Broken | ... |

**And** map existing code to PRD FRs:
| FR | Status | Implementation | Notes |
|----|--------|----------------|-------|
| FR1 | Done/Partial/Missing | src/app/store/page.tsx | ... |

**And** note any deviations from Architecture docs

**Prerequisites:** Story 0.1, Story 0.2

**Technical Notes:**
- Cross-reference with Architecture project-structure.md
- Be thorough - this document guides all future development
- Flag any components that exist but aren't used

---

### Story 0.4: Environment & Database Verification

As a **developer**,
I want to **verify the database and environment are correctly configured**,
So that **the app can read/write data as designed**.

**Acceptance Criteria:**

**Given** the Supabase instance referenced in environment
**When** the developer verifies configuration
**Then** confirm:

**And** environment variables match Architecture docs:
- `NEXT_PUBLIC_SUPABASE_URL` is set
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- `SUPABASE_SERVICE_ROLE_KEY` is set (for admin operations)
- Any other required env vars

**And** database schema matches Data Architecture:
- `products` table exists with correct columns
- `orders` table exists with correct columns
- `order_items` table exists with correct columns
- `profiles` table exists (for admin users)

**And** RLS policies are configured:
- Products readable by anon
- Orders writable by anon (for guest checkout)
- Admin tables protected

**And** seed data exists for testing:
- At least 3-5 products with images
- At least 1 admin user for login testing

**And** document any gaps in `docs/audit/database-status.md`

**Prerequisites:** Story 0.1

**Technical Notes:**
- Use Supabase dashboard to verify schema
- Check `docs/planning/architecture/data-architecture.md` for expected schema
- If schema is missing, note it - but don't create it in this story

---

### Story 0.5: Build Verification & Clean State

As a **developer**,
I want to **ensure the codebase builds and lints cleanly**,
So that **CI/CD won't fail and the dev agent starts from a working state**.

**Acceptance Criteria:**

**Given** the cleaned codebase from previous stories
**When** running build and lint commands
**Then** all pass without errors:

**And** `npm run build` completes successfully
- No TypeScript errors
- No missing imports
- Build output generated

**And** `npm run lint` passes
- No ESLint errors (warnings acceptable)
- No formatting issues

**And** `npm run dev` starts without errors
- Server starts on expected port
- No runtime crashes on page load

**And** commit any fixes with message: "fix: resolve build and lint errors for clean state"

**And** update `docs/audit/codebase-health-check.md` with final status:
- Build: PASS/FAIL
- Lint: PASS/FAIL
- Dev server: PASS/FAIL
- Ready for development: YES/NO

**Prerequisites:** Story 0.2, Story 0.3, Story 0.4

**Technical Notes:**
- This is the final gate before Epic 1
- If there are unfixable errors, document them as blockers
- The goal is a green build, not perfect code

---

### Epic 0 Summary

| Story | Title | Dependencies |
|-------|-------|--------------|
| 0.1 | Codebase Health Check & Feature Audit | None |
| 0.2 | Dead Code & Orphaned Files Cleanup | 0.1 |
| 0.3 | Codebase Map for Dev Agent | 0.1, 0.2 |
| 0.4 | Environment & Database Verification | 0.1 |
| 0.5 | Build Verification & Clean State | 0.2, 0.3, 0.4 |

**Output artifacts:**
- `docs/audit/codebase-health-check.md`
- `docs/audit/codebase-map.md`
- `docs/audit/database-status.md`
- Clean git history with orphaned files removed
- Passing build

---

<!-- Additional Epic sections will be added after Epic 0 completion -->

---

## FR Coverage Matrix

<!-- fr_coverage_matrix will be populated in Step 4 -->

---

## Summary

<!-- epic_breakdown_summary will be populated in Step 4 -->

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._

_This document incorporates context from: PRD + UX Design + Architecture._
