# Epic 2: Landing Page Demo-Ready

**Goal:** Polish the landing page to demo-ready state - something you can show off while other features are in development.

**User Value:** Visitors get a polished first impression of Nixtia. You have a demo-ready artifact early in the sprint.

**FR Coverage:** FR55-59 (landing page features)

---

## Story 2.1: Verify Landing Page Renders Correctly

As a **visitor**,
I want to **see a fully functional landing page**,
So that **I understand what Nixtia offers**.

**Acceptance Criteria:**

**Given** Epic 1 is complete (Prisma removed, Supabase working)
**When** the visitor navigates to `/landing`
**Then** all sections render correctly:
- Hero section with "Nixtia" branding and "Shop Now" CTA
- Value proposition section
- Featured products (6 items from database)
- Educational content about nixtamalization
- Footer with navigation

**And** "Shop Now" button navigates to `/store`
**And** page loads in < 2 seconds on mobile 4G
**And** no console errors or warnings
**And** images load progressively (no layout shift)

**Prerequisites:** Epic 1 complete

**Technical Notes:**
- This is verification that Epic 1 migration didn't break anything
- Test on mobile viewport (most traffic expected from mobile)
- Check Lighthouse score (target > 85)

---

## Story 2.2: Add Social Media Links

As a **visitor**,
I want to **find Nixtia's social media profiles**,
So that **I can follow and engage with the brand**.

**Acceptance Criteria:**

**Given** the landing page footer
**When** the visitor looks for social links
**Then** they see icons/links for:
- Instagram (primary social for food brands)
- Facebook (optional)
- WhatsApp (for direct contact - Mexico standard)

**And** links open in new tab (`target="_blank"`)
**And** links have proper `rel="noopener noreferrer"` for security
**And** icons are accessible (aria-label for screen readers)
**And** icons match the purple brand color scheme

**Prerequisites:** Story 2.1

**Technical Notes:**
- Update `LandingFooter.tsx` component
- Use Lucide icons (already installed) for social icons
- Placeholder URLs acceptable for demo (e.g., `https://instagram.com/nixtia`)

---

## Story 2.3: Landing Page Polish and Demo-Ready State

As a **business owner**,
I want to **show off a polished landing page**,
So that **I can demonstrate progress to stakeholders**.

**Acceptance Criteria:**

**Given** all landing page components working
**When** reviewing for demo readiness
**Then** verify:
- All text is spelled correctly (no Lorem Ipsum)
- Images are high quality and relevant
- Brand colors are consistent (purple theme)
- Mobile layout looks professional
- No broken links or missing images
- Page is responsive at all breakpoints (320px to 1440px)

**And** create a simple "demo script":
- What to click
- What to show
- Key value propositions to highlight

**And** document any known issues that won't affect demo

**Prerequisites:** Story 2.1, Story 2.2

**Technical Notes:**
- This is a polish pass, not new features
- Focus on visual quality and user experience
- Take screenshots for documentation

---

## Story 2.4: Move Landing Page to Root URL

As a **visitor**,
I want to **access the landing page at the site root (`/`)**,
So that **I have a conventional, intuitive entry point to the site**.

**Acceptance Criteria:**

**Given** a user navigates to `/`
**Then** the landing page renders correctly
**And** the `/landing` route redirects 301 to `/` (preserves bookmarks)
**And** all internal links updated to point to `/`

**Prerequisites:** Story 2.1

**Technical Notes:**
- Move `src/app/landing/page.tsx` → `src/app/page.tsx`
- Add redirect in `next.config.js` or middleware: `/landing` → `/`
- Update Hero CTA and footer links if any reference `/landing`
- Quick win: 30-60 min implementation

---

## Epic 2 Summary

| Story | Title | Dependencies |
|-------|-------|--------------|
| 2.1 | Verify Landing Page Renders Correctly | Epic 1 |
| 2.2 | Add Social Media Links | 2.1 |
| 2.3 | Landing Page Polish and Demo-Ready State | 2.1, 2.2 |
| 2.4 | Move Landing Page to Root URL | 2.1 |

**Output:** Demo-ready landing page you can show off

---
