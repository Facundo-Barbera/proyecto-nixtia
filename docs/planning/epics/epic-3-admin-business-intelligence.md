# Epic 3: Admin Business Intelligence

**Goal:** Enable business owner to log in securely and immediately see business performance insights

**User Value:** "I finally _understand_ my business" - Operational liberation through analytics

**FRs Covered:** FR6-FR10, FR44-FR54

**Stories:** 6 stories

---

## Story 3.1: Admin Authentication (Email/Password Login)

As a **business owner**,
I want to log in securely with my email and password,
So that I can access my business dashboard privately.

**Acceptance Criteria:**

**Given** I navigate to /admin/login
**When** I see the login form
**Then** I see:

- Email input field (label above, required indicator)
- Password input field with visibility toggle icon (show/hide password)
- "Remember me" checkbox (default: unchecked)
- "Sign In" button (primary purple-600 solid)
- "Forgot password?" link (disabled/grayed for demo, will work post-demo)

**And** entering valid credentials and clicking "Sign In" shows loading spinner on button

**And** successful authentication redirects to /admin/dashboard within 2 seconds

**And** invalid credentials show inline error: "Invalid email or password" (red-500, below form)

**And** selecting "Remember me" persists session across browser sessions (30 days)

**And** not selecting "Remember me" ends session on browser close

**And** empty fields on submit show validation errors

**Prerequisites:** Story 1.2 (Supabase auth configured)

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-auth.spec.ts` (uses `AuthHelper`)

- **Test:** Admin login form displays correctly
  - Navigate to `/admin/login`
  - Verify email and password fields
  - Verify "Remember me" checkbox
  - Verify "Sign In" button
  - Verify "Forgot password?" link is disabled/grayed
- **Test:** Successful login
  - Enter valid credentials
  - Click "Sign In"
  - Verify loading spinner appears
  - Verify redirect to `/admin/dashboard` within 2s
- **Test:** Invalid credentials
  - Enter invalid email/password
  - Verify error message: "Invalid email or password"
  - Verify no details revealed about which field is wrong (security)
- **Test:** Form validation
  - Submit empty form → verify validation errors
  - Submit invalid email format → verify error
- **Test:** "Remember me" functionality
  - Login with "Remember me" checked → verify session persists across browser restart
  - Login without "Remember me" → verify session ends on browser close

**Technical Notes:**

- Supabase Auth: Email/password provider
- Form: React Hook Form with validation
- Password toggle: Eye/EyeOff icon from Lucide React
- Session persistence: Supabase handles via cookies (remember me = persistent, else session cookie)
- Error handling: Generic error message (don't reveal if email exists - security)
- Redirect: Use Next.js router.push to /admin/dashboard
- Accessibility: Proper form labels, error messages linked to inputs

---

## Story 3.2: Admin Protected Routes & Session Management

As a **business owner**,
I want admin pages to require authentication,
So that only I can access sensitive business data.

**Acceptance Criteria:**

**Given** I am not logged in
**When** I try to access /admin/dashboard or any /admin/\* route
**Then** I am automatically redirected to /admin/login

**And** after logging in, I am redirected to the page I originally requested

**And** my session persists for 30 days if "Remember me" was checked, or until browser close otherwise

**And** I can manually log out by clicking "Logout" button (clears session, redirects to /admin/login)

**And** session timeout after 30 minutes of inactivity (shows warning toast: "Session will expire in 5 minutes")

**And** expired session redirects to login with message: "Session expired, please log in again"

**Prerequisites:** Story 3.1

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-protected-routes.spec.ts`

- **Test:** Unauthenticated access redirects to login
  - Navigate to `/admin/dashboard` without auth
  - Verify redirect to `/admin/login`
  - Verify return URL preserved in query param
- **Test:** Post-login redirect to original page
  - Try accessing `/admin/dashboard` → redirected to login
  - Login successfully
  - Verify redirect back to `/admin/dashboard`
- **Test:** Session persistence (Remember me)
  - Login with "Remember me"
  - Close and reopen browser
  - Navigate to admin page → verify still authenticated
- **Test:** Logout functionality
  - Login
  - Click "Logout" button
  - Verify session cleared
  - Verify redirect to `/admin/login`
  - Try accessing admin page → verify redirect to login
- **Test:** Session timeout
  - Login
  - Wait for inactivity timeout (or mock time)
  - Verify warning toast: "Session will expire in 5 minutes"
  - Wait for expiry → verify redirect with message "Session expired, please log in again"

**Technical Notes:**

- Middleware: Next.js middleware checks auth on /admin/\* routes
- Supabase session: Check via getSession() on server
- Redirect: Use NextResponse.redirect in middleware
- Logout: Call Supabase signOut(), clear cookies, redirect to /admin/login
- Session timeout: Supabase handles automatic expiry, detect on client and show warning
- Return URL: Store attempted URL in query param (?returnTo=/admin/dashboard)

