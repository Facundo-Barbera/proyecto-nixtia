# Recommendations

## Immediate Actions Required

**IMMEDIATE-001: Create Epic Breakdown (MANDATORY)**

- **Action:** Run `/bmad:bmm:workflows:create-epics-and-stories` workflow
- **Rationale:** Critical gap blocks implementation, progress tracking, acceptance criteria, estimation
- **Validation:**
  1. Verify epic structure covers all 59 functional requirements (FR1-FR59)
  2. Verify stories include acceptance criteria mapped to FR requirements and architecture patterns
  3. Verify epic sequencing considers dependencies (Epic 0 → Epic 1 → Epic 2 → Epic 3 → Epic 4)
  4. Verify effort estimates align with 2-3 day demo timeline (may need to ruthlessly scope MVP)
  5. Verify Sprint 0 epic includes 3 test design stories (15 hours: test framework, observability, resilience)
- **Acceptance Criteria:** Epic breakdown exists, all FRs mapped to stories, dependencies documented, effort estimated
- **Blocker:** Cannot proceed to sprint-planning or implementation without this step

**IMMEDIATE-002: Re-Run Implementation Readiness Check**

- **Action:** Re-run `/bmad:bmm:workflows:implementation-readiness` after epic breakdown complete
- **Rationale:** Validate PRD ↔ Stories coverage, Architecture ↔ Stories implementation check (currently blocked)
- **Validation:**
  1. Verify all PRD requirements (FR1-FR59) have implementing stories
  2. Verify no PRD requirements are missing story coverage
  3. Verify stories don't include scope beyond PRD MVP boundaries
  4. Verify story technical tasks align with architecture patterns
  5. Verify infrastructure stories exist for architecture components (Supabase setup, Stripe Connect, database migrations, RLS policies)
  6. Verify Sprint 0 stories implement test design recommendations (test framework, observability, resilience)
- **Acceptance Criteria:** Implementation readiness check status changes from NOT READY to READY or READY WITH CONDITIONS
- **Blocker:** Cannot proceed to Phase 3 (Implementation) until readiness check PASSES

## Suggested Improvements

**IMPROVE-001: Create UX Design Specification (PREFERRED)**

- **Action:** Run `/bmad:bmm:workflows:create-ux-design` workflow
- **Rationale:** Reduces risk of inconsistent UX interpretation, validates elder-friendly goal, ensures brand identity consistency
- **Scope:**
  1. Create wireframes for key flows: Product catalog, cart, checkout (3 payment methods), order confirmation, admin dashboard (3 analytics widgets)
  2. Define visual design system: Color palette (purple shades, neutrals), typography scale (TAN Headline usage), spacing scale (8px base), component variants
  3. Specify accessibility details: Font size minimums (18px+ body text for elder-friendly), touch target dimensions (44px+ per PRD mobile-first patterns), color contrast ratios (4.5:1 text, 3:1 large text), focus indicators (visible keyboard navigation)
  4. Define key interactions: 30-second checkout flow (minimize form fields, clear CTAs), real-time cart feedback (toast notifications), one-click add to cart (no confirmation modals)
- **Acceptance Criteria:** UX design document exists with wireframes, visual design system, accessibility specs, interaction patterns
- **Priority:** Preferred but not blocking (can proceed with conditional approval using PRD principles if time-constrained)

**IMPROVE-002: Add Database Index for Product Filtering (MINOR)**

- **Action:** Add `CREATE INDEX idx_products_is_active ON products(is_active)` to database migration in Epic 0
- **Rationale:** Optimize product catalog queries (RLS policy filters `is_active = true` per arch:330-332)
- **Effort:** 5 minutes (one line in migration file)
- **Impact:** Minor performance improvement for product catalog (FR11: view all available products)
- **Priority:** Low (nice-to-have, not blocking)

**IMPROVE-003: Validate Stripe Webhook Requirement (SCOPE CLARIFICATION)**

- **Action:** Confirm with product owner whether Stripe payment confirmation flow is required for MVP demo
- **Rationale:** Architecture marks webhooks as "post-demo" but may be needed for complete payment flow
- **Options:**
  1. **If required for demo:** Add webhook implementation story to Epic 3 (Checkout & Payment)
  2. **If not required for demo:** Manual payment verification acceptable, implement webhooks in post-demo phase
- **Decision Criteria:** Does MVP demo need to show complete payment confirmation flow (Stripe webhook → order status update) or is manual verification acceptable?
- **Priority:** Medium (scope clarification, may affect Epic 3 stories)

