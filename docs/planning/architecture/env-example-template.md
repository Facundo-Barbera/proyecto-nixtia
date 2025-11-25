# Environment Variables Template

This document provides the complete `.env.example` template for the project. Developers should copy this to `.env.local` and populate with actual values.

## Template Contents

```bash
# ==============================================================================
# SUPABASE CONFIGURATION
# ==============================================================================
# Get these from: https://app.supabase.com/project/_/settings/api

# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Publishable Key (Client-side - safe to expose in browser)
# Format: sb_publishable_... (replaces legacy anon key)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your-key-here

# Supabase Secret Key (Server-side ONLY - NEVER expose to client)
# Format: sb_secret_... (replaces legacy service_role key)
# Only use in Server Actions, API Routes, or server-side code
SUPABASE_SECRET_KEY=sb_secret_your-key-here

# ==============================================================================
# STRIPE CONFIGURATION
# ==============================================================================
# Get from: https://dashboard.stripe.com/apikeys
# Use test mode keys for development (pk_test_... and sk_test_...)

# Stripe Publishable Key (Client-side - safe to expose)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key-here

# Stripe Secret Key (Server-side ONLY - NEVER expose to client)
STRIPE_SECRET_KEY=sk_test_your-secret-key-here

# ==============================================================================
# OPTIONAL: DEVELOPMENT SETTINGS
# ==============================================================================
NODE_ENV=development
PORT=3000
```

## Key Security Notes

### Supabase Keys Migration
This project uses **Supabase's new API key format** (introduced June 2025):

- **Publishable Key** (`sb_publishable_...`): Replaces the legacy `anon` key
  - Safe to use in browser/client-side code
  - Provides low-privilege access with Row Level Security (RLS) enforcement

- **Secret Key** (`sb_secret_...`): Replaces the legacy `service_role` key
  - **CRITICAL:** Only use in secure server-side environments
  - Provides elevated access, bypasses RLS policies
  - Never prefix with `NEXT_PUBLIC_` or expose in client bundles

### Where to Find Your Keys

1. Navigate to your Supabase project dashboard
2. Go to **Settings → API**
3. Under "API Keys" section:
   - Copy your **Publishable key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - Copy your **Secret key** → `SUPABASE_SECRET_KEY`

### Legacy Key Migration

If you have an existing project with legacy keys:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → **Replace with** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` → **Replace with** `SUPABASE_SECRET_KEY`

The old keys will be phased out; all projects created after November 1, 2025 use only the new format.

## Setup Instructions

```bash
# 1. Copy this template to .env.local
cp .env.example .env.local

# 2. Edit .env.local with your actual values
# Get Supabase keys from: https://app.supabase.com/project/_/settings/api
# Get Stripe keys from: https://dashboard.stripe.com/apikeys

# 3. Verify .env.local is in .gitignore (should already be there)
grep ".env.local" .gitignore

# 4. NEVER commit .env.local or any file containing real secrets
```

## Validation Checklist

Before running the application, verify:

- [ ] `.env.local` file exists in project root
- [ ] All `NEXT_PUBLIC_*` variables use new Supabase publishable key format (`sb_publishable_...`)
- [ ] `SUPABASE_SECRET_KEY` uses new secret key format (`sb_secret_...`)
- [ ] No `DATABASE_URL` variable present (conflicts with Supabase-only architecture)
- [ ] Stripe keys use test mode (`pk_test_...` and `sk_test_...`) for development
- [ ] `.env.local` is listed in `.gitignore`
- [ ] No real secrets are committed to version control

## Common Issues

**Issue:** "Invalid API key" error
- **Solution:** Ensure you're using the new key format (`sb_publishable_...` / `sb_secret_...`), not legacy keys

**Issue:** "Unauthorized" errors in client-side queries
- **Solution:** Check that `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is set and RLS policies are configured

**Issue:** Server Actions failing with auth errors
- **Solution:** Verify `SUPABASE_SECRET_KEY` is set (without `NEXT_PUBLIC_` prefix)

## Related Documentation

- [Development Environment Setup](./development-environment.md)
- [Security Architecture](./security-architecture.md)
- [Implementation Patterns](./implementation-patterns.md)
