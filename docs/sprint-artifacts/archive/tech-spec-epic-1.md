# Epic Technical Specification: Foundation & Infrastructure

Date: 2025-11-18
Author: Facundo
Epic ID: 1
Status: Draft

---

## Overview

Epic 1 establishes the foundational infrastructure for the Nixtia e-commerce platform, enabling all subsequent development. This epic delivers a production-ready Next.js 15 application with TypeScript, Tailwind CSS, shadcn/ui components, Supabase backend integration, and automated deployment pipeline via Vercel. The foundation implements the architectural decisions documented in the Architecture Document (ADR-001 through ADR-006) and prepares the environment for implementing the customer store experience (Epic 2), admin business intelligence (Epic 3), and product management (Epic 4).

While this epic delivers no direct user-facing value, it creates the technical substrate required for the complete customer journey (browse → cart → checkout) and admin analytics dashboard. The implementation follows the mobile-first, elder-friendly accessibility requirements (WCAG 2.1 AA) and establishes the purple brand identity (#7C3AED) across the design system.

## Objectives and Scope

**In Scope:**

- Next.js 15 App Router project initialization with TypeScript and Tailwind CSS
- shadcn/ui component library installation and Nixtia purple theme configuration
- Supabase project setup with PostgreSQL database and initial schema (products, orders, admin_users tables)
- Prisma ORM integration with Supabase PostgreSQL including type generation
- Row-Level Security (RLS) policies for public product access and admin-only write operations
- Test data seeding (5-10 artisan corn products with mock data)
- Vercel deployment configuration with automatic deployments on Git push
- Environment variable configuration (.env.example template, Vercel environment setup)
- Development tooling (ESLint, Prettier, Git repository with .gitignore)
- Basic "Hello Nixtia" page to verify successful deployment

**Out of Scope:**

- Customer-facing UI components (ProductCard, CartWidget) - deferred to Epic 2
- Admin authentication implementation - deferred to Epic 3
- Stripe payment integration (configuration only, live processing in Epic 2)
- Product CRUD interfaces - deferred to Epic 4
- Real-time Supabase subscriptions - optional enhancement post-Epic 3
- WhatsApp integration - post-MVP feature
- Email notifications - post-MVP feature

## System Architecture Alignment

This epic implements the **Project Initialization** and foundational components defined in the Architecture Document:

**Framework & Runtime Alignment:**

- Next.js 15.1.x with App Router (`app/` directory structure, not Pages Router per ADR-001)
- React 19.x Server Components by default, Client Components marked with "use client"
- TypeScript 5.3+ for complete type safety across frontend and backend
- Node.js 20.x LTS runtime

**Backend & Database Alignment:**

- Supabase Cloud for PostgreSQL database, authentication, and storage (per ADR-002)
- Prisma 6.x ORM for type-safe database access (per ADR-005)
- Database schema matches Prisma schema defined in Architecture Document (products, orders, order_items, admin_users tables)
- Connection pooling via Supabase Supavisor for scalability

**Styling & Component Alignment:**

- Tailwind CSS 3.4+ with mobile-first responsive design (320px, 768px, 1024px breakpoints)
- shadcn/ui component library with Radix UI primitives (per ADR-003)
- Nixtia purple color palette configured in `tailwind.config.ts` (Purple 600 #7C3AED primary)
- TAN Headline font for headings, Inter for body text (per UX Design Visual Foundation)

**Deployment & Infrastructure Alignment:**

- Vercel Cloud deployment with zero-config Next.js hosting
- Automatic preview deployments on pull requests
- Edge CDN for static assets and optimized images
- Environment-specific configuration (local, staging, production)

**Project Structure Alignment:**

- Follows directory structure defined in Architecture Document:
  - `src/app/` - Next.js App Router pages and API routes
  - `src/components/` - Reusable React components (ui/, store/, admin/, shared/)
  - `src/lib/` - Utilities (supabase/, prisma, validations/)
  - `prisma/` - Database schema and migrations
  - `public/` - Static assets
  - `tests/` - Unit, integration, and E2E tests (Vitest, Playwright)

**Constraints Satisfied:**

- Performance: < 2s page load on mobile 4G (achieved via Next.js SSR, image optimization, CDN)
- Security: HTTPS enforced, environment variables for secrets, Row-Level Security enabled
- Accessibility: WCAG 2.1 AA foundation (shadcn/ui provides accessible primitives)
- Scalability: Supports 100 concurrent users with Supabase connection pooling

## Detailed Design

### Services and Modules

| Module/Service           | Responsibility                                     | Inputs                               | Outputs                            | Owner/Location                                             |
| ------------------------ | -------------------------------------------------- | ------------------------------------ | ---------------------------------- | ---------------------------------------------------------- |
| **Next.js App**          | Application runtime, routing, SSR/SSG              | HTTP requests, environment variables | Rendered pages, API responses      | `src/app/`                                                 |
| **Prisma Client**        | Type-safe database access, query builder           | Database queries, schema definitions | Typed data models, query results   | `src/lib/prisma.ts`                                        |
| **Supabase Client**      | Database connection, auth, real-time subscriptions | API credentials, queries             | Database records, auth sessions    | `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts` |
| **Tailwind Config**      | Design system tokens, theme configuration          | Color palette, spacing, typography   | Compiled CSS utilities             | `tailwind.config.ts`                                       |
| **shadcn/ui Components** | Accessible UI primitives                           | Component props, theme tokens        | Rendered React components          | `src/components/ui/`                                       |
| **Environment Manager**  | Configuration across environments                  | .env files, Vercel variables         | Runtime configuration values       | `.env.local`, `.env.example`                               |
| **Migration System**     | Database schema versioning                         | Prisma schema changes                | SQL migrations, applied changes    | `prisma/migrations/`                                       |
| **Seed Scripts**         | Test data population                               | Product definitions                  | Seeded database records            | `prisma/seed.ts`                                           |
| **Vercel Deployment**    | Build orchestration, hosting, CDN                  | Git commits, build config            | Deployed application, preview URLs | `vercel.json`                                              |
| **Development Server**   | Local development runtime                          | Source code changes                  | Hot-reloaded application           | `npm run dev`                                              |

### Data Models and Contracts

**Prisma Schema** (`prisma/schema.prisma`):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  image_url   String?
  is_active   Boolean  @default(true)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
  order_items OrderItem[]
  @@map("products")
}

model Order {
  id             String        @id @default(uuid())
  order_number   String        @unique
  customer_phone String
  total_amount   Decimal       @db.Decimal(10, 2)
  payment_method PaymentMethod
  payment_status PaymentStatus @default(PENDING)
  order_status   OrderStatus   @default(PENDING)
  created_at     DateTime      @default(now())
  updated_at     DateTime      @updatedAt
  order_items    OrderItem[]
  @@map("orders")
  @@index([customer_phone])
  @@index([created_at])
}

model OrderItem {
  id         String  @id @default(uuid())
  order_id   String
  product_id String
  quantity   Int
  unit_price Decimal @db.Decimal(10, 2)
  subtotal   Decimal @db.Decimal(10, 2)
  order      Order   @relation(fields: [order_id], references: [id], onDelete: Cascade)
  product    Product @relation(fields: [product_id], references: [id])
  @@map("order_items")
  @@index([order_id])
  @@index([product_id])
}

model AdminUser {
  id         String   @id @default(uuid())
  email      String   @unique
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  @@map("admin_users")
}

enum PaymentMethod {
  BANK_TRANSFER
  CASH_ON_DELIVERY
  CARD_ON_DELIVERY
  STRIPE
}

enum PaymentStatus {
  PENDING
  CONFIRMED
  FAILED
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  DELIVERED
  CANCELLED
}
```

**TypeScript Types** (auto-generated via `prisma generate`):

```typescript
import {
  Product,
  Order,
  OrderItem,
  AdminUser,
  PaymentMethod,
  PaymentStatus,
  OrderStatus,
} from '@prisma/client'
```

### APIs and Interfaces

**Environment Variables Interface:**

```typescript
// .env.example template
DATABASE_URL = 'postgresql://user:password@host:port/database'
NEXT_PUBLIC_SUPABASE_URL = 'https://project.supabase.co'
NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJ...'
SUPABASE_SERVICE_ROLE_KEY = 'eyJ...'
STRIPE_SECRET_KEY = 'sk_test_...'
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_...'
```

**Supabase Client Interface:**

```typescript
// src/lib/supabase/client.ts (browser)
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// src/lib/supabase/server.ts (server)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
      },
    }
  )
