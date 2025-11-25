# Technical Preferences

**Chosen Stack (Post-Brainstorming):**

- **Frontend:** Next.js (React framework)
  - _Rationale:_ Proven, extensive documentation, fast setup despite being heavier than alternatives (Astro/Svelte). "Boring tech wins in sprints" - eliminates decision fatigue
- **Database & Auth:** Supabase
  - _Rationale:_ Postgres-based, built-in auth, real-time capabilities, generous free tier
- **Payments:** Stripe Connect
  - _Rationale:_ Enables client to manage their own payment portal, industry standard
- **Hosting:** Vercel
  - _Rationale:_ Seamless Next.js deployment, preview environments, fast CDN

**Architecture Principles:**

- **Two-tier security model:** High security for admin (email/password auth), low friction for customers (phone-only guest checkout)
- **Demo-driven development:** Working UI > full integrations for initial delivery
- **Progressive enhancement:** Ship demoable UI, enhance with real integrations post-approval
- **Mobile-first responsive design:** Both admin and customer interfaces optimized for phones

**Infrastructure Considerations:**

- Mock data seeding for demo analytics (real data post-launch)
- Supabase row-level security for multi-tenant future
- Stripe webhook handlers for order processing (post-demo)

---
