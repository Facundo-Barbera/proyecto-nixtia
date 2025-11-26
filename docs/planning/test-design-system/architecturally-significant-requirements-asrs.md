# Architecturally Significant Requirements (ASRs)

Quality requirements that drive architecture and pose testability challenges:

| ASR ID | Requirement | Category | Probability | Impact | Risk Score | Test Strategy |
|--------|-------------|----------|-------------|--------|------------|---------------|
| ASR-001 | Product catalog loads in <2s on mobile 4G | PERF | 2 | 3 | 6 | Lighthouse CI in pipeline + k6 load test |
| ASR-002 | 100 concurrent users without degradation | PERF | 2 | 2 | 4 | k6 load test (50→100 VU ramp) |
| ASR-003 | Admin-only access to order data (RLS) | SEC | 3 | 3 | 9 | Playwright E2E + API tests for RLS bypass attempts |
| ASR-004 | Customer phone stored securely | SEC | 2 | 2 | 4 | Data protection audit + encryption validation |
| ASR-005 | Checkout completes in <3s | PERF | 2 | 3 | 6 | E2E timing assertions + API profiling |
| ASR-006 | No credit card data stored (PCI via Stripe) | SEC | 1 | 3 | 3 | Stripe integration test + data audit |
| ASR-007 | WCAG 2.1 AA accessibility | BUS | 2 | 2 | 4 | axe-core integration in Playwright |
| ASR-008 | Elder-friendly checkout flow | BUS | 2 | 2 | 4 | E2E with mobile viewport + accessibility |

## High-Risk ASRs (Score ≥6)

**ASR-003: Admin-only access to order data (Score: 9 - CRITICAL)**
- Mitigation: Dedicated RLS test suite validating anon vs authenticated access
- Owner: Security/QA
- Tests: Auth bypass attempts, direct API access without auth, cross-tenant access

**ASR-001: Product catalog load time (Score: 6)**
- Mitigation: Lighthouse CI gate (score >85), k6 baseline
- Owner: Frontend/DevOps
- Tests: Mobile 4G throttling, image optimization validation

**ASR-005: Checkout completion time (Score: 6)**
- Mitigation: E2E timing budget, Server Action profiling
- Owner: Full-stack
- Tests: End-to-end timing, Supabase query analysis

---