```

**Prisma Client Singleton:**

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Workflows and Sequencing

**Story 1.1: Project Setup & Core Dependencies**

1. Initialize Next.js 15 with App Router, TypeScript, Tailwind CSS
2. Install shadcn/ui and configure with Nixtia purple theme (#7C3AED)
3. Customize Tailwind config with color palette, typography (TAN Headline, Inter)
4. Configure ESLint and Prettier for code quality
5. Create .gitignore for Next.js and .env files
6. Create .env.example template with all required variables
7. Create basic "Hello Nixtia" page at `src/app/page.tsx`
8. Verify development server runs successfully (`npm run dev`)

**Story 1.2: Supabase Integration & Database Setup**

1. Create Supabase project via dashboard (select region, save credentials)
2. Install Supabase and Prisma dependencies
3. Initialize Prisma (`npx prisma init`)
4. Configure DATABASE_URL in `.env.local` with Supabase PostgreSQL connection string
5. Define Prisma schema (products, orders, order_items, admin_users tables)
6. Create initial migration (`npx prisma migrate dev --name init`)
7. Configure Row-Level Security policies in Supabase:
   - Enable RLS on all tables
   - Public read access to active products
   - Admin-only write access
8. Create seed script with 5-10 mock artisan corn products (masa, tortillas, blue corn)
9. Run seed (`npx prisma db seed`)
10. Create Supabase client utilities (browser and server variants)
11. Verify database connection with test query

**Story 1.3: Deployment Pipeline & Environment Configuration**

1. Link Vercel project to Git repository
2. Configure environment variables in Vercel dashboard (production and preview environments)
3. Create `vercel.json` with build configuration (`prisma generate && next build`)
4. Commit code to main branch, trigger production deployment
5. Verify Vercel build succeeds (check logs for `prisma generate`, `next build`)
6. Verify production deployment at generated URL (nixtia.vercel.app)
7. Create pull request to test preview deployment
8. Verify preview URL works with isolated environment
9. Configure custom domain (optional, DNS records + Vercel domain settings)

## Non-Functional Requirements

### Performance

**Build Performance:**

- Next.js production build completes in < 2 minutes
- Prisma client generation completes in < 10 seconds
- No build warnings or errors allowed

**Development Performance:**

- Dev server startup time < 5 seconds
- Hot module replacement (HMR) < 1 second for file changes
- TypeScript type checking runs in background without blocking

**Page Load (Baseline for Epic 1):**

- "Hello Nixtia" page First Contentful Paint < 1 second
- Time to Interactive < 1.5 seconds
- Lighthouse Performance Score > 90 (on deployed production URL)

**Database Query Performance:**

- Seed script completes in < 5 seconds for 10 products
- Simple SELECT queries return in < 50ms
- Connection pooling configured to support 10 concurrent connections

### Security

**Environment Security:**

- All sensitive credentials stored in environment variables, never committed to Git
- `.env.local` in `.gitignore`
- `.env.example` contains only variable names, no real values
- Vercel environment variables encrypted at rest

**Database Security:**

- Row-Level Security (RLS) enabled on all tables
- Public can only SELECT active products (is_active = true)
- Admin write operations protected (will verify auth in Epic 3)
- PostgreSQL connection uses SSL (enforced by Supabase)
- Connection string includes `sslmode=require` parameter

**Application Security:**

- HTTPS enforced on all Vercel deployments (automatic)
- HSTS headers enabled by Vercel
- No sensitive data logged to console in production
- Prisma queries use parameterized statements (SQL injection prevention)

**Dependency Security:**

- No known vulnerabilities in `npm audit` report (must pass before deployment)
- Dependencies pinned to specific versions in `package.json`
- Regular security updates via Dependabot (configured in GitHub)

### Reliability/Availability

**Uptime Targets:**

- Vercel platform SLA: 99.99% uptime
- Supabase platform SLA: 99.9% uptime (Free tier) / 99.95% (Pro tier)
- Combined target: > 99.9% application availability

**Error Handling:**

- Next.js error boundaries configured for graceful error pages
- Database connection errors caught and logged
- Build failures notify via Vercel dashboard and email

**Backup & Recovery:**

- Supabase automatic daily backups (7-day retention on Free tier)
- Database migrations version-controlled in Git
- Ability to restore from any migration state via `prisma migrate reset`

**Scalability Preparation:**

- Connection pooling via Supabase Supavisor (PgBouncer)
- Vercel auto-scaling (up to 100 concurrent requests on Hobby tier)
- Database indexes on customer_phone and created_at for future query performance

### Observability

**Build Monitoring:**

- Vercel build logs accessible via dashboard and CLI
- Build success/failure notifications via email
- Deployment status visible in Git commit status checks

**Development Logging:**

- Console logs for database queries (Prisma log level: query, error, warn)
- Next.js dev server logs for request handling
- ESLint warnings and errors displayed in terminal

**Production Logging (Minimal in Epic 1):**

- Vercel function logs (serverless function invocations)
- Prisma client logs for database errors
- Next.js automatic error logging

**Metrics Preparation (Infrastructure for Future Epics):**

- Vercel Analytics ready to enable (web vitals, traffic)
- Supabase Dashboard provides query performance insights
- Database connection pool metrics visible in Supabase

**Debugging Capabilities:**

- Prisma Studio for database GUI (`npx prisma studio`)
- Supabase SQL Editor for direct database queries
- Vercel logs for production debugging
- Source maps enabled for production (error stack traces)

## Dependencies and Integrations

**Core Dependencies** (from package.json):

```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@prisma/client": "^6.0.0",
    "@supabase/supabase-js": "^2.45.0",
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "zod": "^3.23.0",
    "tailwindcss": "^3.4.0",
    "@radix-ui/react-slot": "^1.1.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "prisma": "^6.0.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.1.0",
    "prettier": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

