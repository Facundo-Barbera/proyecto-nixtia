# Story 2.1: Product Catalog Grid (Mobile-First)

Status: review

## Story

As a **customer**,
I want **to browse available products in a mobile-optimized grid layout**,
so that **I can easily discover and select artisan corn products to purchase**.

## Acceptance Criteria

### AC-2.1.1: Product Grid Layout (Mobile-First)

```
GIVEN a customer accesses the store
WHEN the product catalog page loads at /store
THEN:
  - All active products displayed in responsive grid
  - Grid layout: 1 column (mobile 320px), 2 columns (tablet 768px), 3 columns (desktop 1024px)
  - Products ordered by created_at DESC (newest first)
  - Each product card shows: image, name, price, "Add to Cart" button
  - Grid uses CSS Grid with gap spacing (16px mobile, 24px desktop)
  - Touch targets minimum 44x44px for buttons
```

### AC-2.1.2: Product Card Component

```
GIVEN a product displayed in the grid
WHEN rendered in a ProductCard component
THEN:
  - Product image optimized via next/image (400x400px, lazy loading)
  - Product name displayed (truncated if > 50 characters)
  - Price formatted in Mexican Peso (MXN) with Intl.NumberFormat
  - "Add to Cart" button visible and accessible
  - Hover state on desktop (elevation shadow)
  - Card uses shadcn/ui Card component
  - Card has proper semantic HTML (article, h3, img)
```

### AC-2.1.3: Server Component Data Fetching

```
GIVEN the catalog page implementation
WHEN the page renders
THEN:
  - Products fetched via Prisma in React Server Component
  - Query filters: is_active = true
  - Query includes: id, name, description, price, image_url
  - No client-side data fetching (server-only)
  - Revalidate every 5 minutes (export const revalidate = 300)
```

### AC-2.1.4: Image Optimization

```
GIVEN product images from Supabase Storage or external URLs
WHEN rendered via next/image
THEN:
  - Automatic WebP conversion for supported browsers
  - Responsive sizing: (max-width: 768px) 100vw, 400px
  - Quality setting: 85
  - Loading: lazy (except first 3 products)
  - Priority loading for first 3 products (above fold)
  - Alt text from product name
```

### AC-2.1.5: Performance Targets

```
GIVEN the product catalog implementation
WHEN tested on mobile 4G connection
THEN:
  - Page loads in < 2 seconds (Lighthouse)
  - First Contentful Paint < 1.5 seconds
  - Largest Contentful Paint < 2.5 seconds
  - No layout shift (proper image sizing)
  - No hydration errors
```

### AC-2.1.6: Empty State Handling

```
GIVEN no active products in database
WHEN the catalog page renders
THEN:
  - Empty state message displayed: "No products available at the moment"
  - Message centered with appropriate styling
  - No broken grid layout
```

## Tasks / Subtasks

