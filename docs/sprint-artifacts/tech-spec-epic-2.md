# Epic Technical Specification: Landing Page Demo-Ready

Date: 2025-11-25
Author: Facundo
Epic ID: 2
Status: Draft

---

## Overview

Epic 2 focuses on polishing the existing landing page to a demo-ready state. Following the completion of Epic 1 (Database Migration from Prisma to Supabase), this epic ensures the marketing landing page renders correctly, includes social media integration, and presents a professional appearance suitable for stakeholder demonstrations. The landing page serves as the first touchpoint for visitors, communicating Nixtia's value proposition as an artisan nixtamalized corn products vendor.

The existing implementation already includes the five-section structure (Hero, Value Proposition, Featured Products, Educational Content, Footer) with Supabase integration for product data. This epic validates the post-migration state and adds finishing touches for demo readiness.

## Objectives and Scope

**In-Scope:**
- Verify all landing page sections render correctly after Epic 1 migration
- Validate Hero section with "Nixtia" branding and "Shop Now" CTA functionality
- Ensure clear navigation paths to store from landing page (Hero CTA, Footer CTA, Navigation links)
- Confirm featured products section loads 6 active products from Supabase
- Add social media links (Instagram, Facebook, WhatsApp) to footer
- Update favicon with Nixtia logo (from `docs/nixtia-assets/logo-1.png` or `logo-2.png`)
- Implement accessibility attributes for social links (aria-labels)
- Ensure proper security attributes on external links (`target="_blank"`, `rel="noopener noreferrer"`)
- Visual polish pass for brand consistency (purple theme)
- Verify responsive layout across breakpoints (320px to 1440px)
- Performance validation (< 2 seconds load time on mobile 4G, Lighthouse > 85)
- Create demo script documentation

**Out-of-Scope:**
- New landing page sections or features
- Content management system for landing page
- A/B testing infrastructure
- Analytics integration (deferred to future sprint)
- Internationalization/localization
- Dynamic content personalization

## System Architecture Alignment

This epic operates within the established architecture:

**Components Referenced:**
- `src/app/landing/page.tsx` - Server component fetching featured products via Supabase
- `src/components/landing/HeroSection.tsx` - Static hero with CTA to `/store`
- `src/components/landing/ValueProposition.tsx` - Brand value presentation
- `src/components/landing/FeaturedProducts.tsx` - Receives products prop from page
- `src/components/landing/EducationalContent.tsx` - Nixtamalization education
- `src/components/landing/LandingFooter.tsx` - Footer with contact and social links (primary modification target)

**Architecture Constraints:**
- Supabase-only data layer (no Prisma) - ADR-001
- Server Components for initial data fetch (products)
- Static generation preferred (`export const dynamic = 'force-static'`) for landing page
- shadcn/ui + Tailwind CSS for styling
- Lucide React for icons (already installed and used in footer)

## Detailed Design

### Services and Modules

| Module | Responsibility | Input | Output |
|--------|---------------|-------|--------|
| `src/app/landing/page.tsx` | Server component orchestrating landing page, fetches featured products | None (server-rendered) | Rendered landing page with product data |
| `src/components/landing/HeroSection.tsx` | Hero display with branding and primary CTA | None | JSX with "Shop Now" link to `/store` |
| `src/components/landing/ValueProposition.tsx` | Brand value messaging | None | Static JSX content |
| `src/components/landing/FeaturedProducts.tsx` | Product showcase grid | `products: Product[]` | Product cards with images, names, prices |
| `src/components/landing/EducationalContent.tsx` | Nixtamalization education | None | Static JSX content |
| `src/components/landing/LandingFooter.tsx` | Footer with CTA, contact info, social links | None | JSX with external links |
| `src/lib/supabase/server.ts` | Server-side Supabase client factory | None | Configured Supabase client |

### Data Models and Contracts

**Product (from Supabase `products` table):**

```typescript
interface Product {
  id: string;           // UUID primary key
  name: string;         // Product display name
  description: string;  // Product description
  price: number;        // Price in MXN (decimal)
  image_url: string;    // URL to product image
  is_active: boolean;   // Active status for filtering
  created_at: string;   // Timestamp for ordering
}
```

**Query for Featured Products:**
```typescript
const { data: products } = await supabase
  .from('products')
  .select('id, name, description, price, image_url')
  .eq('is_active', true)
  .order('created_at', { ascending: false })
  .limit(6);
```

### APIs and Interfaces

This epic does not introduce new API endpoints. All data fetching uses existing Supabase queries via Server Components.

