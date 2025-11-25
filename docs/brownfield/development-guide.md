# Development Guide - Nixtia

**Generated:** 2025-11-24
**Project:** proyecto-nixtia

## Overview

This guide provides everything you need to set up, develop, and deploy the Nixtia e-commerce platform.

---

## Prerequisites

### Required Software

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | 20.x LTS | Runtime environment |
| **npm** | 10.x+ | Package manager |
| **Git** | 2.x+ | Version control |
| **Docker** | 24.x+ (optional) | Containerization |
| **PostgreSQL** | 15.x+ | Database (or use Supabase) |

### Recommended Tools

- **VSCode** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma
- **Postman/Insomnia** for API testing
- **Playwright Test for VSCode** for E2E test debugging

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-org/nixtia.git
cd nixtia
```

### 2. Install Dependencies

```bash
npm install
```

This installs all dependencies from `package.json`:
- **Production:** Next.js, React, Prisma, Supabase client, UI libraries
- **Development:** TypeScript, ESLint, Prettier, Vitest, Playwright

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nixtia?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Stripe (for future payment integration)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

**Where to get credentials:**
- **Supabase:** [app.supabase.com](https://app.supabase.com) → Project Settings → API
- **Stripe:** [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)

### 4. Set Up Database

#### Option A: Using Supabase (Recommended)

1. Create a new project on [Supabase](https://app.supabase.com)
2. Copy the database URL from Project Settings → Database
3. Run Prisma migrations:

```bash
npx prisma migrate deploy
npx prisma generate
```

4. (Optional) Seed database:

```bash
npm run seed
```

#### Option B: Local PostgreSQL

1. Start PostgreSQL:

```bash
# macOS (Homebrew)
brew services start postgresql@15

# Linux
sudo systemctl start postgresql

# Docker
docker run --name nixtia-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
```

2. Create database:

```bash
createdb nixtia
```

3. Run migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Verify Setup

Test database connection:

```bash
npm run dev
```

Visit: [http://localhost:3000/api/test-db](http://localhost:3000/api/test-db)

Expected response:
```json
{
  "status": "success",
  "message": "Database connection successful"
}
```

---

## Development Workflow

### Start Development Server

```bash
npm run dev
```

**URLs:**
- App: [http://localhost:3000](http://localhost:3000)
- Landing: [http://localhost:3000/landing](http://localhost:3000/landing)
- Store: [http://localhost:3000/store](http://localhost:3000/store)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

**Features:**
- Hot Module Replacement (HMR)
- Fast Refresh for React components
- Automatic TypeScript compilation

### Code Quality Checks

```bash
# Linting
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues

# Formatting
npm run format        # Format all files
npm run format:check  # Check if formatted

# Type checking
npm run type-check    # Run TypeScript compiler
```

**Pre-commit Hook (Recommended):**

Install Husky for automatic pre-commit checks:

```bash
npx husky-init && npm install
```

Add to `.husky/pre-commit`:
```bash
npm run lint
npm run type-check
```

---

## Testing

### Unit Tests (Vitest)

```bash
npm run test          # Run tests in watch mode
npm run test:ui       # Open Vitest UI
npm run test:run      # Run once (CI mode)
```

**Test Files:** `tests/unit/**/*.test.ts`

**Example:**
```typescript
import { describe, it, expect } from 'vitest';
import { calculateTotal } from '@/lib/utils/cart';

describe('calculateTotal', () => {
  it('calculates order total correctly', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 }
    ];
    expect(calculateTotal(items)).toBe(250);
  });
});
```

### E2E Tests (Playwright)

```bash
npm run test:e2e          # Run all E2E tests
npm run test:e2e:ui       # Run with UI
npm run test:e2e:headed   # Run in headed mode (see browser)
npm run test:e2e:debug    # Debug mode (pause on breakpoints)
npm run test:e2e:report   # View test report
```

**Test Files:** `tests/e2e/**/*.spec.ts`

**Existing Tests:**
- `admin-auth.spec.ts` - Admin login flow
- `admin-transactions-table.spec.ts` - Transactions table functionality

**Page Objects:** `tests/support/page-objects/`

---

## Database Management

### Prisma Commands

```bash
# Migrations
npx prisma migrate dev --name add_new_field  # Create new migration
npx prisma migrate deploy                    # Apply migrations (production)
npx prisma migrate reset                     # Reset database (dev only)

# Client Generation
npx prisma generate                          # Regenerate Prisma Client

# Database Management
npx prisma db push                           # Push schema without migration (dev only)
npx prisma db seed                           # Run seed script

