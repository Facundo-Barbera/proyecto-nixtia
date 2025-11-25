# Development Environment

## Prerequisites

**Required:**
- Node.js 20.x LTS
- npm 10.x or pnpm 9.x
- Docker & Docker Compose (for local dev)
- Supabase CLI 2.x (for migrations)

**Optional:**
- Git for version control
- VSCode with extensions (ESLint, Prettier, Tailwind IntelliSense)

## Setup Commands

```bash
# Clone repository
git clone <repo-url>
cd proyecto-nixtia

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
# SUPABASE_SECRET_KEY=<your-secret-key>

# Generate TypeScript types from Supabase
npx supabase gen types typescript --project-id <project-id> > src/types/database.types.ts

# Run development server
npm run dev

# Run tests
npm run test          # Vitest unit tests
npm run test:e2e      # Playwright E2E tests

# Build for production
npm run build

# Start production server
npm run start

# Docker development
docker-compose up
```

## Environment Variables

**Required:**
```bash
# Supabase (Client-side - safe to expose)
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...

# Supabase (Server-side - NEVER expose)
SUPABASE_SECRET_KEY=sb_secret_...

# Stripe (test mode for demo)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

**Note on Supabase Keys:**
- **Publishable Key** (`sb_publishable_...`): Replaces the legacy anon key. Safe to use in browser/client-side code.
- **Secret Key** (`sb_secret_...`): Replaces the legacy service_role key. Only use in server-side code (Server Actions, API Routes).
- Get keys from: https://app.supabase.com/project/_/settings/api

**Optional:**
```bash
# Development
NODE_ENV=development
PORT=3000
```
