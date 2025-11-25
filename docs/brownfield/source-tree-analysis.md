# Source Tree Analysis - Nixtia

**Generated:** 2025-11-24
**Project:** proyecto-nixtia

## Overview

Nixtia follows Next.js 16 App Router conventions with a monolithic full-stack architecture. The codebase is organized by feature domain (landing, store, admin) within the App Router structure.

---

## Complete Directory Tree

```
proyecto-nixtia/
├── .bmad/                          # BMAD workflow system (project methodology)
│   ├── bmm/                        # BMad Method modules
│   │   ├── agents/                 # AI agent personas (analyst, architect, pm, etc.)
│   │   ├── workflows/              # Workflow definitions (YAML + instructions)
│   │   └── config.yaml             # Project configuration
│   └── core/                       # BMAD core system
│       ├── tasks/                  # Reusable workflow tasks
│       └── workflows/              # Core workflows (brainstorming, party-mode, etc.)
│
├── .claude/                        # Claude Code configuration
│
├── .git/                           # Git repository
│
├── .next/                          # Next.js build output (gitignored)
│   ├── cache/                      # Build cache
│   └── types/                      # Auto-generated TypeScript types
│
├── .vscode/                        # VSCode workspace settings
│
├── docs/                           # 📚 PROJECT DOCUMENTATION (BMM artifacts)
│   ├── discovery/                  # Phase 0: Discovery artifacts
│   │   ├── brainstorming-session-results-2025-11-15/
│   │   └── product-brief-proyecto-nixtia-2025-11-15 19-16-57-035/
│   │
│   ├── planning/                   # Phase 1: Planning artifacts
│   │   ├── PRD/                    # Product Requirements Document
│   │   ├── epics/                  # Epic breakdown
│   │   ├── ux-design-specification/  # UX design system
│   │   └── implementation-readiness-report-20251118/
│   │
│   ├── solutioning/                # Phase 2: Solutioning artifacts
│   │   ├── architecture.md         # System architecture + ADRs
│   │   ├── epic-breakdown-technical.md
│   │   ├── test-design-strategy.md
│   │   └── implementation-readiness-report-20251118.md
│   │
│   ├── sprint-artifacts/           # Phase 3: Implementation tracking
│   │   └── archive/                # Archived stories and tech specs
│   │       └── stories/            # User stories (completed)
│   │
│   ├── nixtia-assets/              # Project-specific reference materials
│   │   └── nixtia-info.md
│   │
│   ├── brownfield/                 # 🆕 BROWNFIELD DOCUMENTATION (this scan)
│   │   ├── data-models.md          # Database schema documentation
│   │   ├── api-contracts.md        # API endpoint contracts
│   │   ├── component-inventory.md  # Component catalog
│   │   └── source-tree-analysis.md # This file
│   │
│   ├── bmm-workflow-status.yaml    # Workflow progress tracker
│   └── prompts/                    # AI prompt templates
│       └── first-prompt.md
│
├── node_modules/                   # npm dependencies (gitignored)
│
├── prisma/                         # 🗄️ DATABASE SCHEMA & MIGRATIONS
│   ├── migrations/                 # Prisma migration files
│   ├── schema.prisma               # Database schema definition
│   └── seed.ts                     # Database seed script
│
├── public/                         # 🖼️ STATIC ASSETS
│   ├── hero-corn.jpg               # Landing page hero image
│   └── nixtamalization-process.jpg # Educational content image
│
├── src/                            # 💻 SOURCE CODE (main application)
│   ├── app/                        # Next.js App Router (routes + pages)
│   │   │
│   │   ├── layout.tsx              # 🔴 ROOT LAYOUT (app-wide shell)
│   │   │                           #     - Wraps all pages
│   │   │                           #     - Includes Header component
│   │   │                           #     - Global styles + fonts
│   │   │
│   │   ├── page.tsx                # 🔴 HOME PAGE (redirect to /landing or /store)
│   │   │
│   │   ├── landing/                # Marketing landing page
│   │   │   ├── layout.tsx          # Landing-specific layout
│   │   │   └── page.tsx            # Landing page route (/landing)
│   │   │
│   │   ├── store/                  # E-commerce store section
│   │   │   ├── page.tsx            # Product catalog (/store)
│   │   │   ├── checkout/           # Checkout flow
│   │   │   │   └── page.tsx        # Checkout form (/store/checkout)
│   │   │   └── order-confirmation/ # Order success page
│   │   │       └── page.tsx        # Confirmation (/store/order-confirmation)
│   │   │
│   │   ├── admin/                  # Admin dashboard
│   │   │   ├── layout.tsx          # Admin layout (auth wrapper)
│   │   │   ├── page.tsx            # Admin home/redirect (/admin)
│   │   │   ├── login/              # Admin login
│   │   │   │   └── page.tsx        # Login page (/admin/login)
│   │   │   └── transactions/       # Order management
│   │   │       └── page.tsx        # Transactions table (/admin/transactions)
│   │   │
│   │   ├── api/                    # 🔴 API ROUTES (Server-side endpoints)
│   │   │   ├── test-db/
│   │   │   │   └── route.ts        # GET /api/test-db (database health check)
│   │   │   ├── orders/
│   │   │   │   └── route.ts        # POST /api/orders (create order)
│   │   │   └── auth/
│   │   │       └── logout/
│   │   │           └── route.ts    # POST /api/auth/logout (admin logout)
│   │   │
│   │   └── globals.css             # 🔴 GLOBAL STYLES (Tailwind base + theme)
│   │
│   ├── components/                 # 🧩 REACT COMPONENTS
│   │   ├── ui/                     # Base UI primitives (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── alert.tsx
│   │   │   └── table.tsx
│   │   │
│   │   ├── landing/                # Landing page components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ValueProposition.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── EducationalContent.tsx
│   │   │   └── LandingFooter.tsx
│   │   │
│   │   ├── store/                  # Store/checkout components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartWidget.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── PhoneInputField.tsx
│   │   │   ├── PaymentMethodSelector.tsx
│   │   │   ├── OrderDetailsCard.tsx
│   │   │   ├── OrderNumberCopy.tsx
│   │   │   ├── PaymentInstructions.tsx
│   │   │   └── ClearCartOnMount.tsx
│   │   │
│   │   ├── admin/                  # Admin dashboard components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── LogoutButton.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   └── TransactionsTable.tsx
│   │   │
│   │   └── shared/                 # Shared components
│   │       └── Header.tsx          # 🔴 MAIN NAVIGATION (used in root layout)
│   │
│   ├── lib/                        # 🛠️ UTILITIES & INTEGRATIONS
│   │   ├── prisma.ts               # Prisma client singleton
│   │   │
│   │   ├── supabase/               # Supabase client setup
│   │   │   ├── client.ts           # Client-side Supabase client
│   │   │   └── server.ts           # Server-side Supabase client
│   │   │
│   │   ├── utils/                  # Utility functions
│   │   │   └── cn.ts               # className utility (tailwind-merge + clsx)
│   │   │
│   │   └── validations/            # Zod schemas
│   │       └── order.ts            # Order validation schema (assumed)
│   │
│   ├── types/                      # 📝 TYPESCRIPT TYPE DEFINITIONS
│   │   ├── database.ts             # Prisma-generated types (assumed)
│   │   ├── order.ts                # Order-related types
│   │   └── product.ts              # Product types
│   │
│   ├── hooks/                      # ⚛️ REACT CUSTOM HOOKS
│   │   └── useCart.ts              # Cart state management hook (assumed)
│   │
│   ├── contexts/                   # 🌐 REACT CONTEXT PROVIDERS
│   │   └── CartContext.tsx         # Shopping cart context (assumed)
│   │
│   └── middleware.ts               # 🔴 NEXT.JS MIDDLEWARE (auth, redirects)
│
├── tests/                          # 🧪 TEST SUITES
│   ├── e2e/                        # Playwright E2E tests
│   │   ├── admin-auth.spec.ts      # Admin login flow
│   │   └── admin-transactions-table.spec.ts  # Transactions table tests
│   │
│   ├── unit/                       # Vitest unit tests
│   │
│   └── support/                    # Test utilities
│       ├── fixtures/               # Test data
│       │   └── index.ts
│       └── page-objects/           # Page object models
│           └── cart-page.ts
│
├── test-results/                   # Playwright test output (gitignored)
│
├── .dockerignore                   # Docker build exclusions
├── .env                            # Environment variables (gitignored, local only)
├── .env.docker                     # Docker-specific env vars
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment (gitignored)
├── .env.test.example               # Test environment template
├── .gitignore                      # Git exclusions
├── .nvmrc                          # Node version specification (v20)
├── .prettierignore                 # Prettier exclusions
├── .prettierrc                     # Prettier configuration
│
├── components.json                 # shadcn/ui configuration
├── docker-compose.yml              # Docker services definition
├── docker-start.sh                 # Docker startup script
├── Dockerfile                      # Production Docker image
├── Dockerfile.dev                  # Development Docker image
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # 🔴 NEXT.JS CONFIGURATION
├── next-env.d.ts                   # Next.js TypeScript declarations
├── package.json                    # 🔴 NPM DEPENDENCIES & SCRIPTS
├── package-lock.json               # Dependency lockfile
├── playwright.config.ts            # Playwright test configuration
├── postcss.config.mjs              # PostCSS configuration (Tailwind)
├── README.md                       # Project README
├── tsconfig.json                   # 🔴 TYPESCRIPT CONFIGURATION
├── tsconfig.tsbuildinfo            # TypeScript build cache
├── verify-rls-policies.ts          # Supabase RLS policy verification script
└── vitest.config.ts                # Vitest unit test configuration
```

