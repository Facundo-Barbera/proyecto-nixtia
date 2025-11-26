# Testability Concerns

## Concerns Requiring Attention

| Concern | Severity | Mitigation | Owner |
|---------|----------|------------|-------|
| No health check endpoint | Medium | Add `/api/health` in Sprint 0 | Backend |
| No structured logging | Medium | Configure console/pino logger | Backend |
| No error tracking (Sentry) | Low (MVP) | Optional: Add post-MVP | DevOps |
| Audit logging deferred | Low (MVP) | Document as tech debt | PM |
| No Core Web Vitals collection | Medium | Add Lighthouse CI or web-vitals | Frontend |

## Non-Blocking for Gate

The following are acceptable for MVP:
- Circuit breaker pattern (100 users doesn't require)
- Rate limiting on orders (can add post-demo)
- Real-time subscriptions (explicitly deferred)

---