**Existing Supabase Query (landing page):**
- **Method:** SELECT via PostgREST
- **Table:** `products`
- **Filters:** `is_active = true`
- **Order:** `created_at DESC`
- **Limit:** 6 items
- **Response:** Array of Product objects or empty array on error

**External Links (social media):**
| Platform | URL Pattern | Security |
|----------|-------------|----------|
| Instagram | `https://instagram.com/nixtia` | `target="_blank" rel="noopener noreferrer"` |
| Facebook | `https://facebook.com/nixtia` | `target="_blank" rel="noopener noreferrer"` |
| WhatsApp | `https://wa.me/5215512345678` | `target="_blank" rel="noopener noreferrer"` |

### Workflows and Sequencing

**Landing Page Load Flow:**

```
1. User navigates to /landing
   │
2. Next.js Server Component executes
   │
3. createClient() initializes Supabase server client
   │
4. Query products table (6 active products)
   │
5. Render page with sections:
   ├─ HeroSection (static)
   ├─ ValueProposition (static)
   ├─ FeaturedProducts (with product data)
   ├─ EducationalContent (static)
   └─ LandingFooter (static + social links)
   │
6. Return HTML to browser (static generation)
```

**User Navigation to Store:**

```
1. User views landing page
   │
2. User clicks one of:
   ├─ "Shop Now" button (Hero)
   ├─ "Start Shopping" button (Footer CTA)
   └─ "Shop Products" link (Footer navigation)
   │
3. Next.js client-side navigation to /store
```

## Non-Functional Requirements

### Performance

| Metric | Target | Source |
|--------|--------|--------|
| Landing page load time (mobile 4G) | < 2 seconds | PRD Performance Requirements |
| Lighthouse Performance score | > 85 | Epic 2 Story 2.1 |
| First Contentful Paint (FCP) | < 1.5 seconds | Industry standard |
| Largest Contentful Paint (LCP) | < 2.5 seconds | Core Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Core Web Vitals |
| Time to Interactive (TTI) | < 3 seconds | PRD Performance Requirements |

**Implementation Notes:**
- Static generation (`force-static`) ensures fast initial load
- Hero image uses `priority` flag for preloading
- Product images should use Next.js Image component with lazy loading
- No client-side JavaScript required for initial render (Server Components)

### Security

| Requirement | Implementation | Source |
|-------------|----------------|--------|
| External link security | `rel="noopener noreferrer"` on all `target="_blank"` links | OWASP, Epic 2 Story 2.2 |
| XSS prevention | No user input on landing page; React auto-escapes | PRD Security |
| HTTPS enforcement | Vercel/deployment platform handles TLS | PRD Security |
| Aria-labels for accessibility | Required on icon-only social links | Epic 2 Story 2.2 |

**Social Links Security Checklist:**
- [ ] All external links use `target="_blank"`
- [ ] All external links include `rel="noopener noreferrer"`
- [ ] No sensitive data exposed in URLs
- [ ] WhatsApp link uses proper `wa.me` format

### Reliability/Availability

| Requirement | Target | Notes |
|-------------|--------|-------|
| Page availability | 99.9% uptime | Vercel SLA (deployment platform) |
| Graceful degradation | Page renders even if products fail to load | Empty array fallback in place |
| Error logging | Console.error for Supabase failures | Already implemented |
| Static fallback | Cached version served during outages | Static generation benefit |

**Error Handling:**
- Products query failure: Page renders with empty product grid (no crash)
- Image load failure: Browser default behavior (broken image icon acceptable for demo)
- Navigation failure: Standard Next.js error handling

### Observability

| Signal | Implementation | Purpose |
|--------|----------------|---------|
| Console errors | `console.error` on Supabase failures | Debug product fetch issues |
| Lighthouse audit | Manual run during Story 2.1 | Performance validation |
| Browser DevTools | Network tab inspection | Load time verification |
| Vercel Analytics | Optional (not MVP scope) | Future traffic insights |

**Demo Validation Signals:**
- No console errors or warnings during page load
- Network tab shows successful Supabase query
- All images load without 404 errors
- Navigation to `/store` works correctly

## Dependencies and Integrations

### NPM Dependencies (from package.json)

**Core Framework:**
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.0.3 | App Router, Server Components, Image optimization |
| `react` | 19.2.0 | UI rendering |
| `react-dom` | 19.2.0 | DOM rendering |
| `typescript` | ^5 | Type safety |

