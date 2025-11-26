# Testability Assessment

## Controllability: PASS

System state can be controlled for testing purposes.

| Criterion | Status | Evidence |
|-----------|--------|----------|
| API seeding for test data | ✅ | Server Actions + Supabase PostgREST allow direct data manipulation |
| External dependency mocking | ✅ | Supabase client accepts environment-specific configs |
| Error condition triggering | ✅ | Network interception via Playwright, API mocking |
| Database reset capability | ✅ | RLS policies + direct Supabase admin API |
| Dependency injection | ✅ | Next.js Server Components + client separation |

**Notes:**
- Guest checkout (no auth for customers) simplifies test data setup
- Supabase RLS policies must be tested explicitly (admin vs anon access)
- Stripe in test mode provides controlled payment scenarios

## Observability: CONCERNS

Test results partially deterministic; telemetry gaps exist.

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Logging infrastructure | ⚠️ | Logging strategy mentioned but no implementation |
| Error tracking (Sentry/similar) | ⚠️ | Not documented in architecture |
| Health check endpoint | ⚠️ | Not specified; required for reliability tests |
| Audit logging | ⚠️ | "Post-demo" - not available for MVP testing |
| Performance metrics | ⚠️ | Core Web Vitals targets set, no collection mechanism |
| Test result determinism | ✅ | React Server Components + Supabase REST = deterministic |

**Required Mitigations (Sprint 0):**
1. Add `/api/health` endpoint returning service status
2. Configure console logging with structured format
3. Define Core Web Vitals collection strategy (Lighthouse CI or web-vitals library)

## Reliability: PASS

Tests can be isolated and parallelized.

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Test isolation | ✅ | RLS provides row-level isolation; client-side cart state |
| Parallel execution safety | ✅ | Unique test data via factories; no shared global state |
| Failure reproduction | ✅ | Supabase deterministic; Playwright tracing available |
| Loose coupling | ✅ | Server Components vs Client Components separation |
| External service mockability | ✅ | Stripe test mode; Supabase local development option |

**Notes:**
- Circuit breaker pattern not implemented (acceptable for MVP scale)
- Rate limiting on order creation deferred (acceptable for 100 concurrent users)

---
