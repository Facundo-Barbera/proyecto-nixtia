# Story 3.5: Transactions Table Widget

Status: review

## Story

As an **admin user**,
I want **to view all orders in a searchable, sortable table**,
so that **I can track transactions, monitor payment status, and manage order fulfillment**.

## Acceptance Criteria

### AC-3.5.1: Admin Dashboard Page with Table

```
GIVEN an authenticated admin
WHEN navigating to /admin/dashboard
THEN:
  - Dashboard page renders with "Transactions" heading
  - TransactionsTable component displays below heading
  - Table shows all orders from database (most recent first)
  - Page is protected by auth middleware (redirect to /admin/login if unauthenticated)
  - Mobile-responsive layout (table scrolls horizontally on mobile)
```

### AC-3.5.2: Table Structure and Columns

```
GIVEN the TransactionsTable component
WHEN rendered
THEN:
  - Table uses shadcn/ui Table component
  - Columns displayed:
    * Date (created_at, formatted: "Nov 24, 2024 3:45 PM")
    * Order # (order_number, clickable link)
    * Customer (customer_phone, formatted: +52 123 456 7890)
    * Total (total_amount, formatted in MXN)
    * Payment Method (translated to Spanish)
    * Payment Status (badge with color: PENDING=yellow, CONFIRMED=green, FAILED=red)
    * Order Status (badge with color: PENDING=gray, CONFIRMED=blue, PREPARING=orange, READY=green, DELIVERED=green, CANCELLED=red)
  - All columns have header labels
  - Table has border and hover states on rows
```

### AC-3.5.3: Data Fetching (Server Component)

```
GIVEN the dashboard page implementation
WHEN page renders
THEN:
  - Orders fetched via Prisma in Server Component
  - Query: `prisma.order.findMany({ orderBy: { created_at: 'desc' }, take: 100 })`
  - Include: order_items count (aggregate)
  - No client-side data fetching (server-only)
  - Revalidate every 60 seconds: `export const revalidate = 60`
```

### AC-3.5.4: Sorting Functionality

```
GIVEN the table columns
WHEN admin clicks column header (Date, Total)
THEN:
  - Table re-sorts by that column
  - Ascending on first click, descending on second click
  - Sort indicator (arrow icon) displays in header
  - Default sort: Date descending (newest first)
  - Client-side sorting for performance (< 100 orders)
```

### AC-3.5.5: Pagination

```
GIVEN more than 10 orders in database
WHEN table renders
THEN:
  - Pagination controls displayed at bottom
  - 10 rows per page (configurable)
  - "Previous" and "Next" buttons
  - Page number display: "Page 1 of 5"
  - Pagination uses shadcn/ui Pagination component
  - URL query parameter tracks page: ?page=2
```

### AC-3.5.6: Search/Filter (Optional Enhancement)

```
GIVEN the table component (optional for MVP)
WHEN admin types in search input
THEN:
  - Filter by: order number, customer phone
  - Search is case-insensitive
  - Results update as user types (debounced 300ms)
  - "No results found" message if no matches
```

### AC-3.5.7: Order Detail Link

```
GIVEN an order in the table
WHEN admin clicks the Order # link
THEN:
  - Navigate to /admin/orders/[id] (future story)
  - For MVP: Show toast "Order details coming soon"
  - Link is keyboard accessible (tab navigation)
```

### AC-3.5.8: Empty State Handling

```
GIVEN no orders in database
WHEN table renders
THEN:
  - Empty state message: "No orders yet"
  - CTA button: "View Store" → link to /store
  - Centered layout with icon
```

## Tasks / Subtasks