---

## Story 3.3: Admin Dashboard Layout & Navigation

As a **business owner**,
I want a clean dashboard layout with easy navigation,
So that I can quickly find the information and tools I need.

**Acceptance Criteria:**

**Given** I am logged in as admin
**When** I land on /admin/dashboard
**Then** I see:

- Top navigation bar with: Nixtia logo (left), "Dashboard" / "Products" links (center - Products grayed/disabled for demo), "Logout" link (right)
- Main content area displaying three prominent analytics widgets (vertical stack on mobile, 2-column on tablet, full layout on desktop):
  1. Revenue Chart (large, top)
  2. Transactions Table (middle)
  3. Payment Breakdown Chart (bottom-right)
- Clean white background, cards with subtle shadows (UX pg 4)

**And** clicking "Logout" signs me out and redirects to /admin/login

**And** responsive layout:

- Mobile: Single column, widgets stack vertically
- Tablet: 2-column grid for transactions + payment breakdown
- Desktop: Full 3-widget layout per UX mockup (Revenue full-width top, Transactions left, Payment Breakdown right)

**And** page loads in < 2 seconds

**Prerequisites:** Story 3.2

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-dashboard-layout.spec.ts`

- **Test:** Dashboard layout displays correctly
  - Login and navigate to `/admin/dashboard`
  - Verify top navigation bar with: logo, "Dashboard"/"Products" links, "Logout" link
  - Verify "Products" link is grayed/disabled (post-demo)
  - Verify three analytics widgets visible
- **Test:** Logout from dashboard
  - Click "Logout" link
  - Verify redirect to `/admin/login`
  - Verify session cleared
- **Test:** Responsive dashboard layout
  - Mobile: verify single column, widgets stack vertically
  - Tablet: verify 2-column grid
  - Desktop: verify full 3-widget layout (Revenue top, Transactions left, Payment Breakdown right)
- **Test:** Page load performance
  - Verify page loads in < 2s

**Technical Notes:**

- Layout: app/admin/layout.tsx with shared nav
- Navigation: Link components, active state highlighted (purple-600 text + underline per UX pg 7)
- Widgets: Three separate components (RevenueChart, TransactionsTable, PaymentBreakdown)
- Grid: CSS Grid with responsive breakpoints (UX pg 8)
- Protected layout: Wrap in auth check, redirect if not authenticated

---

## Story 3.4: Revenue Chart Widget (Daily/Weekly/Monthly)

As a **business owner**,
I want to see visual revenue trends over time,
So that I can understand how my business is performing and identify patterns.

**Acceptance Criteria:**

**Given** I am viewing the admin dashboard
**When** I see the Revenue Chart widget
**Then** I see:

- Line/area chart showing revenue over time (Chart.js or Recharts)
- X-axis: Date labels (responsive based on range)
- Y-axis: Currency amounts (formatted with $ symbol)
- Date range selector above chart: "Daily" / "Weekly" / "Monthly" tabs (default: Weekly)
- Total revenue for selected period displayed prominently above chart
- Chart animates smoothly when drawing (0.5s ease-out)
- Tooltip on hover showing exact date + amount

**And** selecting different date ranges updates the chart with smooth transition

**And** chart data is fetched from /api/analytics/revenue?range=weekly

**And** chart renders in < 500ms after data loads

**And** empty state (no data) shows: "No sales data for this period" with friendly icon

**And** chart is responsive (full-width on mobile, constrained width on desktop)

**Prerequisites:** Story 3.3, Story 2.8 (orders data exists)

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-revenue-chart.spec.ts`

- **Test:** Revenue chart displays correctly
  - Login and navigate to dashboard
  - Verify chart is visible
  - Verify X-axis (date labels) and Y-axis (currency amounts with $)
  - Verify total revenue for period displayed above chart
- **Test:** Date range selector
  - Verify "Daily", "Weekly", "Monthly" tabs (default: Weekly)
  - Click "Daily" → verify chart updates
  - Click "Monthly" → verify smooth transition
- **Test:** Chart interactivity
  - Hover over data point → verify tooltip shows exact date + amount
  - Verify chart animates on draw (0.5s ease-out)
- **Test:** Chart renders with real data
  - Seed 20-30 demo orders with various dates
  - Verify chart displays data points correctly
  - Verify aggregation is correct (sum of totals per period)
- **Test:** Empty state
  - Clear all orders from database
  - Verify empty state: "No sales data for this period" with icon
- **Test:** Responsive chart
  - Mobile: verify full-width
  - Desktop: verify constrained width

**Technical Notes:**

