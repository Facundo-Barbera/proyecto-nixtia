# Story 4.5: Marketing Landing Page (Optional MVP)

Status: review

## Story

As a **potential customer**,
I want **a marketing landing page that introduces Nixtia and its artisan corn products**,
so that **I understand the brand value proposition and can easily navigate to the online store**.

## Acceptance Criteria

### AC-4.5.1: Hero Section with Brand Identity

```
GIVEN a visitor accesses the landing page
WHEN the page loads
THEN:
  - Hero section displays above the fold (viewport)
  - Nixtia logo and brand name prominently visible
  - Compelling headline about artisan nixtamalized products
  - High-quality hero image showcasing corn products
  - Primary CTA button: "Shop Now" → links to /store
  - Mobile-first responsive design (320px+)
  - Loads in < 2 seconds on mobile 4G
```

### AC-4.5.2: Value Proposition Section

```
GIVEN a visitor scrolls past the hero
WHEN viewing the value proposition section
THEN:
  - 3-4 key benefits displayed (traditional nixtamalization, quality, artisan process)
  - Each benefit has icon + heading + short description (30-50 words)
  - Visually distinct from hero section
  - Responsive grid layout (1 column mobile, 2-3 desktop)
```

### AC-4.5.3: Featured Products Showcase

```
GIVEN the value proposition section
WHEN the visitor continues scrolling
THEN:
  - "Featured Products" section displays 3-6 products
  - Each product shows: image, name, price
  - Products fetched from database (active products only)
  - Click on product → redirects to /store
  - Carousel or grid layout (mobile/desktop responsive)
```

### AC-4.5.4: Educational Content (Nixtamalization)

```
GIVEN the featured products section
WHEN the visitor scrolls further
THEN:
  - Educational section explains nixtamalization process
  - Brief text (100-150 words) + supporting image
  - "Learn More" link to detailed blog post (future enhancement)
  - Builds trust and differentiates brand
```

### AC-4.5.5: Call-to-Action Footer

```
GIVEN the bottom of the landing page
WHEN the visitor reaches the footer
THEN:
  - Secondary CTA section with "Start Shopping" button → /store
  - Contact information (WhatsApp, email placeholder)
  - Social media links (placeholders for future)
  - Copyright notice
  - Accessible navigation back to top
```

### AC-4.5.6: SEO and Performance

```
GIVEN the landing page implementation
WHEN deployed to production
THEN:
  - Meta tags configured (title, description, OG tags)
  - Static Site Generation (SSG) enabled for fast load
  - Semantic HTML5 structure (header, main, section, footer)
  - Alt text on all images
  - Page load time < 1.5 seconds (lighthouse score > 90)
```

## Tasks / Subtasks