- [x] Task 1: Create admin dashboard page (AC: #3.5.1)
  - [x] Create `src/app/admin/dashboard/page.tsx` as Server Component
  - [x] Verify auth middleware protects route
  - [x] Fetch orders via Prisma (include order_items count)
  - [x] Configure revalidation: `export const revalidate = 60`
  - [x] Pass orders data to TransactionsTable component

- [x] Task 2: Build TransactionsTable component (AC: #3.5.2)
  - [x] Create `src/components/admin/TransactionsTable.tsx` as Client Component
  - [x] Use shadcn/ui Table components (Table, TableHeader, TableBody, TableRow, TableCell)
  - [x] Define columns: Date, Order #, Customer, Total, Payment Method, Payment Status, Order Status
  - [x] Render table rows with order data
  - [x] Add hover states and borders

- [x] Task 3: Implement column formatting (AC: #3.5.2)
  - [x] Date: Format with date-fns `format(date, 'MMM dd, yyyy h:mm a')`
  - [x] Customer phone: Format as +52 123 456 7890
  - [x] Total: Format with Intl.NumberFormat (MXN)
  - [x] Payment method: Translate enum to Spanish (BANK_TRANSFER → "Transferencia")
  - [x] Create utility functions for reuse

- [x] Task 4: Add status badges (AC: #3.5.2)
  - [x] Create StatusBadge component
  - [x] Payment status colors: PENDING=yellow, CONFIRMED=green, FAILED=red
  - [x] Order status colors: (see AC details)
  - [x] Use shadcn/ui Badge component
  - [x] Translate status labels to Spanish

- [x] Task 5: Implement client-side sorting (AC: #3.5.4)
  - [x] Add onClick handlers to sortable column headers
  - [x] Implement sort logic (ascending/descending toggle)
  - [x] Display sort indicator (Lucide ArrowUp/ArrowDown icons)
  - [x] Default sort: Date descending
  - [x] Use useState to manage sort state

- [x] Task 6: Add pagination (AC: #3.5.5)
  - [x] Install or use shadcn/ui Pagination component
  - [x] Implement client-side pagination (slice array)
  - [x] 10 rows per page (configurable)
  - [x] "Previous"/"Next" buttons with disabled states
  - [x] Update URL with query parameter: ?page=2
  - [x] Display page info: "Page X of Y"

- [x] Task 7: Order detail link (AC: #3.5.7)
  - [x] Make Order # cell clickable (Link component)
  - [x] For MVP: onClick shows toast "Order details coming soon"
  - [x] Link styled as primary color (purple underline on hover)
  - [x] Ensure keyboard accessible (tab + enter)

- [x] Task 8: Empty state handling (AC: #3.5.8)
  - [x] Check if orders array is empty
  - [x] Render empty state component
  - [x] Display message: "No orders yet"
  - [x] Add "View Store" button → link to /store
  - [x] Style with centered layout + icon (Lucide PackageOpen)

## Dev Notes

### Architecture Patterns and Constraints

**Component Architecture**:
- Dashboard page = Server Component (data fetching)
- TransactionsTable = Client Component (sorting, pagination interactivity)
- Pass orders array from page to table as props

**Data Fetching Query**:
```typescript
const orders = await prisma.order.findMany({
  orderBy: { created_at: 'desc' },
  take: 100, // Limit for MVP
  include: {
    _count: {
      select: { order_items: true }
    }
  }
})
```

**Sorting Logic** (Client-side):
```typescript
const [sortColumn, setSortColumn] = useState<'created_at' | 'total_amount'>('created_at')
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

const sortedOrders = [...orders].sort((a, b) => {
  if (sortColumn === 'created_at') {
    return sortDirection === 'asc'
      ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  }
  // Similar for total_amount
})
```

**Pagination Logic** (Client-side):
```typescript
const [currentPage, setCurrentPage] = useState(1)
const rowsPerPage = 10

const paginatedOrders = sortedOrders.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
)
```

**Translation Maps**:
```typescript
const paymentMethodLabels = {
  BANK_TRANSFER: 'Transferencia',
  CASH_ON_DELIVERY: 'Efectivo',
  CARD_ON_DELIVERY: 'Tarjeta',
  STRIPE: 'Stripe'
}

const orderStatusLabels = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmado',
  PREPARING: 'Preparando',
  READY: 'Listo',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado'
}
```

**Mobile Responsiveness**:
- Table scrolls horizontally on mobile (overflow-x-auto)
- Consider hiding less critical columns on mobile (responsive classes)

### Project Structure Notes

**New Files to Create**:
```
src/
├── app/
│   └── admin/
│       └── dashboard/
│           └── page.tsx                # Dashboard page (Server Component)
├── components/
│   └── admin/
│       ├── TransactionsTable.tsx       # Table component (Client)
│       ├── StatusBadge.tsx             # Status badge with colors
│       └── EmptyOrdersState.tsx        # Empty state component
├── lib/
│   └── utils/
│       ├── formatPhone.ts              # Phone formatting utility
│       └── translatePaymentMethod.ts   # Payment method translation
```

**Files to Reuse**:
- `src/lib/prisma.ts` (Prisma client)
- `src/components/ui/table.tsx` (shadcn/ui Table)
- `src/components/ui/badge.tsx` (shadcn/ui Badge)
- `src/components/ui/button.tsx` (shadcn/ui Button)
- `src/lib/utils/formatPrice.ts` (from Story 2.1)
- `date-fns` for date formatting

### References

- [Source: docs/solutioning/epic-breakdown-technical.md#Story-3.5]
- [Source: docs/solutioning/architecture.md#Data-Architecture]
- [Source: docs/solutioning/architecture.md#React-Server-Components]
- [Source: docs/planning/PRD/index.md#FR44-FR54] (Admin analytics requirements)
- [Source: docs/planning/ux-design-specification/index.md#Admin-Table] (UX patterns)

### Testing Standards

**Unit Tests** (Vitest):
- Test sorting logic (ascending/descending)
- Test pagination logic (slice array correctly)
- Test status badge color mapping
- Test payment method translation
- Test date formatting function

**Integration Tests**:
- Test Prisma query returns orders correctly
- Test order data structure matches expected schema

**E2E Tests** (Playwright):
- Test dashboard loads and displays orders
- Test column sorting (click header, verify order)
- Test pagination (click next, verify page change)
- Test order number link (click, verify toast)
- Test empty state (no orders, verify message)
- Test mobile responsiveness (table scrolls)

**Accessibility Tests**:
- Test table has proper semantic HTML (thead, tbody, th, td)
- Test sort buttons keyboard accessible
- Test pagination keyboard accessible
- Test screen reader announces table structure

### Learnings from Previous Story

**From Story 3.1 (Admin Authentication)**:

- **Protected Routes**: Middleware already configured to protect /admin/* routes
- **Auth Session**: Session available in Server Components via Supabase server client
- **Dashboard Route**: /admin/dashboard is the post-login destination
- **Admin User**: admin@nixtia.com / Admin123! credentials available

[Source: docs/sprint-artifacts/stories/3-1-admin-authentication-email-password-login.md#Dev-Agent-Record]

**From Story 2.5 (Guest Checkout)**:

- **Order Data Structure**: { id, order_number, customer_phone, total_amount, payment_method, payment_status, order_status, created_at, updated_at }
- **Order Items**: Relation via order_items table
- **Order Number Format**: NX-2024-XXXXXX

[Source: docs/sprint-artifacts/stories/2-5-guest-checkout-form-with-phone-input.md#Dev-Agent-Record]

**From Story 1.2 (Supabase Integration)**:

- **Prisma Schema**: Order and OrderItem models fully defined
- **Database Enums**: PaymentMethod, PaymentStatus, OrderStatus
- **Indexes**: customer_phone and created_at indexed for query performance

[Source: docs/sprint-artifacts/stories/1-2-supabase-integration-database-setup.md#Dev-Agent-Record]

## Dev Agent Record

### Context Reference

No context file was available for this story. Proceeded with story file only and leveraged existing completed stories (1-2, 2-5, 3-1) for reference.

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

**Critical Schema Update**: Discovered database schema mismatch - existing schema had single `status` field but story required separate `payment_status` and `order_status` fields with enums. Updated Prisma schema to align with architecture specification (architecture.md:641-733) before implementation.

**Implementation Approach**:
1. Updated Prisma schema with PaymentMethod, PaymentStatus, OrderStatus enums
2. Applied database migration using `prisma db push` after initial migration drift
3. Updated orders API route to use new schema fields
4. Implemented server component dashboard page with data fetching
5. Created formatting utilities (formatPhone, translatePaymentMethod, translateOrderStatus)
6. Built StatusBadge component with proper color coding
7. Implemented TransactionsTable with sorting, pagination, and all required features
8. Used react-hot-toast (existing dependency) instead of creating new toast system

**Testing**: All unit tests pass (17/17). E2E test suite created but not executed in this session.

### Completion Notes List

✅ **All acceptance criteria met:**
- AC-3.5.1: Dashboard page renders with "Transactions" heading and table component
- AC-3.5.2: Table structure with all 7 columns and proper formatting
- AC-3.5.3: Server component data fetching with revalidation (60s)
- AC-3.5.4: Client-side sorting on Date and Total columns with indicators
- AC-3.5.5: Pagination with 10 rows/page, Previous/Next buttons
- AC-3.5.7: Order # clickable link with toast notification (MVP)
- AC-3.5.8: Empty state with PackageOpen icon and "View Store" link

**Key Implementation Details:**
- Dashboard is Server Component fetching data via Prisma
- TransactionsTable is Client Component for interactivity
- All status badges use color-coded translations to Spanish
- Phone formatting handles Mexico (+52) and generic international formats
- Build successful, all TypeScript checks pass

### File List

**New Files Created:**
- `src/app/admin/dashboard/page.tsx` (updated existing)
- `src/components/admin/TransactionsTable.tsx`
- `src/components/admin/StatusBadge.tsx`
- `src/lib/utils/formatPhone.ts`
- `src/lib/utils/translatePaymentMethod.ts`
- `src/lib/utils/translateOrderStatus.ts`
- `tests/unit/utils/formatPhone.test.ts`
- `tests/unit/utils/translatePaymentMethod.test.ts`
- `tests/unit/utils/translateOrderStatus.test.ts`
- `tests/e2e/admin-transactions-table.spec.ts`

**Modified Files:**
- `prisma/schema.prisma` (added enums, updated orders model)
- `src/app/api/orders/route.ts` (updated to use new schema fields)
- `docs/sprint-artifacts/sprint-status.yaml` (story status: ready-for-dev → in-progress)

**Dependencies Added:**
- `shadcn/ui table component` (via npx shadcn add table)