- Component: RevenueChart (UX Design pg 7)
- Charting library: Chart.js with react-chartjs-2 OR Recharts (both accessible)
- API route: /api/analytics/revenue aggregates order totals by date range
- Data aggregation: SUM(total) GROUP BY DATE_TRUNC for Postgres
- Mock data: Seed 20-30 demo orders with various dates for realistic chart
- Color: Purple-600 line, purple-100 area fill (brand colors)
- Accessibility: Chart has text alternative, data table toggle for screen readers

---

## Story 3.5: Transactions Table Widget

As a **business owner**,
I want to see recent orders in a table,
So that I can quickly review customer purchases and payment methods.

**Acceptance Criteria:**

**Given** I am viewing the admin dashboard
**When** I see the Transactions Table widget
**Then** I see a table with columns:

- Date (formatted: "Nov 18, 2025 3:45 PM")
- Customer Phone (formatted with country code: "+54 555 123 4567")
- Total (currency formatted: "$28.50")
- Payment Method (icon + label: "Bank Transfer" / "Cash on Delivery" / "Stripe")

**And** table shows the 10 most recent orders (sorted by created_at DESC)

**And** table is scrollable if more than 10 rows (fixed header)

**And** responsive behavior:

- Mobile: Card view (each row becomes a card with labels)
- Tablet/Desktop: Full table with all columns

**And** data is fetched from /api/orders?limit=10&sort=desc

**And** empty state shows: "No orders yet. Orders will appear here."

**Prerequisites:** Story 3.3, Story 2.8 (orders data)

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-transactions-table.spec.ts`

- **Test:** Transactions table displays correctly
  - Verify table with columns: Date, Customer Phone, Total, Payment Method
  - Verify 10 most recent orders displayed (sorted by created_at DESC)
  - Verify date formatting: "Nov 18, 2025 3:45 PM"
  - Verify phone formatting: "+54 555 123 4567"
  - Verify currency formatting: "$28.50"
  - Verify payment method with icon + label
- **Test:** Table scrolling
  - Seed 15+ orders
  - Verify table is scrollable with fixed header
- **Test:** Responsive table
  - Mobile: verify card view (each row becomes a card with labels)
  - Desktop: verify full table with all columns
- **Test:** Empty state
  - Clear all orders
  - Verify message: "No orders yet. Orders will appear here."

**Technical Notes:**

- Component: TransactionsTable
- Data source: Supabase `orders` table, join with `products` if needed for item details
- Date formatting: use date-fns library (format(date, 'MMM dd, yyyy h:mm a'))
- Phone formatting: libphonenumber-js formatInternational()
- Responsive: CSS Grid on desktop, Card layout on mobile (<768px)
- Icons: Lucide React (Building2, Wallet, CreditCard)
- Accessibility: Semantic table element, proper headers, mobile cards have labels

---

## Story 3.6: Payment Breakdown Chart Widget

As a **business owner**,
I want to see how customers are paying,
So that I can understand payment preferences and optimize accordingly.

**Acceptance Criteria:**

**Given** I am viewing the admin dashboard
**When** I see the Payment Breakdown widget
**Then** I see:

- Pie or donut chart showing payment method distribution
- Three segments: Bank Transfer, Cash/Card on Delivery, Stripe
- Each segment labeled with: payment method name, percentage, count
- Legend below chart with color-coded labels
- Chart animates when loading (smooth draw animation)

**And** hovering over segment shows tooltip: "[Method]: $XXX (Y orders, Z%)"

**And** data is fetched from /api/analytics/payment-breakdown

**And** chart is responsive (smaller on mobile, larger on desktop)

**And** empty state shows: "No payment data yet"

**Prerequisites:** Story 3.3, Story 2.8 (orders with payment methods)

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-payment-breakdown.spec.ts`

- **Test:** Payment breakdown chart displays correctly
  - Verify pie/donut chart is visible
  - Verify three segments: Bank Transfer, Cash/Card on Delivery, Stripe
  - Verify each segment labeled with: method name, percentage, count
  - Verify legend below chart with color-coded labels
- **Test:** Chart interactivity
  - Hover over segment → verify tooltip: "[Method]: $XXX (Y orders, Z%)"
  - Verify chart animates on load (smooth draw)
- **Test:** Chart data accuracy
  - Seed orders with different payment methods
  - Verify percentages calculated correctly
  - Verify counts match actual orders
- **Test:** Responsive chart
  - Mobile: verify smaller size
  - Desktop: verify larger size
- **Test:** Empty state
  - Clear all orders
  - Verify message: "No payment data yet"

**Technical Notes:**

- Component: PaymentBreakdownChart (UX Design pg 7)
- Chart library: Same as RevenueChart (Chart.js or Recharts)
- API: /api/analytics/payment-breakdown aggregates COUNT and SUM by payment_method
- Colors: Three distinct colors from purple palette (purple-600, purple-400, purple-200)
- Chart type: Donut chart (better than pie for readability)
- Accessibility: Chart has text alternative, data list for screen readers

---