**shadcn/ui Components** (installed via CLI):

- Button, Card, Input, Select (basic primitives for future epics)
- Installation command: `npx shadcn@latest add button card input select`

**External Service Integrations:**

| Service      | Purpose                            | Epic 1 Usage                                    | Configuration Required                        |
| ------------ | ---------------------------------- | ----------------------------------------------- | --------------------------------------------- |
| **Supabase** | PostgreSQL database, auth, storage | Database setup, RLS policies, test data         | Project creation, API keys, connection string |
| **Vercel**   | Hosting, deployment, CDN           | Automated deployments, environment management   | Git integration, environment variables        |
| **GitHub**   | Version control, CI/CD             | Source code repository, deployment triggers     | Repository creation, Vercel connection        |
| **Prisma**   | ORM, migrations, type generation   | Schema definition, database migrations          | Schema file, DATABASE_URL                     |
| **Stripe**   | Payment processing                 | **Placeholder only** (keys configured, no code) | Test mode API keys                            |

**Version Constraints:**

- Node.js: 20.x LTS (required by Next.js 15)
- npm: 10.x (matches Node.js 20.x)
- PostgreSQL: 15.x (provided by Supabase)
- Browser targets: Modern browsers (ES2022 support)

**Dependency Manifest Scanning:**

Looking for existing manifests in repository...

