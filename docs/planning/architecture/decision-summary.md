# Decision Summary

| Category | Decision | Version | Affects FR Categories | Rationale |
| -------- | -------- | ------- | --------------------- | --------- |
| **Framework** | Next.js (App Router) | 16.0.3 | All | Modern React framework with SSR, app router, server actions |
| **Language** | TypeScript | 5.x | All | Type safety, better DX, catches errors at compile time |
| **Styling** | Tailwind CSS | 4.x | All | Utility-first, fast iteration, matches UX spec |
| **Component Library** | shadcn/ui (New York) | Latest | All UI | Copy-paste components, Radix primitives, accessible |
| **Database** | Supabase (PostgreSQL) | Latest | All data operations | Mandated by investment, RLS security, real-time capable |
| **Data Layer** | Supabase Client Only | @supabase/supabase-js 2.84.0 | All data operations | No Prisma conflicts, respects RLS, simpler architecture |
| **Authentication** | Supabase Auth | Built-in | User Account & Access (FR6-10) | Email/password for admin, secure sessions, RLS integration |
| **State Management** | React Context | Built-in | Shopping Cart (FR21-26) | Simple, zero dependencies, sufficient for cart state |
| **Form Handling** | react-hook-form + zod | 7.66.1 + 4.1.13 | Checkout (FR27-34), Admin forms | Type-safe validation, already installed |
| **Form Submission** | Server Actions | Next.js built-in | All mutations | Simpler than route handlers, type-safe, less boilerplate |
| **API Routes** | Route Handlers | Next.js built-in | Payment webhooks only | For external calls (Stripe webhooks) |
| **Image Storage** | Supabase Storage | Built-in | Product Catalog (FR11-20) | Integrated with Supabase, CDN built-in, simple uploads |
| **Charts** | Recharts | 3.5.0 | Analytics & Dashboard (FR44-54) | React-native, simple API, good with shadcn/ui |
| **Phone Input** | react-phone-number-input | 3.4.14 | Checkout (FR28, FR33) | Format validation only (MVP), code verification post-MVP |
| **Date/Time** | date-fns | 4.1.0 | All timestamps | Already installed, store UTC, display local |
| **Error Handling** | Error boundaries + Toast | Built-in + react-hot-toast 2.6.0 | All | Next.js error.tsx + toast notifications |
| **Payments** | Stripe | Latest | Payment Processing (FR35-39) | Test mode for demo, production-ready |
| **Real-time** | Deferred to post-MVP | N/A | Future enhancement | Not critical for MVP |
| **Environment Config** | .env files | N/A | All | .env.local for secrets, .env.example in git |
| **Logging** | Server console only | N/A | All | No browser console logs in production |
| **Email** | Deferred (optional) | N/A | Future: order confirmations | Non-invasive, only if user provides email |
| **Analytics** | None | N/A | N/A | Not needed for MVP |
| **Testing** | Vitest + Playwright | 4.0.13 + 1.49.1 | All | Unit tests (Vitest), E2E tests (Playwright) |
| **Deployment** | Docker containers | N/A | All | Docker Compose for local dev, Docker containers for production deployment |