# Studio (Visual Database Editor)
npx prisma studio                            # Open at http://localhost:5555
```

### Adding a New Field

1. Update `prisma/schema.prisma`:

```prisma
model products {
  // ...existing fields
  stock_quantity Int @default(0)  // Add new field
}
```

2. Create migration:

```bash
npx prisma migrate dev --name add_stock_quantity
```

3. Regenerate client:

```bash
npx prisma generate
```

---

## Building for Production

### Local Production Build

```bash
npm run build         # Create production build
npm run start         # Start production server
```

**Build Output:**
- `.next/` directory contains optimized production bundle
- Standalone output enabled (for Docker)

### Docker Build

```bash
# Development
docker-compose up --build

# Production
docker build -t nixtia:latest .
docker run -p 3000:3000 nixtia:latest
```

**Docker Files:**
- `Dockerfile` - Production image
- `Dockerfile.dev` - Development image
- `docker-compose.yml` - Multi-container setup
- `docker-start.sh` - Container startup script

---

## Common Development Tasks

### Adding a New Page

1. Create route file:

```bash
# Example: /store/products
mkdir -p src/app/store/products
touch src/app/store/products/page.tsx
```

2. Implement page:

```typescript
export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}
```

3. Add navigation link in Header component.

### Adding a New API Endpoint

1. Create route handler:

```bash
mkdir -p src/app/api/products
touch src/app/api/products/route.ts
```

2. Implement handler:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.products.findMany({
    where: { active: true }
  });
  return NextResponse.json({ products });
}
```

### Adding a New Component

1. Create component file:

```bash
touch src/components/store/ProductGrid.tsx
```

2. Implement component:

```typescript
interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

3. Export from barrel file (optional):

```typescript
// src/components/store/index.ts
export { ProductGrid } from './ProductGrid';
export { ProductCard } from './ProductCard';
```

### Adding a shadcn/ui Component

```bash
npx shadcn@latest add [component-name]

# Examples:
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add form
```

This adds the component to `src/components/ui/`.

---

## Environment Variables Reference

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | `eyJhbG...` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | Admin operations key | - |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | - |
| `STRIPE_SECRET_KEY` | Stripe secret key | - |
| `NODE_ENV` | Environment | `development` |

---

## Troubleshooting

### "Module not found" errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database connection errors

1. Verify `DATABASE_URL` in `.env.local`
2. Test connection:

```bash
npx prisma db execute --url="$DATABASE_URL" --stdin <<< "SELECT 1;"
```

3. Check Supabase project status (if using Supabase)

### Prisma Client out of sync

```bash
npx prisma generate
```

### Port 3000 already in use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 [PID]

# Or use different port
PORT=3001 npm run dev
```

---

## Code Style Guidelines

### TypeScript

- **Strict mode:** Enabled in `tsconfig.json`
- **No `any`:** Use proper types or `unknown`
- **Interface over type:** For object shapes

```typescript
// Good
interface Product {
  id: string;
  name: string;
}

// Avoid
type Product = {
  id: string;
  name: string;
};
```

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types
interface MyComponentProps {
  title: string;
  onClick: () => void;
}

// 3. Component
export function MyComponent({ title, onClick }: MyComponentProps) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={onClick}>Click {count}</Button>
    </div>
  );
}
```

### Naming Conventions

- **Components:** PascalCase (`ProductCard.tsx`)
- **Utilities:** camelCase (`formatPrice.ts`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_ITEMS = 100`)
- **API routes:** lowercase (`route.ts`)

---

## Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

### Commit Messages

Follow conventional commits:

```
feat: add product search functionality
fix: resolve cart total calculation bug
refactor: extract checkout logic to hook
docs: update API documentation
test: add tests for order creation
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Run tests and linting
4. Push branch
5. Create PR with description
6. Request review
7. Merge after approval

---

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy:

```bash
git push origin main  # Auto-deploys to production
```

**Environment Variables (Vercel):**
- Add all `.env.local` variables to Vercel project settings
- Use Vercel-Supabase integration for automatic setup

### Docker Deployment

```bash
# Build production image
docker build -t nixtia:latest .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e NEXT_PUBLIC_SUPABASE_URL="..." \
  nixtia:latest
```

---

## Performance Optimization

### Image Optimization

Use Next.js `<Image>` component:

```typescript
import Image from 'next/image';

<Image
  src="/hero-corn.jpg"
  alt="Corn products"
  width={800}
  height={600}
  priority  // For above-fold images
/>
```

### Code Splitting

```typescript
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false  // Disable SSR if needed
});
```

### Database Query Optimization

```typescript
// Use select to limit fields
const products = await prisma.products.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    // Exclude large fields like description
  },
  where: { active: true }
});
```

---

## References

- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Prisma Docs: [prisma.io/docs](https://www.prisma.io/docs)
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- shadcn/ui: [ui.shadcn.com](https://ui.shadcn.com)
- Architecture: [docs/solutioning/architecture.md](../solutioning/architecture.md)
- API Contracts: [api-contracts.md](./api-contracts.md)
