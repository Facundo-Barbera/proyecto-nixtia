# Project Context

**Platform Scope:**
- 59 functional requirements across 6 capability groups
- Three-tier application: Virtual Store + Admin Dashboard + Landing Page
- Mobile-first responsive design (80% mobile traffic expected)
- Elder-friendly UX with large touch targets and high contrast

**Key Requirements:**
- Guest checkout (phone number only, no registration required)
- Real-time business analytics (revenue charts, transaction history, payment breakdowns)
- Multiple payment methods (bank transfer, cash/card on delivery, Stripe)
- Product catalog with image optimization and CDN delivery
- Admin product CRUD (post-demo enhancement)
- Performance targets: < 2s page loads on mobile 4G, Lighthouse > 85

**Critical Integrations:**
- Supabase: Database, authentication, real-time subscriptions
- Stripe: Payment processing (test mode for demo, live post-launch)
- Future: WhatsApp bot for order notifications
