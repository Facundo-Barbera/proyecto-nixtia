# Security Architecture

## Authentication & Authorization

**Admin Authentication:**
- Supabase Auth with email/password
- Session stored in HTTP-only cookies via `@supabase/ssr`
- Token auto-refresh handled by Supabase client
- Protected routes use middleware to check `auth.getUser()`

**Customer Access:**
- No authentication required (guest checkout)
- Phone number collected for order lookup (future feature)

**RLS Enforcement:**
- All Supabase queries respect Row Level Security policies
- Admin queries require valid auth session
- Public queries limited to `is_active = true` products

## Data Protection

**Encryption:**
- All traffic over HTTPS (enforced by Supabase + deployment)
- Database encryption at rest (Supabase default)
- Customer phone numbers stored as plain text (needed for order lookup)
- No credit card data stored (PCI compliance via Stripe)

**Input Validation:**
- Server-side validation with Zod schemas
- Client-side validation with react-hook-form
- Phone number format validation (regex + react-phone-number-input)
- SQL injection prevented by Supabase parameterized queries

**Environment Variables:**
- Secrets in `.env.local` (not committed to git)
- `.env.example` template in git (no actual values)
- Server-only vars: `SUPABASE_SECRET_KEY`, `STRIPE_SECRET_KEY`
- Public vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- **CRITICAL:** Never prefix server secrets with `NEXT_PUBLIC_` - this exposes them to the browser

**CSRF Protection:**
- Next.js Server Actions have built-in CSRF protection
- Supabase session cookies are HTTP-only, SameSite=Lax

**Rate Limiting:**
- Supabase built-in rate limiting on auth endpoints
- Future: Implement rate limiting on order creation (post-MVP)

## Attack Mitigation

**XSS Prevention:**
- React automatically escapes JSX content
- Avoid `dangerouslySetInnerHTML`
- Content Security Policy headers (future enhancement)

**CSRF Prevention:**
- Server Actions use POST with automatic CSRF tokens
- Supabase session validation on each request

**SQL Injection Prevention:**
- Supabase uses parameterized queries (PostgREST)
- No raw SQL in application code
