# Test Environment Requirements

## Local Development

| Component | Approach |
|-----------|----------|
| Database | Local Supabase (Docker) or remote dev project |
| Stripe | Test mode with test API keys |
| Auth | Supabase Auth with test users |
| Storage | Supabase Storage (local or remote dev) |

## CI/CD Pipeline

| Stage | Environment | Tests |
|-------|-------------|-------|
| Pull Request | Ephemeral (Supabase preview or local) | Unit + Integration + E2E smoke |
| Main Branch | Staging Supabase project | Full E2E suite + Performance |
| Pre-deploy | Production-like | Load testing (k6) |

## Required Environment Variables (Test)

```bash
# Test environment
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...
SUPABASE_SECRET_KEY=eyJ...  # Service role for test setup
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---