---

## Critical Files & Entry Points

### 🔴 Application Entry Points

1. **Root Layout:** `src/app/layout.tsx`
   - App-wide shell wrapping all pages
   - Includes Header navigation
   - Global styles, fonts, metadata

2. **Middleware:** `src/middleware.ts`
   - Auth protection for admin routes
   - Redirects for unauthenticated users
   - Session management via Supabase

3. **Next.js Config:** `next.config.ts`
   - Standalone output for Docker
   - Image optimization (Supabase, Unsplash)

4. **Package.json:** `package.json`
   - Dependencies and scripts
   - Build, dev, test commands

5. **TypeScript Config:** `tsconfig.json`
   - Path aliases (`@/*` → `./src/*`)
   - Strict mode enabled

---

## Code Organization Patterns

### 1. Feature-Based Structure (App Router)

Pages organized by feature area:
- `/landing` - Marketing
- `/store` - E-commerce
- `/admin` - Business intelligence

### 2. Component Domain Organization

```
components/
├── ui/        # Framework-agnostic primitives
├── landing/   # Landing page specific
├── store/     # Store specific
├── admin/     # Admin specific
└── shared/    # Cross-domain reusable
```

### 3. Utilities & Configuration

```
lib/
├── prisma.ts         # Database client
├── supabase/         # Auth & storage
├── utils/            # Helper functions
└── validations/      # Schemas (Zod)
```

