# Test Levels Strategy

Based on architecture (web app, Supabase backend, Stripe payments):

## Recommended Test Distribution

| Level | Percentage | Rationale |
|-------|------------|-----------|
| Unit | 50% | Business logic (price calculations, validation), utilities |
| Integration/API | 30% | Supabase queries, Server Actions, RLS policies |
| E2E | 20% | Critical user journeys (checkout, admin dashboard) |

## Test Level Mapping by Component

| Component | Primary Level | Secondary Level | Justification |
|-----------|---------------|-----------------|---------------|
| Price calculations | Unit (Vitest) | - | Pure functions, fast feedback |
| Form validation (Zod) | Unit (Vitest) | - | Schema validation is pure |
| Cart state (Context) | Unit (Vitest) | Component (RTL) | State logic + UI interaction |
| Supabase queries | Integration (Playwright API) | - | Database interaction requires real connection |
| RLS policies | Integration (Playwright API) | - | Must validate actual PostgreSQL RLS |
| Server Actions | Integration (Playwright API) | - | Server-side mutations |
| Product catalog page | Component (RTL) | E2E (Playwright) | UI rendering + critical journey |
| Checkout flow | E2E (Playwright) | - | Multi-step critical path |
| Admin dashboard | E2E (Playwright) | - | Auth-gated, data aggregation |
| Landing page | E2E (Playwright) | - | Visual/marketing validation |

## Technology Stack Alignment

| Concern | Tool | Reason |
|---------|------|--------|
| Unit tests | Vitest | Fast, ESM native, Jest-compatible |
| Component tests | Testing Library + Vitest | React ecosystem standard |
| API/Integration | Playwright `request` | Same toolchain as E2E |
| E2E tests | Playwright | Cross-browser, auto-wait, tracing |
| Performance | k6 (load), Lighthouse (Core Web Vitals) | k6 for backend, Lighthouse for frontend |
| Accessibility | axe-core via @axe-core/playwright | WCAG 2.1 AA compliance |
| Visual regression | Playwright snapshots (optional) | Chromium pixel comparison |

---
