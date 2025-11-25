# Critical Architecture Decision: Supabase-Only Data Layer

**Decision:** Remove Prisma entirely, use Supabase client exclusively for all database operations.

**Context:**
- Prisma and Supabase have fundamental conflicts (RLS bypass, schema drift, connection pooling)
- Supabase is mandated due to investment decision
- MVP needs speed and simplicity over maximum type safety

**Rationale:**
- ✅ **Native RLS Security:** Supabase client respects Row Level Security policies (critical for admin auth)
- ✅ **No Schema Drift:** Eliminates conflicts with Supabase-managed schemas (auth, storage)
- ✅ **Simpler Architecture:** One tool for schema + queries, less cognitive overhead
- ✅ **Real-time Support:** Direct access to Supabase real-time subscriptions
- ✅ **Better Performance:** No ORM overhead, direct PostgREST queries
- ⚠️ **Trade-off:** Manual TypeScript types (mitigated via `supabase gen types typescript`)

**Migration Required:**
1. Migrate Prisma schema to Supabase SQL migrations
2. Remove Prisma dependencies (@prisma/client, prisma)
3. Remove prisma/ directory and configuration
4. Generate TypeScript types from Supabase schema
5. Refactor all database queries to use Supabase client
6. Update seed scripts to use Supabase client