```bash
# Check for existing dependencies
ls package.json 2>/dev/null || echo "No package.json found (expected for greenfield project)"
```

## Acceptance Criteria (Authoritative)

**Story 1.1: Project Setup & Core Dependencies**

1. ✅ Next.js 14+ app directory structure with TypeScript is initialized
2. ✅ Tailwind CSS is configured with Nixtia purple color palette (#7c3aed primary)
3. ✅ shadcn/ui is installed and configured with customized theme
4. ✅ ESLint and Prettier are configured with agreed code style
5. ✅ Git repository exists with .gitignore for Next.js
6. ✅ Environment variable template (.env.example) is created
7. ✅ README with setup instructions exists
8. ✅ Development server runs successfully (`npm run dev`)
9. ✅ Basic "Hello Nixtia" page renders at root route (/)
10. ✅ No build errors or TypeScript compilation errors

**Story 1.2: Supabase Integration & Database Setup**

1. ✅ Supabase project is created and credentials are stored in environment variables
2. ✅ Supabase client is initialized in Next.js app
3. ✅ Database connection is verified
4. ✅ `products` table exists with schema: (id, name, description, price, image_url, active, created_at)
5. ✅ `orders` table exists with schema: (id, customer_phone, items_json, total, payment_method, status, created_at)
6. ✅ `admin_users` table exists with schema: (id, email, created_at)
7. ✅ Row-level security (RLS) policy: Products have public read access
8. ✅ Row-level security (RLS) policy: Products have admin-only write access
9. ✅ Row-level security (RLS) policy: Orders have admin-only access
10. ✅ Row-level security (RLS) policy: Admin_users have admin-only access
11. ✅ Test data is seeded (5-10 products with names, prices, descriptions)
12. ✅ Database queries execute successfully (verified via Prisma Client test query)

**Story 1.3: Deployment Pipeline & Environment Configuration**

1. ✅ Vercel project is linked to Git repository
2. ✅ Automatic deployments trigger on push to main branch
3. ✅ Environment variables are configured in Vercel (Supabase keys, Stripe keys, etc.)
4. ✅ Staging environment is accessible via preview URL
5. ✅ Production environment is accessible via custom domain (if configured) or Vercel URL
6. ✅ Build succeeds without errors (`prisma generate && next build`)
7. ✅ Deployed app loads successfully with test data
8. ✅ Deployment time is < 3 minutes from push to live
9. ✅ Environment-specific configurations work (local vs staging vs production)

## Traceability Mapping

| Acceptance Criteria                                 | Spec Section                  | Component/API                                              | Test Idea                                            |
| --------------------------------------------------- | ----------------------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| **Story 1.1**                                       |                               |                                                            |                                                      |
| AC1: Next.js 14+ with TypeScript                    | System Architecture Alignment | `package.json`, `tsconfig.json`                            | Verify Next.js version ≥ 14, TypeScript configured   |
| AC2: Tailwind CSS with purple palette               | Styling & Component Alignment | `tailwind.config.ts`                                       | Check purple-600: #7C3AED in config                  |
| AC3: shadcn/ui installed                            | Design System                 | `components.json`, `src/components/ui/`                    | Verify shadcn components exist                       |
| AC4: ESLint and Prettier                            | Development Tooling           | `.eslintrc.json`, `.prettierrc`                            | Run `npm run lint`, verify no errors                 |
| AC5: Git repository with .gitignore                 | Version Control               | `.gitignore`                                               | Check .env.local, node_modules ignored               |
| AC6: .env.example template                          | Environment Variables         | `.env.example`                                             | Verify all required vars listed (no values)          |
| AC7: README with setup                              | Documentation                 | `README.md`                                                | Read README, follow setup steps manually             |
| AC8: Dev server runs                                | Development Server            | `npm run dev`                                              | Execute command, verify server starts                |
| AC9: "Hello Nixtia" page renders                    | Basic Page                    | `src/app/page.tsx`                                         | Navigate to localhost:3000, see page                 |
| AC10: No build errors                               | Build Process                 | `npm run build`                                            | Execute build, check exit code 0                     |
| **Story 1.2**                                       |                               |                                                            |                                                      |
| AC1: Supabase project created                       | Backend Setup                 | Supabase Dashboard                                         | Login to Supabase, verify project exists             |
| AC2: Supabase client initialized                    | Supabase Client               | `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts` | Import createClient, verify no errors                |
| AC3: Database connection verified                   | Database Connection           | Prisma Client test query                                   | Run `SELECT 1` query, verify success                 |
| AC4-6: Tables exist (products, orders, admin_users) | Data Models                   | `prisma/schema.prisma`                                     | Run `npx prisma db pull`, verify tables              |
| AC7-10: RLS policies configured                     | Security                      | Supabase SQL Editor                                        | Query `pg_policies`, verify policies exist           |
| AC11: Test data seeded                              | Seed Scripts                  | `prisma/seed.ts`                                           | Query products table, verify ≥ 5 rows                |
| AC12: Queries execute successfully                  | Database Access               | Prisma Client                                              | Run `prisma.product.findMany()`, verify results      |
| **Story 1.3**                                       |                               |                                                            |                                                      |
| AC1: Vercel project linked                          | Deployment Setup              | `.vercel/` folder, Vercel dashboard                        | Check .vercel folder exists, dashboard shows project |
| AC2: Automatic deployments                          | CI/CD                         | Git push trigger                                           | Push to main, verify deployment starts               |
| AC3: Environment variables configured               | Environment Management        | Vercel dashboard                                           | Check env vars in Vercel settings                    |
| AC4: Staging environment accessible                 | Preview Deployments           | PR preview URL                                             | Create PR, verify preview URL works                  |
| AC5: Production environment accessible              | Production Deployment         | Vercel production URL                                      | Navigate to URL, verify page loads                   |
| AC6: Build succeeds                                 | Build Process                 | Vercel build logs                                          | Check logs for successful build                      |
| AC7: Deployed app loads with test data              | End-to-End                    | Production URL + database query                            | Navigate to production, verify app works             |
| AC8: Deployment time < 3 minutes                    | Performance                   | Vercel deployment metrics                                  | Measure time from push to deployment complete        |
| AC9: Environment-specific configs work              | Multi-Environment             | .env.local vs Vercel vars                                  | Check DATABASE_URL differs local/production          |

## Risks, Assumptions, Open Questions

**Risks:**

1. **Risk**: Supabase free tier rate limits may impact development (60 requests/minute)
   - **Mitigation**: Upgrade to Pro tier if limits hit, implement connection pooling early
   - **Severity**: Medium (can block development temporarily)

2. **Risk**: Vercel Hobby tier has 100 concurrent requests limit
   - **Mitigation**: Monitor usage, upgrade to Pro if approaching limit during demos
   - **Severity**: Low (MVP traffic unlikely to hit this)

3. **Risk**: TAN Headline font may not be available as web font
   - **Mitigation**: Use fallback to similar font (Unbounded, Space Grotesk), update UX design
   - **Severity**: Low (visual only, doesn't block functionality)

4. **Risk**: Next.js 15 or React 19 have breaking changes from documentation
   - **Mitigation**: Test thoroughly, check migration guides, use stable versions
   - **Severity**: Medium (could delay Story 1.1)

5. **Risk**: Database migration failures on Supabase
   - **Mitigation**: Test migrations locally first, use Prisma migrate deploy for production
   - **Severity**: High (blocks Story 1.2)

**Assumptions:**

1. **Assumption**: Developer has access to Supabase account creation (no enterprise approval needed)
2. **Assumption**: Developer has access to Vercel account with deployment permissions
3. **Assumption**: GitHub repository is already created and accessible
4. **Assumption**: Node.js 20.x LTS is installed on development machine
5. **Assumption**: Developer has basic familiarity with Next.js, TypeScript, Prisma
6. **Assumption**: Stripe test mode API keys can be obtained without business verification
7. **Assumption**: Internet connection is stable for cloud service setup (Supabase, Vercel)

**Open Questions:**

1. **Question**: Should we use Supabase Auth or custom auth implementation for admin users?
   - **Answer Needed By**: Before Epic 3 (Admin Business Intelligence)
   - **Current Decision**: Supabase Auth per Architecture ADR-002

2. **Question**: Do we need staging environment separate from preview deployments?
   - **Answer Needed By**: Before Story 1.3
   - **Current Decision**: Preview deployments sufficient for MVP

3. **Question**: Should seed data be realistic product data or placeholder Lorem Ipsum?
   - **Answer Needed By**: Before Story 1.2 completion
   - **Proposed**: Use realistic artisan corn products (masa, tortillas, blue corn) for demo authenticity

4. **Question**: What is the custom domain for production deployment?
   - **Answer Needed By**: Before Story 1.3 (optional)
   - **Status**: TBD with client, use Vercel subdomain as fallback

5. **Question**: Should we install all shadcn/ui components upfront or add them as needed?
   - **Answer Needed By**: Story 1.1
   - **Proposed**: Install basic primitives (button, card, input, select) in Epic 1, add specific components per epic

## Test Strategy Summary

**Unit Testing:**

- **Scope**: Not critical for Epic 1 (infrastructure setup, no business logic)
- **Framework**: Vitest (configured but no tests required for this epic)
- **Future Coverage**: Utility functions, validation schemas (Zod), custom hooks (Epic 2+)

**Integration Testing:**

- **Scope**: Database connection and Prisma client queries
- **Test Cases**:
  - ✅ Prisma client can connect to Supabase PostgreSQL
  - ✅ Seed script successfully inserts products
  - ✅ Query `prisma.product.findMany()` returns seeded data
  - ✅ Supabase client initializes without errors
- **Framework**: Vitest with Supabase test database (optional)
- **Execution**: Manual testing sufficient for Epic 1

**End-to-End Testing:**

- **Scope**: Deployment verification and basic page load
- **Test Cases**:
  - ✅ Production URL loads "Hello Nixtia" page
  - ✅ Page has purple branding (#7C3AED visible)
  - ✅ No console errors on page load
  - ✅ Preview deployment works for pull requests
  - ✅ Build completes without errors
- **Framework**: Manual testing (Playwright setup deferred to Epic 2)
- **Execution**: Developer verification after each story completion

**Manual Testing Checklist** (Developer verification):

**Story 1.1 Verification:**

- [ ] Run `npm run dev`, server starts without errors
- [ ] Navigate to http://localhost:3000, see "Hello Nixtia" page
- [ ] Inspect page, verify purple color (#7C3AED) is visible
- [ ] Check `package.json` for Next.js ≥ 14, TypeScript, Tailwind
- [ ] Run `npm run lint`, verify no errors
- [ ] Run `npm run build`, verify successful build
- [ ] Check `.env.example` exists with variable names (no values)

**Story 1.2 Verification:**

- [ ] Check Supabase dashboard, verify project exists
- [ ] Verify `products`, `orders`, `admin_users` tables exist in Supabase SQL Editor
- [ ] Run `npx prisma studio`, view seeded products (≥ 5 products)
- [ ] Create test query: `prisma.product.findMany()`, verify results
- [ ] Check RLS policies in Supabase (Table Editor > RLS tab)
- [ ] Verify public can SELECT from products (test with anonymous Supabase client)

**Story 1.3 Verification:**

- [ ] Check Vercel dashboard, verify project is linked
- [ ] Push to main branch, verify deployment starts automatically
- [ ] Check deployment logs for `prisma generate` and `next build` success
- [ ] Navigate to production URL, verify "Hello Nixtia" page loads
- [ ] Check Vercel environment variables, verify all required vars are set
- [ ] Create pull request, verify preview deployment URL is generated
- [ ] Navigate to preview URL, verify it works independently
- [ ] Measure deployment time (should be < 3 minutes)

**Performance Testing:**

- **Lighthouse Audit**: Run on production URL after Story 1.3
  - Target: Performance score > 90
  - Target: First Contentful Paint < 1s
  - Target: Time to Interactive < 1.5s
- **Build Performance**: Measure build time during Vercel deployment
  - Target: < 2 minutes total build time

**Security Testing:**

- **Environment Variables**: Verify no secrets in Git history (`git log --all --full-history -- .env.local`)
- **RLS Policies**: Test public access to products (should succeed)
- **RLS Policies**: Test public write to products (should fail)
- **HTTPS**: Verify production URL uses HTTPS (check certificate)

**Regression Testing:**

- Not applicable for Epic 1 (greenfield project, no existing functionality)

**Test Data:**

- Mock products for seed script (5-10 items):
  - Masa Nixtamalizada (Blue Corn) - $8.50
  - Masa Nixtamalizada (White Corn) - $7.00
  - Tortillas de Maíz Azul (pack of 12) - $5.50
  - Harina para Tortillas - $6.00
  - Tostadas de Maíz - $4.50