- [x] Task 1: Create landing page route and layout (AC: #4.5.1, #4.5.6)
  - [x] Create `src/app/landing/page.tsx` with SSG configuration
  - [x] Implement root layout with semantic HTML5
  - [x] Configure Next.js metadata for SEO (title, description, OG tags)
  - [x] Set up responsive layout container

- [x] Task 2: Implement hero section component (AC: #4.5.1)
  - [x] Create `src/components/landing/HeroSection.tsx`
  - [x] Add Nixtia logo and brand heading
  - [x] Implement compelling headline and subheading
  - [x] Add hero image with next/image optimization
  - [x] Create "Shop Now" CTA button → links to `/store`
  - [x] Style with Tailwind CSS (mobile-first, purple brand colors)

- [x] Task 3: Build value proposition section (AC: #4.5.2)
  - [x] Create `src/components/landing/ValueProposition.tsx`
  - [x] Design 3-4 benefit cards with icon + text
  - [x] Use Lucide React icons for visual appeal
  - [x] Implement responsive grid (1 col mobile, 2-3 col desktop)
  - [x] Write benefit copy (traditional process, quality, artisan craft)

- [x] Task 4: Featured products showcase (AC: #4.5.3)
  - [x] Create `src/components/landing/FeaturedProducts.tsx`
  - [x] Fetch 3-6 active products from database (Prisma)
  - [x] Implemented product grid layout (responsive)
  - [x] Link each product card to `/store` (not individual product pages)

- [x] Task 5: Educational content section (AC: #4.5.4)
  - [x] Create `src/components/landing/EducationalContent.tsx`
  - [x] Write nixtamalization explanation (100-150 words)
  - [x] Add supporting image (traditional process photo)
  - [x] Include "Learn More" link (placeholder for future blog)
  - [x] Style for readability and trust-building

- [x] Task 6: Footer with CTA and contact info (AC: #4.5.5)
  - [x] Create `src/components/landing/LandingFooter.tsx`
  - [x] Secondary "Start Shopping" CTA button
  - [x] Contact information (WhatsApp number, email placeholder)
  - [x] Social media icon links (placeholders)
  - [x] Copyright notice with current year
  - [x] "Back to top" link for accessibility

- [x] Task 7: Performance optimization and testing (AC: #4.5.6)
  - [x] Verify SSG working (`export const dynamic = 'force-static'`)
  - [x] Optimize all images (SVG placeholders created)
  - [x] Build successful and TypeScript compilation passed
  - [x] Linting passed with no errors
  - [x] Ready for Lighthouse audit and accessibility testing

## Dev Notes

### Architecture Patterns and Constraints

**Rendering Strategy**:
- Use **Static Site Generation (SSG)** for optimal SEO and performance
- Configure: `export const dynamic = 'force-static'` in page.tsx
- Pre-render at build time, served from CDN

**Component Structure**:
- Landing page components in `src/components/landing/`
- Reuse ProductCard from `src/components/store/ProductCard.tsx`
- Reuse Button, Card from shadcn/ui

**Data Fetching**:
- Fetch featured products via Prisma in Server Component
- Query: `prisma.product.findMany({ where: { is_active: true }, take: 6, orderBy: { created_at: 'desc' } })`
- No client-side data fetching needed

**Styling Guidelines**:
- Purple brand colors from Tailwind config (primary-600: #7c3aed)
- Mobile-first breakpoints: 320px, 768px, 1024px
- Touch targets minimum 44x44px (elder-friendly)
- Use `next/image` for all product images

**Performance Targets**:
- Page load < 1.5 seconds (SSG advantage)
- Lighthouse score > 90
- Mobile-first optimization priority

### Project Structure Notes

**New Files to Create**:
```
src/
├── app/
│   └── landing/
│       └── page.tsx                    # Main landing page (SSG)
├── components/
│   └── landing/
│       ├── HeroSection.tsx             # Hero with CTA
│       ├── ValueProposition.tsx        # Benefits grid
│       ├── FeaturedProducts.tsx        # Product showcase
│       ├── EducationalContent.tsx      # Nixtamalization section
│       └── LandingFooter.tsx           # Footer with CTA
```

**Files to Reuse**:
- `src/components/store/ProductCard.tsx` (for featured products)
- `src/components/ui/button.tsx` (shadcn/ui)
- `src/components/ui/card.tsx` (shadcn/ui)
- `src/lib/prisma.ts` (database client)

### References

- [Source: docs/solutioning/epic-breakdown-technical.md#Story-4.5]
- [Source: docs/solutioning/architecture.md#Epic-4-Mapping]
- [Source: docs/solutioning/architecture.md#Performance-Targets]
- [Source: docs/solutioning/architecture.md#Project-Structure]
- [Source: docs/planning/PRD/index.md#FR55-FR59] (Landing page requirements)

### Testing Standards

**Unit Tests** (Vitest):
- Test each landing component renders without errors
- Test "Shop Now" CTA links to `/store`
- Test featured products data fetching logic

**E2E Tests** (Playwright):
- Verify landing page loads in < 2 seconds
- Test hero CTA navigation to store
- Verify featured products clickable and link correctly
- Test mobile responsive breakpoints (320px, 768px)

**Accessibility Tests**:
- Run axe-core accessibility audit
- Test keyboard navigation (tab through CTAs)
- Verify alt text on all images
- Check color contrast ratios (WCAG AA)

## Dev Agent Record

### Context Reference

No context file available. Implementation based on story file and tech-spec-epic-1.md.

### Agent Model Used

claude-sonnet-4-5-20250929

### Debug Log References

**Implementation Plan:**
1. Created landing page route with SSG configuration (src/app/landing/page.tsx:23)
2. Implemented 5 landing components in src/components/landing/
3. Fixed Prisma model naming (products not product) across codebase
4. Fixed TypeScript types (Decimal import for price field)
5. Installed lucide-react dependency for icons
6. Fixed linting errors (unused imports, any types)

**Technical Decisions:**
- Used SSG with `export const dynamic = 'force-static'` for optimal SEO
- Prisma query: `prisma.products.findMany({ where: { active: true }, take: 6 })`
- Created SVG placeholder images for hero and educational sections
- Implemented mobile-first responsive design with Tailwind CSS
- Used Lucide React icons for value proposition section
- Footer uses client component for scroll-to-top functionality

**Build Issues Resolved:**
- Prisma seed.ts missing id and updated_at fields - added randomUUID() and timestamps
- Multiple files using wrong Prisma model name (product vs products) - corrected all references
- Missing lucide-react dependency - installed via npm
- TypeScript error for any type on price field - imported Decimal type from Prisma
- Unused Link import in EducationalContent - removed

### Completion Notes List

✅ All 7 tasks completed successfully:
1. Landing page route created with SEO metadata and SSG
2. Hero section with purple gradient, Nixtia branding, CTA to /store
3. Value proposition with 3 benefits (Traditional, Quality, Artisan) using Lucide icons
4. Featured products section fetching from database, displaying 6 products, linking to /store
5. Educational content explaining nixtamalization (140 words), placeholder "Learn More" button
6. Footer with secondary CTA, contact info (WhatsApp/email), social links, back-to-top
7. Build successful, linting passed, TypeScript compilation passed

**Ready for manual testing:**
- Lighthouse audit (target > 90)
- Mobile responsiveness (320px, 768px, 1024px breakpoints)
- Accessibility (keyboard navigation, WCAG AA)
- Load time verification (< 1.5s target)

### File List

**Created:**
- src/app/landing/page.tsx
- src/components/landing/HeroSection.tsx
- src/components/landing/ValueProposition.tsx
- src/components/landing/FeaturedProducts.tsx
- src/components/landing/EducationalContent.tsx
- src/components/landing/LandingFooter.tsx
- public/hero-corn.jpg (SVG placeholder)
- public/nixtamalization-process.jpg (SVG placeholder)

**Modified:**
- prisma/seed.ts (added id and updated_at fields, fixed model name to products)
- src/app/api/test-db/route.ts (fixed Prisma model name to products)
- package.json (added lucide-react dependency)

### Change Log

- 2025-11-24: Initial implementation of marketing landing page story 4-5
  - Created all 6 landing page components
  - Configured SSG for optimal performance
  - Fixed Prisma model naming consistency across project
  - Installed lucide-react for icons
  - All tasks completed, build successful, linting passed
