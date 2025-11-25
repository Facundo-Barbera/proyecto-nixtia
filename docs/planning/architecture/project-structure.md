# Project Structure

```
proyecto-nixtia/
├── .bmad/                          # BMad workflow configuration (not deployed)
├── .claude/                        # Claude Code settings (not deployed)
├── docs/                           # Product documentation (not deployed)
│   ├── planning/
│   │   ├── PRD/                   # Product Requirements (sharded)
│   │   └── ux-design-specification/  # UX Design Spec (sharded)
│   ├── architecture.md            # This document
│   └── nixtia-assets/             # Brand assets (logos, colors)
│
├── src/                            # Application source code
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Homepage (redirects to /store or /landing)
│   │   │
│   │   ├── landing/               # Marketing landing page (FR55-59)
│   │   │   └── page.tsx
│   │   │
│   │   ├── store/                 # Customer-facing virtual store
│   │   │   ├── page.tsx           # Product catalog (FR11-15)
│   │   │   ├── layout.tsx         # Store layout with cart
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx       # Checkout flow (FR27-34)
│   │   │   │   └── success/
│   │   │   │       └── page.tsx   # Order confirmation (FR32)
│   │   │   └── [productId]/
│   │   │       └── page.tsx       # Product detail (FR13)
│   │   │
│   │   ├── admin/                 # Admin dashboard
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # Admin login (FR7)
│   │   │   └── dashboard/
│   │   │       └── page.tsx       # Analytics dashboard (FR44-54)
│   │   │
│   │   └── api/                   # API Route Handlers
│   │       ├── orders/
│   │       │   └── route.ts       # Order creation (Server Action alternative)
│   │       └── webhooks/
│   │           └── stripe/
│   │               └── route.ts   # Stripe webhook handler (future)
│   │
│   ├── components/                # React components
│   │   ├── ui/                    # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── toast.tsx
│   │   │
│   │   ├── store/                 # Store-specific components
│   │   │   ├── ProductCard.tsx    # Product display with quantity selector
│   │   │   ├── CartFAB.tsx        # Floating cart button (mobile)
│   │   │   ├── CartSummary.tsx    # Cart panel (desktop)
│   │   │   ├── PhoneInput.tsx     # Phone number input with validation
│   │   │   └── PaymentMethodSelector.tsx
│   │   │
│   │   ├── admin/                 # Admin dashboard components
│   │   │   ├── KPICard.tsx        # Metric display card
│   │   │   ├── RevenueChart.tsx   # Recharts wrapper for revenue
│   │   │   ├── TransactionsTable.tsx
│   │   │   └── PaymentBreakdownChart.tsx
│   │   │
│   │   ├── landing/               # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   ├── ProductShowcase.tsx
│   │   │   └── About.tsx
│   │   │
│   │   └── shared/                # Shared cross-app components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── lib/                       # Utility libraries
│   │   ├── supabase/
│   │   │   ├── client.ts          # Browser Supabase client
│   │   │   ├── server.ts          # Server Supabase client (SSR)
│   │   │   └── middleware.ts      # Auth middleware
│   │   │
│   │   ├── utils/
│   │   │   ├── formatPrice.ts     # Currency formatting
│   │   │   ├── formatPhone.ts     # Phone number formatting
│   │   │   └── translatePaymentMethod.ts
│   │   │
│   │   └── validations/
│   │       ├── checkout.ts        # Zod schema for checkout
│   │       ├── product.ts         # Zod schema for products
│   │       └── phone.ts           # Phone validation rules
│   │
│   ├── actions/                   # Server Actions (future organization)
│   │   ├── orders.ts              # Create/update orders
│   │   ├── auth.ts                # Login/logout
│   │   └── products.ts            # Product CRUD
│   │
│   ├── contexts/
│   │   └── CartContext.tsx        # Shopping cart state (React Context)
│   │
│   ├── hooks/
│   │   ├── useCart.ts             # Cart operations hook
│   │   ├── useAuth.ts             # Auth state hook
│   │   └── useSupabaseQuery.ts    # Supabase query helper
│   │
│   └── types/
│       ├── database.types.ts      # Generated from Supabase (supabase gen types)
│       ├── supabase.ts            # Supabase client types
│       └── index.ts               # Shared types
│
├── supabase/                      # Supabase configuration
│   ├── migrations/                # SQL migration files
│   │   ├── 20XX_create_products.sql
│   │   ├── 20XX_create_orders.sql
│   │   ├── 20XX_create_rls_policies.sql
│   │   └── 20XX_seed_data.sql
│   │
│   ├── config.toml               # Supabase project config
│   └── seed.sql                  # Seed data for local dev
│
├── public/                        # Static assets
│   ├── images/                    # Product images
│   ├── fonts/                     # TAN Headline, Libre Baskerville, Poppins
│   └── favicon.ico
│
├── tests/                         # Test files
│   ├── e2e/                       # Playwright E2E tests
│   │   ├── store.spec.ts
│   │   ├── checkout.spec.ts
│   │   └── admin.spec.ts
│   └── unit/                      # Vitest unit tests
│       └── lib/
│
├── scripts/                       # Utility scripts
│   └── generate-types.sh         # Generate Supabase types
│
├── .env.local                     # Local environment variables (not in git)
├── .env.example                   # Environment variable template (in git)
├── .gitignore
├── components.json                # shadcn/ui configuration
├── docker-compose.yml             # Local development environment
├── Dockerfile                     # Production container
├── next.config.ts                 # Next.js configuration
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts             # Tailwind with Nixtia brand theme
├── tsconfig.json
├── vitest.config.ts
└── playwright.config.ts
```
