# Epic 1: Foundation & Infrastructure

**Goal:** Establish project foundation enabling all subsequent development

**User Value:** None directly (Foundation exception) - Enables all future features

**FRs Covered:** Infrastructure requirements for all subsequent epics

**Stories:** 3 stories

---

## Story 1.1: Project Setup & Core Dependencies

As a **developer**,
I want the project repository initialized with all core dependencies and build configuration,
So that I can begin implementing features on a solid foundation.

**Acceptance Criteria:**

**Given** a new greenfield project
**When** the repository is initialized
**Then** the following are configured:

- Next.js 14+ app directory structure with TypeScript
- Tailwind CSS with Nixtia purple color palette configured (#7c3aed primary)
- shadcn/ui installed and configured with customized theme
- ESLint and Prettier with agreed code style
- Git repository with .gitignore for Next.js
- Environment variable template (.env.example)
- README with setup instructions

**And** the development server runs successfully (`npm run dev`)

**And** a basic "Hello Nixtia" page renders at root route

**Prerequisites:** None

**Technical Notes:**

- Next.js for SSR/SSG (SEO requirements from PRD)
- Tailwind configured with purple-600 (#7c3aed), slate colors (UX Design pg 3-4)
- shadcn/ui for accessible component foundation (UX Design pg 2)
- TypeScript for type safety
- Base spacing system: 4px (UX Design pg 4)

---

## Story 1.2: Supabase Integration & Database Setup

As a **developer**,
I want Supabase configured with initial database schema,
So that I can store products, orders, and user data securely.

**Acceptance Criteria:**

**Given** the project foundation from Story 1.1
**When** Supabase is integrated
**Then** the following are configured:

- Supabase project created and credentials stored in environment variables
- Supabase client initialized in Next.js app
- Database connection verified
- Initial tables created:
  - `products` (id, name, description, price, image_url, active, created_at)
  - `orders` (id, customer_phone, items_json, total, payment_method, status, created_at)
  - `admin_users` (id, email, created_at)
- Row-level security (RLS) policies configured:
  - Products: Public read access, admin-only write
  - Orders: Admin-only access
  - Admin_users: Admin-only access

**And** test data seeded (5-10 products with names, prices, descriptions)

**And** database queries execute successfully

**Prerequisites:** Story 1.1

**Technical Notes:**

- Supabase for backend (Postgres + Auth + Real-time from PRD)
- Products table supports FR11-FR20
- Orders table supports FR40-FR43
- Mock product data for demo (artisan corn products: masa, tortillas, blue corn)
- RLS preparation for future multi-tenancy (PRD growth features)

---

## Story 1.3: Deployment Pipeline & Environment Configuration

As a **developer**,
I want deployment pipeline configured for staging and production environments,
So that I can deploy updates confidently and enable client demo access.

**Acceptance Criteria:**

**Given** the project with Supabase integration from Story 1.2
**When** deployment is configured
**Then** the following work:

- Vercel project linked to Git repository
- Automatic deployments on push to main branch
- Environment variables configured in Vercel (Supabase keys, etc.)
- Staging environment accessible via preview URL
- Production environment accessible via custom domain (if configured)
- Build succeeds without errors
- Deployed app loads successfully with test data

**And** deployment time is < 3 minutes from push to live

**And** environment-specific configurations work (local vs staging vs production)

**Prerequisites:** Story 1.2

**E2E Testing Requirements:**

- **Smoke test:** Verify deployment URL is accessible and returns 200
- **Health check test:** Verify Supabase connection works in deployed environment
- **Build verification:** Ensure no build errors or warnings in CI/CD pipeline

**Technical Notes:**

- Vercel for hosting (Next.js optimization, CDN, auto-scaling from NFR)
- Automatic deployments reduce manual effort
- Staging for client demos before production release
- Custom domain setup for professional credibility (PRD: operational liberation)
- Environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

---
