# Epic 4: Admin Dashboard Completion

**Goal:** Add revenue analytics and payment breakdown charts to the admin dashboard.

**User Value:** Business owner can visualize revenue trends and payment method distribution to make informed decisions.

**FR Coverage:** FR44-47 (revenue charts), FR52-53 (payment breakdown)

---

## Story 4.1: Dashboard Layout with KPI Cards

As an **admin**,
I want to **see key metrics at a glance**,
So that **I understand business performance immediately**.

**Acceptance Criteria:**

**Given** the admin dashboard page
**When** the admin views the dashboard
**Then** they see a row of KPI cards above the transactions table:

**Card 1: Total Revenue**
- Label: "Total Revenue"
- Value: Sum of all orders (formatted: $X,XXX.XX MXN)
- Supabase query: `SELECT SUM(total) FROM orders`

**Card 2: Orders Today**
- Label: "Orders Today"
- Value: Count of orders where `created_at` is today
- Supabase query with date filter

**Card 3: Average Order Value**
- Label: "Avg Order Value"
- Value: Total revenue / order count (formatted)

**And** cards use existing shadcn/ui Card component
**And** responsive: 3 columns on desktop, stack on mobile

**Prerequisites:** Epic 1 complete

**Technical Notes:**
- Aggregate queries can be done server-side in page component
- Consider using Supabase RPC for complex aggregations

---

## Story 4.2: Revenue Chart Component

As an **admin**,
I want to **view a revenue chart showing trends**,
So that **I can track business growth over time**.

**Acceptance Criteria:**

**Given** the admin dashboard
**When** the admin views the revenue section
**Then** they see a line/bar chart showing:
- X-axis: Dates (last 30 days by default)
- Y-axis: Revenue in MXN
- Data points for each day with orders
- Hover tooltip showing date and exact amount

**And** chart uses Recharts (already installed):
```typescript
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
```

**And** chart is responsive (full width, ~300px height)
**And** empty state: "No orders in selected period"

**Prerequisites:** Story 4.1

**Technical Notes:**
- Create `src/components/admin/RevenueChart.tsx`
- Fetch aggregated daily revenue from Supabase
- Group by date: `DATE(created_at)`
- Format dates with date-fns

---

## Story 4.3: Date Range Filter for Revenue

As an **admin**,
I want to **filter revenue by date range**,
So that **I can analyze specific time periods**.

**Acceptance Criteria:**

**Given** the revenue chart
**When** the admin selects a date filter
**Then** the chart updates to show only that period

**And** filter options:
- Quick filters: "Today", "Last 7 Days", "Last 30 Days", "This Month"
- Buttons styled with shadcn/ui Button variant="outline"

**And** KPI cards also update to reflect selected period
**And** filter state persists during session (React state, not URL)

**Prerequisites:** Story 4.2

**Technical Notes:**
- Use date-fns for date calculations
- Pass date range to Supabase query as parameters
- Consider using URL params for shareable filtered views (post-MVP)

---

## Story 4.4: Payment Method Breakdown Chart

As an **admin**,
I want to **see payment method distribution**,
So that **I understand customer payment preferences**.

**Acceptance Criteria:**

**Given** the admin dashboard
**When** the admin views the payment breakdown section
**Then** they see a pie/donut chart showing:
- Segments for each payment method (Bank Transfer, Cash/Card on Delivery, Stripe)
- Percentage labels
- Legend with method names and counts
- Colors per Architecture decision (Recharts default palette acceptable)

**And** data query:
```sql
SELECT payment_method, COUNT(*), SUM(total)
FROM orders
GROUP BY payment_method
```

**And** chart updates with date filter (same as revenue chart)
**And** chart is responsive

**Prerequisites:** Story 4.2

**Technical Notes:**
- Create `src/components/admin/PaymentBreakdownChart.tsx`
- Use Recharts PieChart component
- Show both count and revenue per method in tooltip

---

## Story 4.5: Dashboard Layout Integration

As an **admin**,
I want to **see all dashboard components in a cohesive layout**,
So that **I have a complete view of business analytics**.

**Acceptance Criteria:**

**Given** all dashboard components built
**When** the admin views `/admin/dashboard`
**Then** they see this layout:

```
+---------------------------------------------+
| Nixtia Admin                    [Logout]    |
+---------------------------------------------+
| [Today] [7 Days] [30 Days] [This Month]     |
+----------+----------+----------------------+
| Revenue  | Orders   | Avg Order            |
| $X,XXX   | XX       | $XXX                 |
+----------+----------+----------------------+
| Revenue Over Time          | Payment Split  |
| [Line Chart]               | [Pie Chart]    |
+----------------------------+----------------+
| Recent Transactions                         |
| [Table - existing component]                |
+---------------------------------------------+
```

**And** responsive: charts stack on mobile
**And** smooth loading states while data fetches
**And** error handling if queries fail

**Prerequisites:** Story 4.1, 4.2, 4.3, 4.4

**Technical Notes:**
- Refactor existing dashboard page to include new sections
- Use CSS Grid for layout
- Keep existing TransactionsTable component

---

## Epic 4 Summary

| Story | Title | Dependencies |
|-------|-------|--------------|
| 4.1 | Dashboard Layout with KPI Cards | Epic 1 |
| 4.2 | Revenue Chart Component | 4.1 |
| 4.3 | Date Range Filter for Revenue | 4.2 |
| 4.4 | Payment Method Breakdown Chart | 4.2 |
| 4.5 | Dashboard Layout Integration | 4.1, 4.2, 4.3, 4.4 |

**Output:** Complete admin dashboard with analytics

---
