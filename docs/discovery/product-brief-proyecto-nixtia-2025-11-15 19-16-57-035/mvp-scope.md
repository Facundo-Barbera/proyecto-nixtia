# MVP Scope

## Core Features

**Priority #1: Virtual Store (Customer-Facing)**
- Product catalog displaying all available items with images, descriptions, prices
- Product detail pages for expanded information
- Shopping cart functionality (add, remove, update quantities)
- Quantity selector for bulk purchases
- Checkout flow collecting phone number (guest checkout - no registration)
- Payment method selection UI:
  - Bank transfer information display
  - Cash/card on delivery option
  - Stripe payment integration (via Stripe Connect)
- Order confirmation page with order summary and next steps
- Responsive mobile-first design using Nixtia brand colors and typography

**Priority #2: WebApp Dashboard (Admin)**
- Supabase email/password authentication for business owner
- Protected dashboard route (requires login)
- Three core analytics widgets:
  - **Revenue chart:** Visual display of daily/weekly/monthly revenue trends
  - **Transactions table:** Recent orders with date, customer, amount, payment method
  - **Payment breakdown:** Pie/bar chart showing distribution across payment types
- Product CRUD interface (post-demo enhancement)
- Responsive layout for mobile admin access

**Priority #3: Landing Page (If Time Permits)**
- Five-section structure:
  - Navigation header with logo
  - Hero section introducing Nixtia's value proposition
  - Educational content about nixtamalized corn benefits
  - Product showcase
  - About section with contact/social links
- Brand-aligned design (purple palette, TAN Headline typography)
- Call-to-action linking to virtual store
- Social media integration

**Technical Foundation:**
- **Frontend:** Next.js (React) with TailwindCSS
- **Backend/Database:** Supabase (auth, database, API)
- **Payments:** Stripe Connect (enables client self-service portal)
- **Hosting:** Vercel
- **Analytics:** Mock data for demo, real integration post-delivery

## Out of Scope for MVP

**Explicitly Eliminated (Per Brainstorming Session):**
- Product search/filtering (low product density makes it unnecessary)
- Customer accounts/registration (guest checkout only)
- Email verification and password reset flows (admin only needs basic auth for demo)
- Inventory management system
- Full Stripe Connect integration (UI only for demo)
- WhatsApp bot automation (future enhancement)
- Multi-language support
- Advanced analytics (cohort analysis, LTV calculations, etc.)
- Store customization settings
- Customer order history lookup

**Landing Page Flexibility:**
- Can be cut entirely if time runs short
- Apps (store + dashboard) are non-negotiable for demo success
- Marketing site can be delivered post-demo without impacting core value

## MVP Success Criteria

**Demo Goals:**
- ✅ Customer can browse products, add to cart, complete checkout flow end-to-end
- ✅ Admin can log in and view revenue chart + transactions table + payment breakdown
- ✅ UI is polished and brand-aligned (not wireframes or placeholders)
- ✅ Flow is demoable without backend failures (mock data is acceptable)
- ✅ Client perceives professionalism and technical capability

**Post-Demo Validation (30-60 days):**
- Client commits to full project engagement
- Real customer orders flow through virtual store
- Nixtia owner actively uses dashboard for business decisions
- Positive feedback on ease of use from end customers

## Future Vision

**Phase 2 Enhancements (Post-MVP):**
- Full Stripe Connect integration with real payment processing
- Product CRUD interface for client self-management
- Customer order history (phone-based lookup)
- WhatsApp bot integration for order notifications
- Email verification and password reset for admin
- Store appearance customization settings

**Long-Term Moonshots:**
- Multi-tenant platform (scale to support multiple food businesses)
- WhatsApp-first commerce (complete ordering via chat bot)
- Subscription model for recurring masa deliveries
- Recipe integration (link products to cooking tutorials)
- B2B wholesale portal for restaurant/bakery bulk orders

---
