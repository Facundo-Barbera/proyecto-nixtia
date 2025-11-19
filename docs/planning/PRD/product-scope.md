# Product Scope

## MVP - Minimum Viable Product

**Priority #1: Virtual Store (Customer-Facing)**

Core customer experience enabling self-service purchasing:

- Product catalog displaying all items with images, descriptions, prices
- Product detail pages for expanded information
- Shopping cart functionality (add, remove, update quantities)
- Quantity selector supporting bulk purchases
- Checkout flow with phone number collection (guest checkout - no registration)
- Payment method selection:
  - Bank transfer information display
  - Cash/card on delivery option
  - Stripe payment integration (UI ready, full processing post-demo)
- Order confirmation page with summary and next steps
- Mobile-first responsive design using Nixtia brand colors (purple palette) and typography (TAN Headline)

**Priority #2: WebApp Dashboard (Admin)**

Business intelligence and management interface:

- Supabase email/password authentication for secure access
- Protected dashboard routes (login required)
- Three core analytics widgets:
  - **Revenue Chart:** Visual display of daily/weekly/monthly trends
  - **Transactions Table:** Recent orders with date, customer, amount, payment method
  - **Payment Breakdown:** Distribution across payment types (bar/pie chart)
- Product CRUD interface (post-demo enhancement)
- Responsive layout for mobile admin access
- Basic admin profile management

**Priority #3: Landing Page (Time Permitting)**

Marketing showcase with five-section structure:

- Navigation header with Nixtia logo
- Hero section introducing value proposition
- Educational content about nixtamalized corn benefits
- Product showcase teaser
- About section with contact and social links
- Brand-aligned design (purple palette, TAN Headline typography)
- Clear CTA linking to virtual store

**Technical Foundation:**

- Mock data seeding for demo analytics
- Supabase row-level security preparation for future multi-tenancy
- Stripe webhook handlers (post-demo)
- Environment configuration for local/staging/production

## Growth Features (Post-MVP)

**Phase 2 Enhancements (30-90 days):**

- Full Stripe Connect integration with real payment processing
- Product CRUD interface for client self-management
- Customer order history (phone-based lookup)
- WhatsApp bot integration for automated order notifications
- Email verification and password reset flows for admin
- Store appearance customization settings
- Order status tracking for customers
- Inventory management alerts
- Enhanced analytics (customer cohorts, repeat purchase rates)

**Post-Demo Priority:**

- Complete Stripe payment processing
- Product management UI for client independence
- WhatsApp notification automation

## Vision (Future)

**Long-Term Moonshots:**

- **Multi-tenant platform:** Scale to support multiple artisan food businesses
- **WhatsApp-first commerce:** Complete ordering via chat bot (AI-powered)
- **Subscription model:** Recurring masa delivery schedules
- **Recipe integration:** Link products to cooking tutorials and content
- **B2B wholesale portal:** Bulk ordering for restaurants/bakeries
- **Marketplace expansion:** Connect multiple artisan producers on one platform
- **AI-powered inventory:** Predict demand based on order patterns

---