---

## Integration Points

### External Services

1. **Supabase:**
   - Authentication: `lib/supabase/client.ts`, `lib/supabase/server.ts`
   - Database: PostgreSQL connection via Prisma
   - Storage: Image uploads (planned)

2. **Prisma:**
   - Client: `lib/prisma.ts`
   - Schema: `prisma/schema.prisma`
   - Migrations: `prisma/migrations/`

3. **Stripe:**
   - Integration planned (not yet implemented)
   - Payment method enum supports STRIPE

---

## Build & Deployment Artifacts

**Generated Directories (Gitignored):**
- `.next/` - Next.js build output
- `node_modules/` - npm dependencies
- `test-results/` - Playwright reports
- `tsconfig.tsbuildinfo` - TypeScript incremental build

**Docker:**
- `Dockerfile` - Production container
- `Dockerfile.dev` - Development container
- `docker-compose.yml` - Multi-service orchestration

---

## Configuration Files Summary

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js app configuration |
| `tsconfig.json` | TypeScript compiler settings |
| `eslint.config.mjs` | Linting rules (Next.js recommended) |
| `.prettierrc` | Code formatting rules |
| `tailwind.config.ts` | Tailwind CSS theme (assumed) |
| `postcss.config.mjs` | PostCSS plugins (Tailwind) |
| `components.json` | shadcn/ui component config |
| `playwright.config.ts` | E2E test configuration |
| `vitest.config.ts` | Unit test configuration |
| `.nvmrc` | Node version (v20) |

---

## Documentation Structure

The `docs/` directory follows the BMad Method workflow phases:

1. **Discovery:** Brainstorming, product briefs
2. **Planning:** PRD, epics, UX design
3. **Solutioning:** Architecture, test strategy
4. **Implementation:** Sprint artifacts, stories

**New Addition:** `docs/brownfield/` contains this scan's output for AI-assisted brownfield development.

---

## Import Path Aliases

**Configured in `tsconfig.json`:**

```typescript
"paths": {
  "@/*": ["./src/*"]
}
```

**Usage:**
```typescript
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { OrderSchema } from '@/lib/validations/order';
```

---

## Key Directories Summary

| Directory | Purpose | File Count (approx) |
|-----------|---------|---------------------|
| `src/app/` | Routes, pages, API | 15+ files |
| `src/components/` | React components | 24+ files |
| `src/lib/` | Utilities, clients | 10+ files |
| `prisma/` | Database schema | 2-5 files |
| `docs/` | Project documentation | 77+ files |
| `tests/` | Test suites | 5+ files |

---

## References

- Next.js App Router: [nextjs.org/docs/app](https://nextjs.org/docs/app)
- Project Architecture: [docs/solutioning/architecture.md](../solutioning/architecture.md)
- Component Inventory: [component-inventory.md](./component-inventory.md)