**Supabase Integration:**
| Package | Version | Purpose |
|---------|---------|---------|
| `@supabase/supabase-js` | 2.84.0 | Supabase client for product queries |
| `@supabase/ssr` | 0.7.0 | Server-side rendering support |

**UI & Styling:**
| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^4 | Utility-first CSS |
| `lucide-react` | 0.554.0 | Icon library (social media icons) |
| `clsx` | 2.1.1 | Conditional classNames |
| `tailwind-merge` | 3.4.0 | Tailwind class merging |
| `class-variance-authority` | 0.7.1 | Component variants |

**No new dependencies required for Epic 2** - all necessary packages are already installed.

### External Service Integrations

| Service | Integration Point | Epic 2 Usage |
|---------|-------------------|--------------|
| Supabase | `products` table query | Fetch 6 featured products |
| Instagram | External link | Placeholder URL in footer |
| Facebook | External link | Placeholder URL in footer |
| WhatsApp | External link (`wa.me`) | Contact link in footer |

### Internal Module Dependencies

```
src/app/landing/page.tsx
├── @/lib/supabase/server (createClient)
├── @/components/landing/HeroSection
├── @/components/landing/ValueProposition
├── @/components/landing/FeaturedProducts
├── @/components/landing/EducationalContent
└── @/components/landing/LandingFooter
    ├── next/link (Link)
    ├── @/components/ui/button (Button)
    └── lucide-react (Mail, Phone, Facebook, Instagram, Twitter)
```

### Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key (public) |

No new environment variables required for Epic 2.

## Acceptance Criteria (Authoritative)

### Story 2.1: Verify Landing Page Renders Correctly

| AC# | Acceptance Criterion | Testable Statement |
|-----|---------------------|-------------------|
| AC-2.1.1 | Hero section renders with "Nixtia" branding | Given the landing page loads, when viewing the hero section, then "Nixtia" text is visible with proper styling |
| AC-2.1.2 | "Shop Now" CTA button is functional | Given the hero section is visible, when clicking "Shop Now", then user navigates to `/store` |
| AC-2.1.3 | Value proposition section renders | Given the landing page loads, then the value proposition section displays brand messaging |
| AC-2.1.4 | Featured products display 6 items | Given active products exist in database, when the landing page loads, then exactly 6 product cards are displayed |
| AC-2.1.5 | Educational content renders | Given the landing page loads, then nixtamalization educational content is visible |
| AC-2.1.6 | Footer renders with navigation | Given the landing page loads, then footer displays contact info and navigation links |
| AC-2.1.7 | Page loads under 2 seconds | Given mobile 4G network conditions, when navigating to `/landing`, then page is interactive within 2 seconds |
| AC-2.1.8 | Lighthouse score exceeds 85 | Given a Lighthouse audit is run, then Performance score is > 85 |
| AC-2.1.9 | No console errors | Given the landing page loads, then browser console shows no errors or warnings |
| AC-2.1.10 | Images load without layout shift | Given the landing page loads, then all images appear without causing visible layout shifts (CLS < 0.1) |

### Story 2.2: Add Social Media Links

| AC# | Acceptance Criterion | Testable Statement |
|-----|---------------------|-------------------|
| AC-2.2.1 | Instagram link present | Given the footer is visible, then an Instagram icon/link is displayed |
| AC-2.2.2 | Facebook link present (optional) | Given the footer is visible, then a Facebook icon/link is displayed |
| AC-2.2.3 | WhatsApp link present | Given the footer is visible, then a WhatsApp icon/link is displayed |
| AC-2.2.4 | Links open in new tab | Given any social link is clicked, then a new browser tab opens |
| AC-2.2.5 | Security attributes present | Given the page HTML is inspected, then all social links have `rel="noopener noreferrer"` |
| AC-2.2.6 | Accessibility labels present | Given a screen reader parses the page, then each social icon has an `aria-label` describing the platform |
| AC-2.2.7 | Icons match brand colors | Given the footer is visible, then social icons use the purple brand color scheme |

### Story 2.3: Landing Page Polish and Demo-Ready State

| AC# | Acceptance Criterion | Testable Statement |
|-----|---------------------|-------------------|
| AC-2.3.1 | No Lorem Ipsum text | Given the landing page is reviewed, then all visible text is real content (no placeholder text) |
| AC-2.3.2 | Images are high quality | Given all images are inspected, then no pixelated or low-resolution images appear |
| AC-2.3.3 | Brand colors consistent | Given all sections are viewed, then purple theme colors are consistently applied |
| AC-2.3.4 | Mobile layout professional | Given viewport is set to 375px width, then layout appears professional with no overflow |
| AC-2.3.5 | No broken links | Given all links are clicked, then no 404 or error pages appear |
| AC-2.3.6 | Responsive at all breakpoints | Given viewport widths 320px, 768px, 1024px, 1440px are tested, then layout adapts correctly |
| AC-2.3.7 | Demo script created | Given epic is complete, then a demo script document exists describing what to show |
| AC-2.3.8 | Favicon updated with Nixtia logo | Given the browser tab is viewed, then the favicon displays the Nixtia logo |