## Sequencing Adjustments

**SEQUENCE-001: Epic Dependency Validation**

- **Recommendation:** After epic breakdown, validate sequencing considers:
  1. **Technical Dependencies:**
     - Epic 2 (Shopping Cart) depends on Epic 1 (Product Catalog) - cannot add items to cart without products
     - Epic 3 (Checkout & Payment) depends on Epic 2 (Shopping Cart) - cannot checkout without cart
     - Epic 4 (Admin Dashboard) depends on Epic 3 (Checkout & Payment) - need orders to display in analytics
     - All epics depend on Epic 0 (Project Setup & Infrastructure) - foundation for everything
  2. **Value Delivery Priority:**
     - Epic 3 (Checkout & Payment) is highest value for demo - proves complete customer journey
     - Epic 4 (Admin Dashboard) is second highest - demonstrates business intelligence value prop
     - Epic 1 (Product Catalog) and Epic 2 (Shopping Cart) are enablers for Epic 3
  3. **Risk Mitigation:**
     - Validate elder-friendly UX early (Epic 1 Story 1 product catalog is first customer-facing screen)
     - Test Stripe integration early (Epic 3 includes payment complexity)
     - Implement observability/resilience in Sprint 0 (foundation for reliability)
  4. **Parallel Work Opportunities:**
     - Epic 5 (Landing Page) is independent - can be developed in parallel if resources allow
     - Epic 4 (Admin Dashboard) partially independent - can start after Epic 0, doesn't strictly need Epic 3 orders (can use seeded demo data)
- **Acceptance Criteria:** Epic sequence documented with explicit dependencies, critical path identified for 2-3 day demo

**SEQUENCE-002: Critical Path Scoping for 2-3 Day Demo**

- **Recommendation:** Ruthlessly scope MVP to fit 2-3 day constraint (16-24 hours total)
- **Analysis:**
  - **Total Sequential Effort (All Epics):** 85-110 hours
  - **Available Time (2-3 Days):** 16-24 hours (assuming 8-hour days)
  - **Implication:** Can only complete ~20-30% of planned work in demo timeline
- **Scoping Recommendations:**
  1. **MUST HAVE (Critical Path for Demo):**
     - Epic 0: Infrastructure (database, Supabase, Stripe setup) - ~8-10 hours
     - Epic 1: Product Catalog (browse, detail page) - ~6-8 hours
     - Epic 2: Shopping Cart (add to cart, cart page) - ~4-6 hours
     - Epic 3: Checkout (one payment method only - bank transfer or Stripe, not all three) - ~8-10 hours
     - Epic 4: Admin Dashboard (one analytics widget only - revenue chart) - ~4-6 hours
     - **Total:** ~30-40 hours (STILL EXCEEDS 2-3 DAY CONSTRAINT)
  2. **FURTHER SCOPING REQUIRED:**
     - **Option A (Minimum Viable Demo):** Epic 0 + Epic 1 (browse only, no detail page) + Epic 2 (add to cart only, no cart page) + Epic 3 (checkout with bank transfer only, simplest payment method) + Epic 4 (revenue chart only) = ~20-25 hours
     - **Option B (Focus on Customer Journey):** Epic 0 + Epic 1 + Epic 2 + Epic 3 (checkout with Stripe for impressive demo) = ~26-34 hours (SKIP Epic 4 admin dashboard if time-constrained)
     - **Option C (Focus on Business Intelligence):** Epic 0 + Epic 1 (browse seeded products) + Epic 4 (all 3 analytics widgets with seeded demo data) = ~18-24 hours (SKIP Epic 2 and Epic 3 checkout if showcasing analytics only)
  3. **NICE TO HAVE (Only if time allows):**
     - Epic 3: Multiple payment methods (bank transfer + cash/card on delivery + Stripe) - defer to post-demo
     - Epic 4: Multiple analytics widgets (transaction table, payment breakdown) - focus on revenue chart only for demo
     - Epic 5: Landing Page - defer to post-demo
- **Decision Criteria:** Align with product owner on demo goal:
  - **Customer Journey Demo:** Prove complete browse → cart → checkout flow (prioritize Epics 1-3)
  - **Business Intelligence Demo:** Prove analytics value prop (prioritize Epic 4, use seeded data)
  - **Full MVP Demo:** Showcase both customer journey + analytics (may need >3 days)
- **Acceptance Criteria:** MVP scope aligned with 2-3 day constraint, product owner approves scoping decision

---
