# Story 2.1: Verify Landing Page Renders Correctly

Status: in-progress

## Story

As a **visitor**,
I want to **see a fully functional landing page**,
so that **I understand what Nixtia offers and can navigate to the store**.

## Acceptance Criteria

1. **AC-2.1.1**: Hero section renders with "Nixtia" branding
   - Given the landing page loads
   - When viewing the hero section
   - Then "Nixtia" text is visible with proper styling

2. **AC-2.1.2**: "Shop Now" CTA button is functional
   - Given the hero section is visible
   - When clicking "Shop Now"
   - Then user navigates to `/store`

3. **AC-2.1.3**: Value proposition section renders
   - Given the landing page loads
   - Then the value proposition section displays brand messaging

4. **AC-2.1.4**: Featured products display 6 items
   - Given active products exist in database
   - When the landing page loads
   - Then exactly 6 product cards are displayed

5. **AC-2.1.5**: Educational content renders
   - Given the landing page loads
   - Then nixtamalization educational content is visible

6. **AC-2.1.6**: Footer renders with navigation
   - Given the landing page loads
   - Then footer displays contact info and navigation links

7. **AC-2.1.7**: Page loads under 2 seconds
   - Given mobile 4G network conditions
   - When navigating to `/landing`
   - Then page is interactive within 2 seconds

8. **AC-2.1.8**: Lighthouse score exceeds 85
   - Given a Lighthouse audit is run
   - Then Performance score is > 85

9. **AC-2.1.9**: No console errors
   - Given the landing page loads
   - Then browser console shows no errors or warnings

10. **AC-2.1.10**: Images load without layout shift
    - Given the landing page loads
    - Then all images appear without causing visible layout shifts (CLS < 0.1)

## Tasks / Subtasks

- [ ] **Task 1: Hero Section Verification** (AC: 2.1.1, 2.1.2)
  - [ ] Navigate to `/landing` and verify hero section renders
  - [ ] Confirm "Nixtia" branding is visible with proper styling
  - [ ] Click "Shop Now" button and verify navigation to `/store`
  - [ ] Test navigation back to landing page works

- [ ] **Task 2: Section Rendering Verification** (AC: 2.1.3, 2.1.5, 2.1.6)
  - [ ] Verify Value Proposition section displays brand messaging
  - [ ] Verify Educational Content section shows nixtamalization info
  - [ ] Verify Footer displays contact info and navigation links
  - [ ] Check all internal links in footer navigate correctly

- [ ] **Task 3: Featured Products Verification** (AC: 2.1.4)
  - [ ] Verify exactly 6 product cards display from Supabase
  - [ ] Check Network tab confirms Supabase request succeeds
  - [ ] Verify product images, names, and prices display correctly
  - [ ] Test with < 6 products in DB (graceful degradation)

- [ ] **Task 4: Performance Audit** (AC: 2.1.7, 2.1.8, 2.1.10)
  - [ ] Run Lighthouse audit in Chrome DevTools (Performance, Accessibility, Best Practices)
  - [ ] Verify Performance score > 85
  - [ ] Verify CLS < 0.1 (no layout shift)
  - [ ] Test page load time under simulated mobile 4G (< 2 seconds)
  - [ ] Check LCP < 2.5 seconds and FCP < 1.5 seconds

- [ ] **Task 5: Console and Error Verification** (AC: 2.1.9)
  - [ ] Open browser DevTools Console
  - [ ] Refresh landing page and observe console output
  - [ ] Verify no errors or warnings appear
  - [ ] Check Network tab for any failed requests (404s, 500s)

- [ ] **Task 6: Cross-Browser Verification**
  - [ ] Test landing page in Chrome (primary)
  - [ ] Test landing page in Firefox (secondary)
  - [ ] Verify consistent rendering across browsers

- [ ] **Task 7: Document Verification Results**
  - [ ] Record Lighthouse scores in Completion Notes
  - [ ] Note any warnings or minor issues observed
  - [ ] Capture screenshots if needed for documentation

## Dev Notes

### Verification Context

This is a **verification story** - no code changes expected. The goal is to validate that the landing page renders correctly after Epic 1's Prisma-to-Supabase migration.

**Why This Matters:**
- Epic 1 modified data access patterns for all pages
- Landing page uses Server Components with Supabase for featured products
- This verification confirms migration didn't break landing page functionality