## Traceability Mapping

| AC | Spec Section | Component(s) | Test Approach |
|----|--------------|--------------|---------------|
| AC-2.1.1 | Detailed Design > HeroSection | `HeroSection.tsx` | Visual inspection, snapshot test |
| AC-2.1.2 | Workflows > Navigation | `HeroSection.tsx`, Next.js Link | E2E navigation test |
| AC-2.1.3 | Detailed Design > ValueProposition | `ValueProposition.tsx` | Visual inspection, snapshot test |
| AC-2.1.4 | Data Models > Product Query | `page.tsx`, `FeaturedProducts.tsx` | Integration test with Supabase mock |
| AC-2.1.5 | Detailed Design > EducationalContent | `EducationalContent.tsx` | Visual inspection |
| AC-2.1.6 | Detailed Design > LandingFooter | `LandingFooter.tsx` | Visual inspection |
| AC-2.1.7 | NFR > Performance | All components | Lighthouse audit, manual timing |
| AC-2.1.8 | NFR > Performance | All components | Lighthouse audit |
| AC-2.1.9 | NFR > Observability | All components | Browser DevTools console check |
| AC-2.1.10 | NFR > Performance (CLS) | All components | Lighthouse CLS metric |
| AC-2.2.1 | APIs > External Links | `LandingFooter.tsx` | Visual inspection, DOM query |
| AC-2.2.2 | APIs > External Links | `LandingFooter.tsx` | Visual inspection, DOM query |
| AC-2.2.3 | APIs > External Links | `LandingFooter.tsx` | Visual inspection, DOM query |
| AC-2.2.4 | APIs > External Links | `LandingFooter.tsx` | E2E click test, `target="_blank"` verification |
| AC-2.2.5 | NFR > Security | `LandingFooter.tsx` | DOM attribute inspection |
| AC-2.2.6 | NFR > Security | `LandingFooter.tsx` | Accessibility audit, `aria-label` check |
| AC-2.2.7 | System Architecture > Styling | `LandingFooter.tsx` | Visual inspection |
| AC-2.3.1 | Objectives > Visual Polish | All components | Manual content review |
| AC-2.3.2 | Objectives > Visual Polish | All image assets | Visual inspection at 2x zoom |
| AC-2.3.3 | System Architecture > Styling | All components | Visual inspection |
| AC-2.3.4 | NFR > Performance | All components | Mobile viewport testing |
| AC-2.3.5 | Workflows > Navigation | All Link components | E2E link verification |
| AC-2.3.6 | Objectives > Responsive | All components | Responsive testing at breakpoints |
| AC-2.3.7 | Objectives > Demo Script | Documentation | File existence check |
| AC-2.3.8 | Objectives > Favicon | `public/favicon.ico`, `app/layout.tsx` | Visual inspection in browser tab |

### FR Coverage Map

| FR ID | Description | Epic 2 Coverage |
|-------|-------------|-----------------|
| FR55 | Hero section with value proposition | AC-2.1.1, AC-2.1.2 |
| FR56 | Educational content about nixtamalization | AC-2.1.5 |
| FR57 | Product showcase with sample items | AC-2.1.4 |
| FR58 | Social media links | AC-2.2.1 through AC-2.2.7 |
| FR59 | Navigation to virtual store via CTA | AC-2.1.2 |

## Risks, Assumptions, Open Questions

### Risks

| ID | Type | Description | Impact | Likelihood | Mitigation |
|----|------|-------------|--------|------------|------------|
| R1 | Risk | Hero image `/hero-corn.jpg` may not exist or be low quality | Medium | Medium | Verify image exists in `/public`; source high-quality fallback |
| R2 | Risk | Supabase query fails silently, showing empty product grid | Low | Low | Already handled with error logging; verify fallback UX is acceptable |
| R3 | Risk | Social media placeholder URLs may confuse demo attendees | Low | Medium | Document in demo script that URLs are placeholders |
| R4 | Risk | Lighthouse score below 85 due to large images | Medium | Medium | Optimize images with Next.js Image component; verify sizes |
| R5 | Risk | Mobile layout breaks at edge breakpoints (320px) | Medium | Low | Test specifically at 320px viewport |

