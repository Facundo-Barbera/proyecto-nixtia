# Next Steps

## Workflow Sequencing

**Current Workflow:** implementation-readiness (solutioning-gate-check)
**Current Status:** Required - NOT COMPLETE (failing due to missing epics/stories)

**Next Workflows (in order):**

1. **IMMEDIATE NEXT:** `/bmad:bmm:workflows:create-epics-and-stories`
   - **Agent:** PM (Product Manager Agent)
   - **Input:** PRD (docs/planning/PRD/), Architecture (docs/solutioning/architecture.md), Test Design (docs/test-design-system.md for Sprint 0 stories)
   - **Output:** Epic breakdown with user stories, acceptance criteria, effort estimates, dependencies
   - **Duration:** ~2-4 hours (workflow execution)
   - **Acceptance Criteria:**
     - Epic structure covers all 59 functional requirements (FR1-FR59)
     - Stories include acceptance criteria mapped to FR requirements and architecture patterns
     - Epic sequencing documented with dependencies
     - Effort estimates align with 2-3 day demo timeline (MVP scoped)
     - Sprint 0 epic includes 3 test design stories (15 hours total)

2. **PREFERRED (If Time Allows):** `/bmad:bmm:workflows:create-ux-design`
   - **Agent:** UX Designer Agent
   - **Input:** PRD (UX principles), Architecture (implementation patterns), Epic breakdown
   - **Output:** UX design document with wireframes, visual design system, accessibility specs, interaction patterns
   - **Duration:** ~3-6 hours (workflow execution)
   - **Acceptance Criteria:**
     - Wireframes for key flows (product catalog, cart, checkout, confirmation, dashboard)
     - Visual design system defined (colors, typography, spacing, components)
     - Accessibility specs detailed (font sizes, touch targets, contrast, focus indicators)
     - Key interactions documented (30-second checkout, real-time feedback, one-click add)
   - **Alternative:** Skip if time-constrained, proceed with conditional UX approval (Option B above)

3. **RE-RUN:** `/bmad:bmm:workflows:implementation-readiness`
   - **Agent:** Architect Agent (or general-purpose agent)
   - **Input:** PRD, Architecture, Test Design, Epic breakdown, UX Design (if created)
   - **Output:** Updated implementation readiness report with PRD ↔ Stories coverage validation, Architecture ↔ Stories implementation check
   - **Duration:** ~1 hour (workflow execution)
   - **Acceptance Criteria:**
     - PRD ↔ Stories coverage validation PASSES (all FRs mapped to stories)
     - Architecture ↔ Stories implementation check PASSES (story tasks align with architecture)
     - Overall readiness status: READY or READY WITH CONDITIONS (not NOT READY)

4. **FINAL GATE:** `/bmad:bmm:workflows:sprint-planning`
   - **Agent:** SM (Scrum Master Agent)
   - **Input:** Epic breakdown, UX Design (if exists), Architecture, Test Design, Implementation Readiness Report (PASS)
   - **Output:** Sprint status tracking file (sprint-status.yaml), Sprint 0 plan, backlog prioritization
   - **Duration:** ~1 hour (workflow execution)
   - **Acceptance Criteria:**
     - Sprint status file created with all epics and stories
     - Sprint 0 plan includes test design stories (test framework, observability, resilience)
     - Backlog prioritized by epic sequence and dependencies
     - MVP scope validated for 2-3 day demo timeline

## Implementation Phase (After Sprint Planning)

**Phase 3: Implementation** (Begins after sprint-planning complete)

- **Epic 0:** Project Setup & Infrastructure (Sprint 0)
  - Story 1-8: Project init, Supabase setup, database migrations, test framework, observability, resilience, Stripe setup, Vercel deployment
  - **Duration:** ~25-30 hours (may need 3-4 days if single developer)
  - **Quality Gate:** Testability gate (API seeding works, logs output JSON, Sentry captures errors, parallel tests pass)

- **Epic 1:** Product Catalog
  - Stories: Product seeding, API routes, ProductCard, ProductGrid, detail page, availability indicator
  - **Duration:** ~15-20 hours
  - **Quality Gate:** UX review (first customer-facing screen)

- **Epic 2:** Shopping Cart
  - Stories: Zustand cart store, CartButton, CartItem, cart page
  - **Duration:** ~10-15 hours
  - **Quality Gate:** Cart state persistence validated

- **Epic 3:** Checkout & Payment
  - Stories: CheckoutForm, phone validation, PaymentMethodSelector, payment instructions, order summary, order creation API, confirmation page, Stripe payment intent API, duplicate prevention
  - **Duration:** ~20-25 hours (or ~10-12 hours if scoped to one payment method only)
  - **Quality Gate:** 30-second checkout goal validated empirically, payment flow E2E tested

- **Epic 4:** Admin Dashboard
  - Stories: Admin auth, protected middleware, admin layout, revenue chart, transaction table, payment breakdown, dashboard page
  - **Duration:** ~15-20 hours (or ~6-8 hours if scoped to one analytics widget only)
  - **Quality Gate:** Analytics display seeded demo data correctly

- **Epic 5:** Landing Page (Optional)
  - Stories: Layout, hero section, educational content, product showcase, about section, CTA
  - **Duration:** ~10-15 hours
  - **Priority:** Only if time allows after critical path (Epics 0-4) complete

**Total Implementation Effort:** 85-110 hours (all epics) OR 50-65 hours (MVP scoped for demo)
**Available Time (2-3 Days):** 16-24 hours (REQUIRES RUTHLESS SCOPING)

## Recommended Actions

**FOR FACUNDO (Product Owner/User):**