- [x] Task 1: Create store page route and Server Component (AC: #2.1.1, #2.1.3)
  - [x] Create `src/app/store/page.tsx` as React Server Component
  - [x] Fetch products via Prisma: `prisma.products.findMany({ where: { active: true }, orderBy: { created_at: 'desc' } })`
  - [x] Configure revalidation: `export const revalidate = 300`
  - [x] Implement responsive grid layout with Tailwind CSS
  - [x] Handle empty products array (empty state)

- [x] Task 2: Build ProductCard component (AC: #2.1.2)
  - [x] Create `src/components/store/ProductCard.tsx` as Client Component
  - [x] Define ProductCardProps interface (product data)
  - [x] Use shadcn/ui Card component as wrapper
  - [x] Render product image, name, price
  - [x] Add "Add to Cart" button (onClick handler)
  - [x] Style with Tailwind (mobile-first, purple brand)
  - [x] Implement hover states for desktop

- [x] Task 3: Implement image optimization (AC: #2.1.4)
  - [x] Use next/image for all product images
  - [x] Configure responsive sizes attribute: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
  - [x] Set quality=85, loading="lazy"
  - [x] Add priority=true for first 3 products
  - [x] Ensure alt text from product.name
  - [x] Ready for WebP conversion testing

- [x] Task 4: Price formatting utility (AC: #2.1.2)
  - [x] Create `src/lib/utils/formatPrice.ts`
  - [x] Implement Intl.NumberFormat with locale='es-MX', currency='MXN'
  - [x] Handle null/undefined prices gracefully
  - [x] Support Prisma Decimal type

- [x] Task 5: Responsive grid styling (AC: #2.1.1)
  - [x] Apply CSS Grid with Tailwind classes
  - [x] Mobile: `grid-cols-1 gap-4`
  - [x] Tablet: `sm:grid-cols-2 sm:gap-6`
  - [x] Desktop: `lg:grid-cols-3 lg:gap-8`
  - [x] Ready for breakpoint testing

- [x] Task 6: Performance optimization (AC: #2.1.5)
  - [x] Build successful with ISR (5-minute revalidation)
  - [x] TypeScript compilation passed
  - [x] Linting passed
  - [x] Ready for Lighthouse audit

- [x] Task 7: Integration with cart (placeholder) (AC: #2.1.2)
  - [x] Add onClick handler to ProductCard
  - [x] Implemented handleAddToCart function
  - [x] Log product ID to console
  - [x] Alert notification placeholder (to be replaced in Story 2.3)

## Dev Notes

### Architecture Patterns and Constraints

**React Server Components**:
- `src/app/store/page.tsx` is a Server Component (default in App Router)
- Fetch data directly via Prisma in component body
- No useState, useEffect, or client-side hooks in page component
- ProductCard is Client Component ("use client") for interactivity

**Component Hierarchy**:
```
app/store/page.tsx (Server Component)
  └── ProductCard.tsx (Client Component) [multiple instances]
      ├── shadcn/ui Card
      ├── next/image
      └── shadcn/ui Button
```

**Data Fetching Pattern**:
```typescript
// src/app/store/page.tsx
import { prisma } from '@/lib/prisma'

export const revalidate = 300 // 5 minutes

export default async function StorePage() {
  const products = await prisma.product.findMany({
    where: { is_active: true },
    orderBy: { created_at: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image_url: true,
    },
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

**Image Optimization**:
- Use `next/image` component (NEVER `<img>` tag)
- Configure next.config.ts for external domains if using Supabase Storage
- WebP automatic conversion for modern browsers

**Styling Standards**:
- Tailwind CSS utility classes
- Mobile-first approach (base styles = mobile, then sm:, lg: modifiers)
- Purple brand colors: `text-primary-600`, `bg-primary-600`, `hover:bg-primary-700`
- Touch targets: minimum 44x44px (shadcn/ui buttons meet this by default)

### Project Structure Notes

**New Files to Create**:
```
src/
├── app/
│   └── store/
│       └── page.tsx                    # Server Component (product catalog)
├── components/
│   └── store/
│       └── ProductCard.tsx             # Client Component (product card)
├── lib/
│   └── utils/
│       └── formatPrice.ts              # Price formatting utility
```

**Files to Reuse**:
- `src/lib/prisma.ts` (Prisma client singleton)
- `src/components/ui/card.tsx` (shadcn/ui Card)
- `src/components/ui/button.tsx` (shadcn/ui Button)
- `src/lib/utils.ts` (cn utility for className merging)

### References

- [Source: docs/solutioning/epic-breakdown-technical.md#Story-2.1]
- [Source: docs/solutioning/architecture.md#React-Server-Components]
- [Source: docs/solutioning/architecture.md#Image-Optimization]
- [Source: docs/solutioning/architecture.md#Performance-Targets]
- [Source: docs/planning/PRD/index.md#FR11-FR15] (Product Catalog requirements)

### Testing Standards

**Unit Tests** (Vitest):
- Test formatPrice utility with various inputs (positive, zero, null)
- Test ProductCard component renders all props correctly
- Test empty state rendering when products array is empty

**Integration Tests**:
- Test Prisma query returns only active products
- Test product data structure matches expected schema

**E2E Tests** (Playwright):
- Test catalog page loads and displays products
- Verify responsive grid layout at 320px, 768px, 1024px
- Test "Add to Cart" button is clickable
- Verify images load with proper optimization
- Test page load time < 2 seconds on 4G throttle

**Performance Tests**:
- Run Lighthouse audit (target score > 90)
- Measure FCP, LCP, CLS metrics
- Test on real mobile device (Android/iOS)

### Learnings from Previous Story

**From Story 1.2 (Supabase Integration)**:

- **Database Available**: Prisma schema with Product model is fully configured
- **Seed Data**: 10 sample products created with masa, tortillas, tostadas, etc.
- **Connection**: Use `prisma.product.findMany()` for queries (no separate connection setup needed)
- **Environment Variables**: DATABASE_URL already configured in .env.local
- **Prisma Client**: Import from `@/lib/prisma` (singleton pattern prevents multiple instances)

[Source: docs/sprint-artifacts/stories/1-2-supabase-integration-database-setup.md#Dev-Agent-Record]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

_To be filled by dev agent_

### Debug Log References

_To be filled by dev agent_

### Completion Notes List

_To be filled by dev agent_

### File List

_To be filled by dev agent_