### Assumptions

| ID | Type | Description | Validation |
|----|------|-------------|------------|
| A1 | Assumption | Epic 1 is complete and Supabase integration is working | Verify products query succeeds |
| A2 | Assumption | At least 6 active products exist in database | Check Supabase `products` table |
| A3 | Assumption | Lucide React icons include Instagram, Facebook icons | Verify in lucide-react documentation |
| A4 | Assumption | Purple brand colors are defined in Tailwind config | Check `tailwind.config.ts` |
| A5 | Assumption | Social media accounts exist (even if placeholder) | Confirm with stakeholder |

### Open Questions

| ID | Type | Question | Owner | Resolution |
|----|------|----------|-------|------------|
| Q1 | Question | What are the actual social media URLs for Nixtia? | Facundo | Use placeholders for demo; update post-demo |
| Q2 | Question | Should WhatsApp use business or personal number? | Facundo | Use placeholder `+52 1 55 1234 5678` for demo |
| Q3 | Question | Is Twitter/X link needed in addition to Instagram/Facebook? | Facundo | Currently included in footer; confirm if needed |

## Test Strategy Summary

### Test Levels

| Level | Framework | Scope | Epic 2 Focus |
|-------|-----------|-------|--------------|
| Unit Tests | Vitest | Component logic | Not required (no complex logic) |
| Integration Tests | Vitest + Supabase mock | Data fetching | Optional: Product query test |
| E2E Tests | Playwright | User flows | Navigation tests (Hero → Store) |
| Visual Tests | Manual | UI consistency | All acceptance criteria |
| Performance Tests | Lighthouse | NFR validation | AC-2.1.7, AC-2.1.8 |
| Accessibility Tests | Lighthouse + Manual | A11y compliance | AC-2.2.6 |

### Test Coverage by Story

**Story 2.1 Tests:**
```
tests/e2e/landing.spec.ts
├── test('landing page renders all sections')
├── test('Shop Now navigates to /store')
├── test('featured products display 6 items')
└── test('no console errors on load')
```

**Story 2.2 Tests:**
```
tests/e2e/landing.spec.ts
├── test('social links have correct attributes')
├── test('social links open in new tab')
└── test('social icons have aria-labels')
```

**Story 2.3 Tests:**
```
Manual testing checklist:
├── [ ] All text is real content
├── [ ] Images are high quality
├── [ ] Brand colors consistent
├── [ ] Responsive at 320px, 768px, 1024px, 1440px
└── [ ] Demo script document created
```

### Acceptance Criteria Coverage

| Test Type | ACs Covered |
|-----------|-------------|
| E2E (Playwright) | AC-2.1.2, AC-2.1.4, AC-2.1.9, AC-2.2.4, AC-2.2.5, AC-2.3.5 |
| Performance (Lighthouse) | AC-2.1.7, AC-2.1.8, AC-2.1.10 |
| Accessibility (Lighthouse) | AC-2.2.6 |
| Visual (Manual) | AC-2.1.1, AC-2.1.3, AC-2.1.5, AC-2.1.6, AC-2.2.1-3, AC-2.2.7, AC-2.3.1-4, AC-2.3.6 |
| Documentation | AC-2.3.7 |

### Edge Cases

| Case | Test Approach |
|------|---------------|
| 0 products in database | Verify empty state renders gracefully |
| Slow network (mobile 4G) | Lighthouse throttling simulation |
| Missing hero image | Visual inspection for fallback |
| Very long product names | Check for text overflow handling |
| Small viewport (320px) | Responsive testing |

### Definition of Done (DoD) Checklist

- [ ] All sections render correctly (AC-2.1.1 through AC-2.1.6)
- [ ] "Shop Now" navigates to `/store` (AC-2.1.2)
- [ ] Page loads < 2 seconds on mobile 4G (AC-2.1.7)
- [ ] Lighthouse Performance > 85 (AC-2.1.8)
- [ ] No console errors (AC-2.1.9)
- [ ] Social links present with correct attributes (AC-2.2.1 through AC-2.2.5)
- [ ] Social icons have aria-labels (AC-2.2.6)
- [ ] No Lorem Ipsum text (AC-2.3.1)
- [ ] Responsive at all breakpoints (AC-2.3.6)
- [ ] Demo script created (AC-2.3.7)
- [ ] Favicon updated with Nixtia logo (AC-2.3.8)
- [ ] Code reviewed and merged to main