1. **DECISION REQUIRED:** UX Design Approach
   - **Option A (Preferred):** Allocate 3-6 hours for UX design workflow → Reduces risk of poor UX execution
   - **Option B (Acceptable):** Skip UX design, accept conditional UX approval risks → Faster to implementation
   - **Decision Criteria:** How critical is elder-friendly UX to demo success? Do you trust development team's UX judgment?

2. **DECISION REQUIRED:** MVP Scope for 2-3 Day Demo
   - **Analysis:** Total effort (85-110 hours) far exceeds 2-3 day constraint (16-24 hours)
   - **Scoping Options:**
     - **Option A (Customer Journey):** Focus on browse → cart → checkout flow (Epics 0-3, skip analytics dashboard)
     - **Option B (Business Intelligence):** Focus on analytics dashboard with seeded data (Epics 0, 1 browse only, 4, skip checkout)
     - **Option C (Full MVP):** Both customer journey + analytics (requires >3 days, may need 5-7 days for single developer)
   - **Decision Criteria:** What is the primary demo goal? Prove customer experience or business intelligence value prop?

3. **ACTION REQUIRED:** Run Epic Breakdown Workflow
   - **Command:** `/bmad:bmm:workflows:create-epics-and-stories`
   - **Timing:** Immediate (blocks all other work)
   - **Duration:** ~2-4 hours
   - **Output:** Epic breakdown with stories, acceptance criteria, effort estimates, dependencies

4. **ACTION OPTIONAL:** Run UX Design Workflow (If Option A Chosen)
   - **Command:** `/bmad:bmm:workflows:create-ux-design`
   - **Timing:** After epic breakdown complete
   - **Duration:** ~3-6 hours
   - **Output:** UX design document with wireframes, visual design system, accessibility specs

5. **ACTION REQUIRED:** Re-Run Implementation Readiness Check
   - **Command:** `/bmad:bmm:workflows:implementation-readiness`
   - **Timing:** After epic breakdown (and optionally UX design) complete
   - **Duration:** ~1 hour
   - **Output:** Updated readiness report with status READY or READY WITH CONDITIONS

6. **ACTION REQUIRED:** Run Sprint Planning Workflow
   - **Command:** `/bmad:bmm:workflows:sprint-planning`
   - **Timing:** After implementation readiness check PASSES
   - **Duration:** ~1 hour
   - **Output:** Sprint status file, Sprint 0 plan, backlog prioritization

**FOR DEVELOPMENT TEAM:**

1. **PREPARE:** Review Architecture Document
   - **File:** [docs/solutioning/architecture.md](docs/solutioning/architecture.md)
   - **Focus Areas:** Implementation patterns (arch:1308-1573), database schema (arch:271-353), API contracts (arch:354-423), observability (arch:494-703), resilience (arch:705-928)
   - **Outcome:** Understand architectural constraints and patterns before implementation

2. **PREPARE:** Review Test Design Document
   - **File:** [docs/test-design-system.md](docs/test-design-system.md)
   - **Focus Areas:** Sprint 0 recommendations (lines 427-519), testability requirements (lines 23-113), ASRs (lines 116-145)
   - **Outcome:** Understand quality gates and Sprint 0 infrastructure stories (test framework, observability, resilience)

3. **PREPARE:** Set Up Development Environment
   - **Prerequisites:** Node.js 20+, npm 10+, Git, Supabase account (free tier), Stripe account (test mode), Vercel account (free tier)
   - **Timing:** Can start before epic breakdown (infrastructure setup is independent)
   - **Outcome:** Development environment ready for Sprint 0 project initialization

4. **COMMIT (If Conditional UX Approval):** UX Principles Adherence
   - **Requirements:** Follow PRD UX principles (operational simplicity, friction-free, mobile-first), use shadcn/ui consistently, implement architecture accessibility patterns, validate 30-second checkout goal
   - **Quality Gate:** UX review in Sprint 0 or Epic 1 Story 1
   - **Outcome:** Elder-friendly UX achieved despite lack of detailed UX design spec

## Timeline Projection

**Assuming Single Developer, 8-Hour Days:**

**Day 0 (Today - Planning Phase):**

- 2-4 hours: Run create-epics-and-stories workflow
- 3-6 hours (optional): Run create-ux-design workflow (if Option A chosen)
- 1 hour: Re-run implementation-readiness check
- 1 hour: Run sprint-planning workflow
- **Total:** 4-12 hours (half to full day)

**Day 1-2 (Sprint 0 - Infrastructure):**

- Epic 0 Story 1-8: Project init, Supabase, database, test framework, observability, resilience, Stripe, Vercel
- **Effort:** 25-30 hours (3-4 days if sequential)
- **Realistic for 2-3 Day Demo:** MUST SCOPE DOWN (skip observability/resilience, defer to post-demo) → ~10-12 hours (1.5 days)

**Day 3+ (Feature Development):**

- **If 2-Day Demo (16 hours total):** Only 4-6 hours remaining after Sprint 0 → Can implement Epic 1 (product catalog browse only) OR Epic 4 (one analytics widget)
- **If 3-Day Demo (24 hours total):** Only 12-14 hours remaining after Sprint 0 → Can implement Epic 1 + Epic 2 (cart) OR Epic 1 + Epic 4 (catalog + one analytics widget)
- **For Full MVP (Customer Journey + Analytics):** Need 5-7 days minimum (40-56 hours total)

**Recommendation:** Set realistic expectations with product owner - 2-3 day demo will be minimal MVP (infrastructure + one major feature area), full customer journey + analytics dashboard requires longer timeline.

---
