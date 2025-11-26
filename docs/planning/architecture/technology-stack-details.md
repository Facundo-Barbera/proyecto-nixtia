# Technology Stack Details

## Core Technologies

**Frontend Framework:**
- Next.js 16.0.3 (App Router, React Server Components)
- React 19.2.0 (concurrent features enabled)
- TypeScript 5.x (strict mode enabled)

**Styling & UI:**
- Tailwind CSS 4.x (utility-first, JIT compiler)
- shadcn/ui (New York style, Radix UI primitives)
- Nixtia brand theme (purple palette, custom fonts)
- CSS Variables for theming (#4b4877, #6b4179, #241140, #ffbb1c)

**Data & Backend:**
- Supabase (PostgreSQL 15+, PostgREST API, Row Level Security)
- @supabase/supabase-js 2.84.0 (browser + server clients)
- @supabase/ssr 0.7.0 (Next.js SSR integration)

**State Management:**
- React Context API (cart state, auth state)
- Server Components (server-side data fetching)
- URL state (search params, pagination)

**Forms & Validation:**
- react-hook-form 7.66.1 (performant form handling)
- zod 4.1.13 (runtime type validation)
- react-phone-number-input 3.4.14 (phone formatting)

**Data Visualization:**
- Recharts 3.5.0 (React-native charts, composable)

**Utilities:**
- date-fns 4.1.0 (date manipulation, formatting)
- clsx + tailwind-merge (conditional className)
- lucide-react 0.554.0 (icon library)

**Testing:**
- Vitest 4.0.13 (unit tests, fast)
- Playwright 1.49.1 (E2E tests, cross-browser)
- @testing-library/react (component testing)

**Development Tools:**
- ESLint 9.x + Prettier 3.6.2 (code quality)
- TypeScript compiler (type checking)
- Docker + Docker Compose (containerization)

## Integration Points

**Supabase Integration:**
- **Database:** PostgreSQL via PostgREST API
  - Connection: HTTPS REST API (no direct SQL connection from browser)
  - Authentication: Secret key (server), publishable key (client)
  - RLS enforcement: All queries respect Row Level Security
- **Auth:** Email/password for admin users
  - Session management: HTTP-only cookies via @supabase/ssr
  - Token refresh: Automatic via Supabase client
- **Storage:** Product images, user uploads
  - CDN: Built-in Supabase CDN
  - Access control: Public bucket for products, private for admin uploads
- **Real-time:** Deferred to post-MVP
  - Future: Order status updates, dashboard live metrics

**Stripe Integration:**
- **Mode:** Test mode for demo, production mode post-launch
- **Implementation:** Stripe Checkout (hosted payment page)
- **Webhooks:** Route handler at `/api/webhooks/stripe` (future)
- **Payment methods:** Bank transfer info display, cash/card on delivery selection, Stripe for card payments

**External Services (Future):**
- WhatsApp Business API (order notifications)
- Email service (order confirmations, optional)
- SMS verification (phone number validation)