### Architecture Context

**Components Under Test:**
| Component | Path | Responsibility |
|-----------|------|----------------|
| Landing Page | `src/app/landing/page.tsx` | Server component, fetches 6 featured products |
| HeroSection | `src/components/landing/HeroSection.tsx` | Static hero with "Shop Now" CTA |
| ValueProposition | `src/components/landing/ValueProposition.tsx` | Brand messaging |
| FeaturedProducts | `src/components/landing/FeaturedProducts.tsx` | Product grid (receives products prop) |
| EducationalContent | `src/components/landing/EducationalContent.tsx` | Nixtamalization education |
| LandingFooter | `src/components/landing/LandingFooter.tsx` | Footer with navigation |

**Data Flow:**
```
1. User navigates to /landing
2. Server Component executes
3. createClient() initializes Supabase server client
4. Query: products table (6 active, ordered by created_at DESC)
5. Render page with all sections
```

**Supabase Query (from page.tsx):**
```typescript
const { data: products } = await supabase
  .from('products')
  .select('id, name, description, price, image_url')
  .eq('is_active', true)
  .order('created_at', { ascending: false })
  .limit(6);
```

### Performance Targets

| Metric | Target | Source |
|--------|--------|--------|
| Lighthouse Performance | > 85 | Tech Spec AC-2.1.8 |
| Load Time (mobile 4G) | < 2 seconds | PRD Performance |
| First Contentful Paint | < 1.5 seconds | Core Web Vitals |
| Largest Contentful Paint | < 2.5 seconds | Core Web Vitals |
| Cumulative Layout Shift | < 0.1 | Core Web Vitals |
| Time to Interactive | < 3 seconds | PRD Performance |

### Project Structure Notes

**Expected Static Generation:**
- Landing page should use `export const dynamic = 'force-static'`
- ISR or static generation for optimal performance
- Hero image should have `priority` flag for preloading

**Supabase Configuration (from Story 1.6):**
- Uses new key format: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Server client in `src/lib/supabase/server.ts`
- Environment variables in `.env.local`

### Learnings from Previous Story

**From Story 1-6-build-verification-and-clean-state (Status: done, APPROVED)**

- **Epic 1 Complete**: All Prisma dependencies removed, Supabase-only data access confirmed
- **Build Pipeline Verified**: `npm run build` and `npm run lint` pass without errors
- **New Supabase Key Format**: Uses `PUBLISHABLE_KEY` (not legacy `ANON_KEY`)
- **Environment Config**: `.env.example` and `.env.local` created
- **Minor Note**: Middleware deprecation warning (Next.js 16) - non-blocking
- **Query Patterns Established**: `createClient()`, `{ data, error }` handling, snake_case columns

**Files Relevant to This Story:**
- `src/app/landing/page.tsx` - Landing page (migrated in Story 1.3)
- `src/lib/supabase/server.ts` - Supabase server client (unchanged)

[Source: docs/sprint-artifacts/epic-1/1-6-build-verification-and-clean-state.md#Dev-Agent-Record]

### References

- [Source: docs/sprint-artifacts/tech-spec-epic-2.md#story-21-verify-landing-page-renders-correctly] - Detailed AC specifications
- [Source: docs/planning/epics/epic-2-landing-page-demo-ready.md#story-21-verify-landing-page-renders-correctly] - Epic story definition
- [Source: docs/sprint-artifacts/epic-1/1-6-build-verification-and-clean-state.md] - Previous story learnings
- [Source: docs/planning/architecture/critical-architecture-decision-supabase-only-data-layer.md] - ADR-001 decision record

## Dev Agent Record

### Context Reference

- [2-1-verify-landing-page-renders-correctly.context.xml](docs/sprint-artifacts/epic-2/2-1-verify-landing-page-renders-correctly.context.xml)

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

**2025-11-25 - Verification Plan:**
1. Verify component files exist and have correct structure
2. Start dev server and create E2E tests with Playwright for automated verification
3. Run tests to verify: Hero section, navigation, featured products, all sections
4. Manual verification tasks (Lighthouse) will be documented with guidance
5. Update story file with verification results

### Completion Notes List

### File List

---

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2025-11-25 | SM Agent | Initial story draft created via create-story workflow |
