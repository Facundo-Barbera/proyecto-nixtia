# Epic Technical Specification: Foundation & Infrastructure

Date: 2025-11-24
Author: Facundo
Epic ID: 1
Status: Draft

---

## Overview

Epic 1 establishes the foundational infrastructure for the Nixtia e-commerce platform, enabling all subsequent development. This epic encompasses project initialization, database integration with Supabase, and deployment pipeline configuration. While providing no direct user value, it creates the essential technical substrate required for customer-facing store features and admin dashboard capabilities. The epic delivers a functioning Next.js application with TypeScript, Tailwind CSS, shadcn/ui component library, configured Supabase backend with initial schema, and automated deployment to Vercel.

## Objectives and Scope

**In Scope:**
- Next.js 14+ app directory structure with TypeScript, ESLint, Prettier
- Tailwind CSS configured with Nixtia purple branding (#7c3aed)
- shadcn/ui component library installation and theme customization
- Supabase project setup with client integration
- Database schema creation (products, orders, admin_users tables)
- Row-level security (RLS) policies configuration
- Test data seeding (5-10 demo products)
- Vercel deployment pipeline with automatic builds
- Environment configuration for local/staging/production
- Basic "Hello Nixtia" page verification

**Out of Scope:**
- UI component implementation (handled in subsequent epics)
- Business logic for checkout, cart, or admin features
- Payment gateway integration (Stripe configuration deferred)
- Email service integration
- WhatsApp bot integration
- Customer-facing features or admin dashboard widgets

## System Architecture Alignment

This epic aligns with the layered monolith architecture pattern using Next.js App Router. The foundation includes:

**Presentation Layer**: React 19 with Server Components capability via Next.js 16
**Application Layer**: Next.js App Router providing routing and API endpoints
**Data Access Layer**: Prisma ORM for type-safe database queries
**Database Layer**: PostgreSQL hosted on Supabase with RLS policies

**Architectural Constraints Satisfied:**
- ADR-001: Next.js App Router (not Pages Router) enables Server Components
- ADR-003: shadcn/ui provides full component control and WCAG 2.1 AA accessibility
- ADR-005: Prisma ORM ensures type-safe database operations
- ADR-007: Supabase delivers managed PostgreSQL, authentication, and real-time capabilities

The deployment strategy uses Vercel for automatic builds and CDN distribution, satisfying NFR performance requirements (< 2s page loads on mobile 4G).

## Detailed Design

### Services and Modules

| Module | Responsibility | Key Files | Owner/Layer |
|--------|---------------|-----------|-------------|
| **Next.js App Router** | Application routing, page rendering, API endpoints | `src/app/` directory structure | Application Layer |
| **Prisma Client** | Type-safe database queries and migrations | `src/lib/prisma.ts`, `prisma/schema.prisma` | Data Access Layer |
| **Supabase Client** | Authentication and database connection | `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts` | Data Access Layer |
| **shadcn/ui Components** | Pre-built accessible UI primitives | `src/components/ui/` | Presentation Layer |
| **Tailwind Configuration** | Design system tokens (colors, spacing, typography) | `tailwind.config.ts` | Presentation Layer |
| **Environment Config** | Runtime configuration management | `.env.local`, `.env.example` | Infrastructure |
| **Build System** | TypeScript compilation, bundling, optimization | `next.config.ts`, `tsconfig.json` | Build Tooling |

**Service Boundaries:**
- Frontend components communicate with backend via Next.js API routes (not direct database access)
- Prisma serves as the exclusive database client (no raw SQL in app code)
- Supabase client used for auth operations, Prisma for data operations post-Story 1.2

### Data Models and Contracts

**Prisma Schema (`prisma/schema.prisma`):**

```prisma
model products {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  image_url   String?
  active      Boolean  @default(true)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt

  @@index([active, created_at])
}

model orders {
  id             String        @id @default(uuid())
  order_number   String        @unique
  customer_phone String
  items_json     Json
  total          Decimal       @db.Decimal(10, 2)
  payment_method PaymentMethod
  payment_status PaymentStatus @default(PENDING)
  order_status   OrderStatus   @default(PENDING)
  created_at     DateTime      @default(now())
  updated_at     DateTime      @updatedAt

  @@index([created_at])
  @@index([customer_phone])
}

model admin_users {
  id         String   @id
  email      String   @unique
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
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

**Key Design Decisions:**
- Orders use denormalized JSON for line items (simplicity over normalization for MVP)
- Soft-delete pattern for products (`active` flag)
- Decimal precision for currency (10,2)
- UUID primary keys for distributed system readiness

### APIs and Interfaces

**Story 1.1 - No APIs** (Foundation only)

**Story 1.2 - Database Health Check API:**

**Endpoint:** `GET /api/test-db`

**Response (Success):**
```typescript
{
  status: "success",
  message: "Database connection successful",
  timestamp: "2025-11-24T19:00:00Z"
}
```

**Response (Error):**
```typescript
{
  status: "error",
  message: "Database connection failed: [error details]"
}
```

**Implementation:**
```typescript
// src/app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: `Database connection failed: ${error.message}`
    }, { status: 500 });
  }
}
```

**Story 1.3 - Deployment Verification:**
- Health check endpoint accessible at deployed URL
- Environment variables correctly loaded in Vercel

### Workflows and Sequencing

**Story 1.1: Project Setup Sequence**

1. Developer runs `npx create-next-app@latest` with TypeScript, Tailwind, App Router options
2. Install shadcn/ui: `npx shadcn@latest init`
3. Configure Tailwind theme with Nixtia purple (#7c3aed) in `tailwind.config.ts`
4. Set up ESLint and Prettier configurations
5. Create `.env.example` template
6. Initialize Git repository, add `.gitignore`
7. Create basic root page with "Hello Nixtia" message
8. Run `npm run dev`, verify localhost:3000 loads successfully

**Story 1.2: Supabase Integration Sequence**

1. Developer creates Supabase project at app.supabase.com
2. Copy DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY to `.env.local`
3. Install dependencies: `npm install @prisma/client @supabase/supabase-js @supabase/ssr prisma`
4. Initialize Prisma: `npx prisma init`
5. Define schema in `prisma/schema.prisma` (products, orders, admin_users)
6. Run migration: `npx prisma migrate dev --name init`
7. Generate Prisma client: `npx prisma generate`
8. Create `src/lib/prisma.ts` singleton client
9. Create `src/lib/supabase/client.ts` and `server.ts` clients
10. Configure RLS policies in Supabase dashboard
11. Create seed script: `prisma/seed.ts` with 5-10 demo products
12. Run seed: `npm run db:seed`
13. Verify database via Prisma Studio: `npx prisma studio`
14. Create `/api/test-db` endpoint
15. Test connection: visit localhost:3000/api/test-db

**Story 1.3: Deployment Pipeline Sequence**

1. Developer links Git repository to Vercel
2. Configure environment variables in Vercel project settings (DATABASE_URL, etc.)
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Enable automatic deployments on push to main
6. Create staging environment (preview deployments on PRs)
7. Push code to main branch
8. Monitor build logs in Vercel dashboard
9. Verify deployment URL returns 200
10. Test `/api/test-db` endpoint on deployed URL
11. Configure custom domain (optional)
12. Document deployment URL in README

## Non-Functional Requirements

### Performance

**Build Performance:**
- TypeScript compilation completes in < 30 seconds for initial build
- Incremental rebuilds (HMR) complete in < 2 seconds during development
- Production build completes in < 90 seconds

**Development Server:**
- Dev server starts in < 5 seconds (`npm run dev`)
- Hot Module Replacement (HMR) reflects changes in < 500ms
- No memory leaks during extended development sessions (8+ hours)

**Deployment Performance:**
- Vercel build and deployment completes in < 3 minutes from git push
- Static asset optimization (images, fonts) via Next.js Image Optimization
- CDN caching enabled for all static assets

**Database Performance:**
- Database connection established in < 1 second
- Migration execution time < 10 seconds for initial schema
- Prisma Client generation time < 15 seconds

**Performance Targets (from PRD NFR):**
- Page loads: < 2 seconds on mobile 4G (verified via Lighthouse)
- First Contentful Paint (FCP): < 1.5 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds

### Security

**Environment Variable Security:**
- All secrets stored in `.env.local` (gitignored)
- `.env.example` contains placeholder values only (no real credentials)
- Vercel environment variables encrypted at rest
- No hardcoded API keys or database credentials in codebase

**Database Security (Story 1.2):**
- PostgreSQL connection over SSL (enforced by Supabase)
- Row-Level Security (RLS) policies configured:
  - **products**: Public read, admin write only
  - **orders**: Admin-only access
  - **admin_users**: Admin-only access
- Database credentials rotate-able via Supabase dashboard
- Connection pooling limits concurrent connections

**Dependency Security:**
- All dependencies installed from npm registry
- `package-lock.json` committed for reproducible builds
- Automated dependency scanning via GitHub Dependabot (optional)
- No known high/critical vulnerabilities in dependencies (verified via `npm audit`)

**Build Security:**
- TypeScript strict mode enabled (`strict: true` in tsconfig.json)
- ESLint security rules enabled
- No eval() or dangerous innerHTML usage
- Content Security Policy headers (configured in next.config.ts for future)

**Authentication Preparation (Story 1.2):**
- Supabase Auth SDK installed and configured
- Session management via secure httpOnly cookies
- CSRF protection enabled by default in Next.js

### Reliability/Availability

**Development Environment:**
- Local development server recovers automatically from crashes
- Hot reload gracefully handles syntax errors without full restart
- Prisma Client regenerates automatically on schema changes (via `postinstall` script)

**Database Reliability:**
- Supabase provides 99.9% uptime SLA
- Automated daily backups (Supabase managed)
- Point-in-time recovery available
- Connection retry logic in Prisma client (default: 3 retries)

**Deployment Reliability:**
- Vercel automatic rollback on deployment failure
- Zero-downtime deployments via atomic deployment model
- Health check endpoint (`/api/test-db`) for monitoring
- Build failure notifications via Vercel dashboard

**Failure Modes:**
- Database connection failure: Return 500 error with message, log to console
- Build failure: Block deployment, preserve previous version
- Migration failure: Halt deployment, alert developer via Vercel logs

**Recovery Targets:**
- RTO (Recovery Time Objective): < 5 minutes for deployment rollback
- RPO (Recovery Point Objective): < 24 hours for database (Supabase backups)

### Observability

**Development Logging:**
- Next.js dev server logs all requests to console
- TypeScript compiler errors displayed inline in browser
- Prisma query logging enabled in development (`log: ['query', 'error']`)
- React DevTools available for component inspection

**Build Observability:**
- Vercel build logs accessible via dashboard
- Build duration metrics tracked automatically
- Deployment status notifications (email, Slack integration optional)
- Bundle size analysis via Next.js built-in analyzer

**Error Tracking (Foundation):**
- Console.error() for all caught exceptions
- Next.js error boundaries for React errors
- Database connection errors logged with stack traces
- Future: Integration with Sentry or similar APM tool

**Metrics Collection (Prepared):**
- Next.js built-in analytics ready for activation
- Web Vitals tracking available (FCP, LCP, CLS, FID, TTFB)
- Vercel Analytics integration ready (optional)

**Database Observability:**
- Prisma Studio for visual database inspection (`npx prisma studio`)
- Supabase dashboard for real-time query monitoring
- Migration history tracked in `prisma/migrations/` directory

**Health Checks:**
- `/api/test-db` endpoint for database connectivity monitoring
- Future: `/api/health` endpoint with comprehensive system status

## Dependencies and Integrations

**Production Dependencies:**

| Package | Version | Purpose | Critical |
|---------|---------|---------|----------|
| `next` | 16.0.3 | Core framework | Yes |
| `react` | 19.2.0 | UI library | Yes |
| `react-dom` | 19.2.0 | React renderer | Yes |
| `@prisma/client` | 6.19.0 | Database ORM client | Yes |
| `prisma` | 6.19.0 | Database migrations and schema | Yes |
| `@supabase/supabase-js` | 2.84.0 | Supabase client SDK | Yes |
| `@supabase/ssr` | 0.7.0 | Supabase SSR support | Yes |
| `tailwindcss` | 4.x | CSS framework | Yes |
| `class-variance-authority` | 0.7.1 | Component variant management | No |
| `clsx` | 2.1.1 | Conditional classNames utility | No |
| `tailwind-merge` | 3.4.0 | Tailwind class merging | No |
| `lucide-react` | 0.554.0 | Icon library | No |
| `react-hook-form` | 7.66.1 | Form state management | No |
| `zod` | 4.1.13 | Schema validation | No |
| `@hookform/resolvers` | 5.2.2 | Zod + React Hook Form integration | No |
| `react-hot-toast` | 2.6.0 | Toast notifications | No |
| `react-phone-number-input` | 3.4.14 | Phone input component | No |
| `date-fns` | 4.1.0 | Date utilities | No |

**Development Dependencies:**

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | 5.x | Type safety |
| `@types/node` | 20.x | Node.js types |
| `@types/react` | 19.x | React types |
| `@types/react-dom` | 19.x | React DOM types |
| `eslint` | 9.x | Code linting |
| `eslint-config-next` | 16.0.3 | Next.js ESLint rules |
| `eslint-config-prettier` | 10.1.8 | ESLint + Prettier integration |
| `prettier` | 3.6.2 | Code formatting |
| `vitest` | 4.0.13 | Unit testing framework |
| `@playwright/test` | 1.49.1 | E2E testing framework |
| `jsdom` | 27.2.0 | DOM testing environment |
| `tsx` | 4.20.6 | TypeScript execution (for seed scripts) |

**External Service Dependencies:**

| Service | Purpose | Version/Plan | Required |
|---------|---------|--------------|----------|
| **Supabase** | PostgreSQL database + Auth | Free tier | Yes |
| **Vercel** | Hosting and deployment | Hobby/Free tier | Yes (for Story 1.3) |
| **Node.js** | Runtime environment | 20.x LTS | Yes |
| **npm** | Package manager | 10.x+ | Yes |
| **Git** | Version control | 2.x+ | Yes |

**Integration Points:**

1. **Supabase Integration:**
   - Connection: PostgreSQL via DATABASE_URL
   - Authentication: Supabase Auth SDK (prepared, not used in Epic 1)
   - Storage: Supabase Storage (prepared for future image uploads)

2. **Vercel Integration:**
   - Git repository sync (GitHub/GitLab/Bitbucket)
   - Automatic deployments on push to main
   - Environment variable management
   - Build logs and analytics

3. **Prisma Integration:**
   - Database schema management
   - Migration generation and execution
   - Type-safe query client generation

**Version Constraints:**
- Node.js >= 20.0.0 (LTS)
- npm >= 10.0.0
- PostgreSQL >= 15.0 (via Supabase)

## Acceptance Criteria (Authoritative)

**Story 1.1: Project Setup & Core Dependencies**

1. **AC1.1.1** - Next.js 14+ app directory structure exists with TypeScript support
2. **AC1.1.2** - Tailwind CSS configured with Nixtia purple primary color (#7c3aed)
3. **AC1.1.3** - shadcn/ui installed and components/ui/ directory exists
4. **AC1.1.4** - ESLint and Prettier configured with agreed code style
5. **AC1.1.5** - Git repository initialized with .gitignore for Next.js
6. **AC1.1.6** - .env.example file contains template environment variables
7. **AC1.1.7** - README.md includes setup instructions
8. **AC1.1.8** - `npm run dev` starts development server successfully
9. **AC1.1.9** - Basic "Hello Nixtia" page renders at root route (localhost:3000)
10. **AC1.1.10** - No TypeScript compilation errors on build

**Story 1.2: Supabase Integration & Database Setup**

1. **AC1.2.1** - Supabase project created and credentials stored in .env.local
2. **AC1.2.2** - Supabase client initialized in src/lib/supabase/
3. **AC1.2.3** - Database connection verified (test query executes successfully)
4. **AC1.2.4** - `products` table created with all required fields (id, name, description, price, image_url, active, created_at)
5. **AC1.2.5** - `orders` table created with all required fields (id, order_number, customer_phone, items_json, total, payment_method, payment_status, order_status, created_at)
6. **AC1.2.6** - `admin_users` table created with required fields (id, email, created_at)
7. **AC1.2.7** - RLS policy: Products allow public read access
8. **AC1.2.8** - RLS policy: Products allow admin-only write access
9. **AC1.2.9** - RLS policy: Orders allow admin-only access
10. **AC1.2.10** - RLS policy: Admin_users allow admin-only access
11. **AC1.2.11** - Test data seeded: 5-10 products with names, prices, descriptions
12. **AC1.2.12** - Database queries execute successfully (verified via /api/test-db endpoint)
13. **AC1.2.13** - Prisma schema matches database schema
14. **AC1.2.14** - `npx prisma studio` opens and displays seeded data

**Story 1.3: Deployment Pipeline & Environment Configuration**

1. **AC1.3.1** - Vercel project linked to Git repository
2. **AC1.3.2** - Automatic deployments enabled on push to main branch
3. **AC1.3.3** - Environment variables configured in Vercel (DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY)
4. **AC1.3.4** - Staging environment accessible via preview URL
5. **AC1.3.5** - Production environment accessible via Vercel URL or custom domain
6. **AC1.3.6** - Build succeeds without errors in Vercel logs
7. **AC1.3.7** - Deployed app loads successfully (returns HTTP 200)
8. **AC1.3.8** - Test data visible in deployed environment
9. **AC1.3.9** - Deployment time < 3 minutes from push to live
10. **AC1.3.10** - Environment-specific configurations work (DATABASE_URL resolves correctly)
11. **AC1.3.11** - /api/test-db endpoint returns success on deployed URL
12. **AC1.3.12** - No console errors in deployed application

## Traceability Mapping

| Acceptance Criteria | Spec Section | Component/API | Test Idea |
|---------------------|--------------|---------------|-----------|
| AC1.1.1 | Services & Modules → Next.js App Router | `src/app/` directory | Verify app/ directory exists with page.tsx |
| AC1.1.2 | Services & Modules → Tailwind Config | `tailwind.config.ts` | Check purple-600 = #7c3aed in config |
| AC1.1.3 | Services & Modules → shadcn/ui | `src/components/ui/` | Verify ui/ directory contains button.tsx |
| AC1.1.4 | Workflows → Project Setup | `.eslintrc.json`, `.prettierrc` | Run `npm run lint` without errors |
| AC1.1.5 | Workflows → Project Setup | `.git/`, `.gitignore` | Verify .gitignore excludes node_modules |
| AC1.1.6 | Services & Modules → Environment Config | `.env.example` | Check file contains DATABASE_URL template |
| AC1.1.7 | Workflows → Project Setup | `README.md` | Verify README has setup instructions |
| AC1.1.8 | Workflows → Project Setup | Dev server | Run `npm run dev`, check localhost:3000 |
| AC1.1.9 | APIs & Interfaces | `src/app/page.tsx` | Visit localhost:3000, see "Hello Nixtia" |
| AC1.1.10 | NFR → Observability | Build output | Run `npm run build`, check exit code 0 |
| AC1.2.1 | Dependencies → Supabase | `.env.local` | Check SUPABASE_URL and keys exist |
| AC1.2.2 | Services & Modules → Supabase Client | `src/lib/supabase/client.ts` | Import and verify createClient() exists |
| AC1.2.3 | APIs & Interfaces → /api/test-db | `/api/test-db` | GET request returns status: success |
| AC1.2.4 | Data Models → products schema | Prisma schema | Query products table, verify columns |
| AC1.2.5 | Data Models → orders schema | Prisma schema | Query orders table, verify columns |
| AC1.2.6 | Data Models → admin_users schema | Prisma schema | Query admin_users table, verify columns |
| AC1.2.7 | NFR → Security → RLS | Supabase RLS policies | Unauthenticated SELECT on products succeeds |
| AC1.2.8 | NFR → Security → RLS | Supabase RLS policies | Unauthenticated INSERT on products fails |
| AC1.2.9 | NFR → Security → RLS | Supabase RLS policies | Unauthenticated SELECT on orders fails |
| AC1.2.10 | NFR → Security → RLS | Supabase RLS policies | Unauthenticated SELECT on admin_users fails |
| AC1.2.11 | Workflows → Supabase Integration | `prisma/seed.ts` | Query products, verify >= 5 rows |
| AC1.2.12 | APIs & Interfaces → /api/test-db | `/api/test-db` | GET request returns 200 status |
| AC1.2.13 | Data Models → Prisma Schema | `prisma/schema.prisma` | Verify models match database tables |
| AC1.2.14 | NFR → Observability → Prisma Studio | Prisma Studio | Open studio, view products table |
| AC1.3.1 | Dependencies → Vercel | Vercel dashboard | Verify project exists in dashboard |
| AC1.3.2 | Workflows → Deployment | Vercel settings | Push to main, verify auto-deploy triggers |
| AC1.3.3 | NFR → Security → Env Vars | Vercel env vars | Check env vars exist in project settings |
| AC1.3.4 | Workflows → Deployment | Vercel preview | Create PR, verify preview URL |
| AC1.3.5 | Workflows → Deployment | Vercel production | Visit production URL, verify 200 |
| AC1.3.6 | NFR → Reliability → Build | Vercel build logs | Check logs for "Build successful" |
| AC1.3.7 | Workflows → Deployment | Production URL | HTTP GET returns 200 status |
| AC1.3.8 | Workflows → Deployment | Production /api/test-db | Query products via API in production |
| AC1.3.9 | NFR → Performance → Deployment | Vercel deployment time | Measure push to deploy time < 3min |
| AC1.3.10 | Dependencies → Environment Vars | Production runtime | Verify DATABASE_URL connects to Supabase |
| AC1.3.11 | APIs & Interfaces → /api/test-db | Production API | GET production-url/api/test-db → success |
| AC1.3.12 | NFR → Observability → Frontend | Browser console | Open DevTools, verify no errors |

## Risks, Assumptions, Open Questions

**RISKS:**

1. **Risk**: Supabase free tier rate limits may be exceeded during development
   - **Likelihood**: Low
   - **Impact**: Medium
   - **Mitigation**: Monitor Supabase dashboard usage, upgrade to Pro if needed ($25/month)

2. **Risk**: Vercel build timeout on slow migrations
   - **Likelihood**: Low
   - **Impact**: Low
   - **Mitigation**: Run migrations separately via Prisma CLI before deployment

3. **Risk**: TypeScript compilation errors from Next.js 16 + React 19 compatibility
   - **Likelihood**: Medium
   - **Impact**: Medium
   - **Mitigation**: Pin exact versions in package.json, follow Next.js 16 migration guide

4. **Risk**: Prisma schema changes may require database reset during development
   - **Likelihood**: High
   - **Impact**: Low (dev only)
   - **Mitigation**: Use `prisma migrate dev` for additive changes, reset when necessary

5. **Risk**: shadcn/ui theming may conflict with Tailwind 4 syntax changes
   - **Likelihood**: Low
   - **Impact**: Low
   - **Mitigation**: Use shadcn/ui CLI to ensure compatible versions

**ASSUMPTIONS:**

1. **Assumption**: Developer has access to GitHub account for Vercel integration
   - **Verification**: Confirm GitHub access before Story 1.3

2. **Assumption**: Supabase free tier (500MB database, 2GB bandwidth) sufficient for MVP
   - **Verification**: Monitor usage during Epic 2 implementation

3. **Assumption**: Node.js 20.x LTS is installed on developer machine
   - **Verification**: Run `node --version` before starting

4. **Assumption**: Database schema will not change significantly after Epic 1
   - **Verification**: Review PRD requirements with stakeholder before finalizing schema

5. **Assumption**: Custom domain setup for Story 1.3 is optional (can use Vercel subdomain)
   - **Verification**: Confirm with client whether custom domain is required for demo

**OPEN QUESTIONS:**

1. **Question**: Should we use Supabase Auth or NextAuth.js for admin authentication in Epic 3?
   - **Owner**: Architecture decision
   - **Blocker**: No (Epic 3 is future)
   - **Decision needed by**: Before Epic 3 planning

2. **Question**: Do we need separate Supabase projects for staging and production?
   - **Owner**: DevOps decision
   - **Blocker**: No (can share for MVP)
   - **Decision needed by**: Before Story 1.3

3. **Question**: Should product images be stored in Supabase Storage or external CDN (Cloudinary)?
   - **Owner**: Architecture decision
   - **Blocker**: No (Epic 4 feature)
   - **Decision needed by**: Before Epic 4 planning

4. **Question**: What is the backup and disaster recovery strategy for production database?
   - **Owner**: Operations decision
   - **Blocker**: No (Supabase handles backups)
   - **Decision needed by**: Before production launch

5. **Question**: Should we implement feature flags for gradual rollout of new features?
   - **Owner**: Product decision
   - **Blocker**: No
   - **Decision needed by**: Post-MVP

## Test Strategy Summary

**Unit Testing Approach:**

For Epic 1 (infrastructure), unit tests are minimal as the focus is integration. Future epics will add unit tests for:
- Utility functions (e.g., price formatting, date handling)
- React hooks (custom hooks for cart, checkout)
- Validation schemas (Zod schemas for forms)

**Framework**: Vitest (configured, no tests in Epic 1)

**E2E Testing Approach:**

Epic 1 E2E tests focus on smoke testing the infrastructure:

**Test Suite 1: Development Environment Smoke Test**
- **Test 1.1**: Run `npm run dev`, verify server starts on port 3000
- **Test 1.2**: Visit localhost:3000, verify page loads with 200 status
- **Test 1.3**: Verify "Hello Nixtia" text appears on page
- **Test 1.4**: Check browser console for errors (should be 0)

**Test Suite 2: Database Integration Test**
- **Test 2.1**: Visit `/api/test-db`, verify JSON response `{ status: "success" }`
- **Test 2.2**: Run `npx prisma studio`, verify GUI opens without errors
- **Test 2.3**: Query products table, verify >= 5 seeded products exist
- **Test 2.4**: Verify all required columns exist in products, orders, admin_users tables

**Test Suite 3: Build and Deployment Test (Story 1.3)**
- **Test 3.1**: Run `npm run build`, verify exit code 0
- **Test 3.2**: Run `npm run start`, verify production server starts
- **Test 3.3**: Push to main branch, verify Vercel build triggers automatically
- **Test 3.4**: Visit deployed URL, verify page loads (HTTP 200)
- **Test 3.5**: Visit deployed `/api/test-db`, verify database connection works in production
- **Test 3.6**: Measure deployment time from push to live (target: < 3 minutes)

**Framework**: Playwright (configured via `@playwright/test` package)

**Manual Testing Checklist:**
- [ ] Verify Tailwind purple color (#7c3aed) applied to test element
- [ ] Verify shadcn/ui button component renders correctly
- [ ] Verify environment variables load correctly in all environments (local/staging/production)
- [ ] Verify RLS policies prevent unauthorized access (test with unauthenticated Supabase client)
- [ ] Verify Vercel preview deployments work for feature branches

**Acceptance Testing:**
Each acceptance criterion from the epic stories serves as a test case. Developer will verify all ACs before marking story as complete.

**Performance Testing:**
- Lighthouse audit on deployed site (target: Performance score > 90)
- Measure First Contentful Paint (FCP) < 1.5s
- Measure Largest Contentful Paint (LCP) < 2.5s
- Verify build time < 90 seconds
- Verify deployment time < 3 minutes

**Security Testing:**
- Run `npm audit` to check for vulnerable dependencies
- Verify `.env.local` is gitignored (attempt to git add .env.local, should fail)
- Verify RLS policies block unauthorized database access
- Verify no hardcoded credentials in source code (grep for "password", "api_key", etc.)

## Post-Review Follow-ups

Action items identified during code review for Story 1.2 (2025-11-24):

**BLOCKERS (Must resolve before marking story done):**
- **[High]** Apply RLS policies via Supabase SQL Editor - ACs #7-10 not met. SQL prepared at [prisma/rls-policies.sql](../../prisma/rls-policies.sql) but not applied to Supabase. This is a critical security gap preventing story completion.
- **[High]** Test RLS enforcement after policies applied - Verify: (1) Anonymous client can SELECT active products, (2) Anonymous client CANNOT INSERT/UPDATE products, (3) Anonymous client CANNOT SELECT from orders, (4) Service role operations succeed.

**Technical Debt (Should address before Epic 2):**
- **[Med]** Add `prisma generate` to build script - Change [package.json:7](../../package.json:7) from `"build": "next build"` to `"build": "prisma generate && next build"` to satisfy Architecture constraint (Tech-Spec line 135, ADR-005).
- **[Med]** Update .env.local with valid SUPABASE_SERVICE_ROLE_KEY - Obtain from Supabase Dashboard → Settings → API. Currently invalid, causing admin user creation failure in seed script.

**Documentation Enhancement:**
- **[Low]** Document OrderItem model choice - Story 1.2 intentionally deviated from Tech-Spec (lines 112-193) by using normalized OrderItem model instead of denormalized items_json. This architectural improvement provides type safety and referential integrity. Document rationale in this Tech-Spec.

**Review Commendations:**
- ✅ Zero false completion claims (Task 5 honestly marked incomplete)
- ✅ OrderItem model demonstrates superior engineering judgment
- ✅ Comprehensive Dev Notes serve as model for future stories
