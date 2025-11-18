# proyecto-nixtia - Product Requirements Document

**Author:** Facundo
**Date:** 2025-11-15
**Version:** 1.0

---

## Executive Summary

Nixtia transforms a WhatsApp-overwhelmed artisan food business into a professional digital operation. The platform liberates the business owner from manual order chaos (endless WhatsApp messages, Excel spreadsheets, no visibility) while meeting customers exactly where they are - with frictionless, elder-friendly checkout that feels familiar, not foreign.

This MVP focuses on proving the complete customer journey (browse → cart → checkout) and demonstrating business intelligence capabilities within a 2-3 day delivery window to win client confidence and secure full engagement.

### What Makes This Special

This isn't generic e-commerce. It's **operational liberation** for small food businesses trapped between manual processes and expensive/complex platforms. Nixtia gives them:

- **Professional legitimacy** - A real web presence that commands market credibility
- **Freedom from chaos** - Self-service ordering stops the WhatsApp flood
- **Business clarity** - Real-time analytics (revenue charts, payment breakdowns) replace Excel guesswork
- **Time reclaimed** - Owner focuses on craft, not coordinating orders

**The Emotional Hook:** When the owner logs into the dashboard and sees their first revenue chart, they realize: "I finally *understand* my business." When customers complete checkout in 30 seconds on their phone, they think: "This is easier than WhatsApp."

---

## Project Classification

**Technical Type:** Web Application (SPA)
**Domain:** Food E-commerce (Direct-to-Consumer, Artisan/Specialty)
**Complexity:** Low-Medium

This is a dual-interface web platform:
1. **Customer-facing Virtual Store** - Responsive web app for product browsing and checkout
2. **Business Owner Dashboard** - Protected admin interface for analytics and management
3. **Marketing Landing Page** - Public showcase (optional for MVP)

**Technology Foundation:**
- Frontend: Next.js (React) with TailwindCSS
- Backend/Database: Supabase (PostgreSQL, auth, real-time)
- Payments: Stripe Connect
- Hosting: Vercel

**Domain Context:** Standard B2C food commerce. No regulatory compliance beyond payment security (PCI DSS via Stripe). No food safety certifications, health permits, or specialized regulations required in software.

---

## Success Criteria

**MVP Demo Success (2-3 days):**
- ✅ Customer completes end-to-end purchase flow without friction
- ✅ Admin views live business analytics (revenue chart, transactions, payment breakdown)
- ✅ UI is polished and brand-aligned, not wireframes
- ✅ Demo runs smoothly with mock data (real integrations post-approval)
- ✅ Client perceives professional capability and commits to full engagement

**Post-Launch Success (30-60 days):**
- Real customer orders flowing through virtual store
- Business owner actively uses dashboard for daily decisions
- Measurable reduction in WhatsApp order volume
- Positive customer feedback on ease of use
- Owner reports time savings and operational clarity

### Business Metrics

**For the Client (Nixtia):**
- **Operational efficiency:** 70%+ reduction in manual order coordination time
- **Business visibility:** Daily dashboard usage for revenue/payment tracking
- **Customer satisfaction:** Positive feedback on checkout experience
- **Revenue impact:** Track sales trends, identify peak periods, optimize inventory

**For the Developer (Facundo):**
- **Client conversion:** Secure full project engagement post-demo
- **Portfolio value:** Showcase culturally-aware, dual-tier platform design
- **Reusability:** Foundation for multi-tenant SaaS offering to similar businesses

---

## Product Scope

### MVP - Minimum Viable Product

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

### Growth Features (Post-MVP)

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

### Vision (Future)

**Long-Term Moonshots:**

- **Multi-tenant platform:** Scale to support multiple artisan food businesses
- **WhatsApp-first commerce:** Complete ordering via chat bot (AI-powered)
- **Subscription model:** Recurring masa delivery schedules
- **Recipe integration:** Link products to cooking tutorials and content
- **B2B wholesale portal:** Bulk ordering for restaurants/bakeries
- **Marketplace expansion:** Connect multiple artisan producers on one platform
- **AI-powered inventory:** Predict demand based on order patterns

---

## Web App Specific Requirements

### Browser & Platform Support

**Primary Targets:**
- Mobile browsers (iOS Safari, Chrome Android) - 80% of traffic expected
- Desktop browsers (Chrome, Safari, Firefox, Edge) - 20% of traffic

**Responsive Breakpoints:**
- Mobile: 320px - 767px (primary focus)
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Performance Targets

**Customer-Facing Store:**
- First Contentful Paint: < 1.5s on mobile 4G
- Time to Interactive: < 3s
- Lighthouse Performance Score: > 85
- Core Web Vitals: Pass all metrics

**Admin Dashboard:**
- Dashboard load time: < 2s on good connection
- Chart rendering: < 500ms
- Real-time data sync: < 1s latency (Supabase)

### SEO Strategy

**Public Pages (Landing, Store Catalog):**
- Server-side rendering (Next.js SSR/SSG)
- Semantic HTML with proper heading hierarchy
- Meta tags (Open Graph, Twitter Cards)
- Structured data for products (Schema.org)
- Sitemap generation
- Robots.txt configuration

**Protected Pages (Dashboard):**
- Client-side rendering acceptable
- No SEO requirements

### Accessibility Level

**WCAG 2.1 Level AA Compliance:**
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios meeting AA standards
- Focus indicators on interactive elements
- Alternative text for images
- Form labels and error messages
- Skip navigation links

**Elder-Friendly Enhancements:**
- Large touch targets (min 44px)
- High contrast text
- Clear typography (readable at default sizes)
- Minimal cognitive load in checkout flow

---

## User Experience Principles

### Visual Personality

**Brand Vibe:** Professional yet warm, trustworthy, approachable

**Design Language:**
- **Color Palette:** Purple primary (from Nixtia brand), warm accents
- **Typography:** TAN Headline for headers, clean sans-serif for body
- **Imagery:** Authentic product photos, lifestyle shots of cooking/food
- **Tone:** Friendly, informative, culturally respectful

**Emotional Journey:**
- **Customer:** Curiosity → Confidence → Ease → Satisfaction
- **Admin:** Overwhelm → Clarity → Control → Empowerment

### Key Interactions

**Customer Store Experience:**

1. **Product Discovery**
   - Grid layout with large product images
   - Clear pricing and quantity indicators
   - Tap to view details, tap again to add to cart
   - Visual feedback on cart additions

2. **Cart Management**
   - Persistent cart indicator in header
   - Inline quantity adjustments
   - Clear price calculations
   - Easy removal with confirmation

3. **Checkout Flow**
   - Progressive disclosure (one step at a time)
   - Phone number input with country code selector
   - Payment method selection with clear icons/descriptions
   - Order summary always visible
   - Confirmation with actionable next steps

**Admin Dashboard Experience:**

1. **Login & Access**
   - Simple email/password form
   - Clear error messages
   - Remember me option
   - Direct entry to dashboard post-auth

2. **Analytics Overview**
   - Dashboard homepage showing all three widgets
   - Interactive charts (hover for details)
   - Date range selectors for filtering
   - Export options for data

3. **Product Management** (Post-Demo)
   - Table view with inline editing
   - Add new product modal
   - Image upload with preview
   - Status toggles (active/inactive)

### Mobile-First Patterns

- **Thumb-friendly zones:** Critical actions in easy-to-reach areas
- **Bottom navigation:** Key actions accessible without reaching top
- **Swipe gestures:** Cart item removal, image galleries
- **Sticky headers:** Cart icon, navigation always accessible
- **Progressive enhancement:** Core functionality works without JS

---

## Functional Requirements

### User Account & Access

**Customer Access (Low Friction):**
- FR1: Customers can browse product catalog without creating an account
- FR2: Customers can add products to cart as guest users
- FR3: Customers can complete checkout by providing only phone number
- FR4: Customers can view order confirmation immediately after purchase
- FR5: System stores order reference for future phone-based lookup (post-MVP)

**Admin Access (High Security):**
- FR6: Business owner can create admin account with email and password
- FR7: Business owner can log in securely with email/password authentication
- FR8: Business owner can access password reset via email (post-demo)
- FR9: Admin sessions persist across browser sessions (remember me)
- FR10: Admin can log out and clear session data

### Product Catalog Management

**Customer View:**
- FR11: Customers can view all available products in grid layout
- FR12: Customers can see product image, name, price, and description preview
- FR13: Customers can click product to view detailed information page
- FR14: Customers can see product availability status
- FR15: Product images load efficiently with progressive enhancement

**Admin Management (Post-Demo):**
- FR16: Admin can add new products with image, name, description, price
- FR17: Admin can edit existing product information
- FR18: Admin can delete products with confirmation
- FR19: Admin can toggle product active/inactive status
- FR20: Admin can upload and manage product images

### Shopping Cart & Checkout

**Cart Functionality:**
- FR21: Customers can add products to cart from catalog or detail pages
- FR22: Customers can adjust product quantities in cart
- FR23: Customers can remove products from cart
- FR24: Customers can see real-time cart total and item count
- FR25: Cart persists during browsing session
- FR26: Cart displays clear pricing breakdown (subtotal, taxes if applicable)

**Checkout Process:**
- FR27: Customers can proceed to checkout from cart
- FR28: Customers can enter phone number with country code selection
- FR29: Customers can select payment method (bank transfer, cash/card on delivery, Stripe)
- FR30: System displays payment instructions based on selected method
- FR31: Customers can review order summary before confirming
- FR32: Customers receive order confirmation with reference number
- FR33: System validates phone number format
- FR34: System prevents duplicate order submission

### Payment Processing

**Payment Methods:**
- FR35: Customers can choose bank transfer and view account details
- FR36: Customers can choose cash/card on delivery option
- FR37: Customers can choose Stripe card payment (post-demo: live processing)
- FR38: System displays clear instructions for each payment method
- FR39: System records payment method selection with order

**Order Management:**
- FR40: System creates order record with customer details, items, total, payment method
- FR41: System generates unique order reference number
- FR42: System stores order timestamp and status
- FR43: Admin can view all orders in chronological list (post-demo: filtering)

### Business Analytics & Dashboard

**Revenue Analytics:**
- FR44: Admin can view revenue chart showing trends over time
- FR45: Admin can filter revenue by date range (daily, weekly, monthly)
- FR46: Admin can see total revenue for selected period
- FR47: Revenue chart displays visual trend line or bars

**Transaction History:**
- FR48: Admin can view table of recent transactions
- FR49: Transaction table shows date, customer phone, order total, payment method
- FR50: Admin can sort transactions by date or amount (post-demo)
- FR51: Admin can search transactions by customer phone (post-demo)

**Payment Analytics:**
- FR52: Admin can view payment method breakdown (chart visualization)
- FR53: Payment breakdown shows percentage and count for each method
- FR54: Admin can compare payment methods across date ranges (post-demo)

### Landing Page (Optional MVP)

**Marketing Content:**
- FR55: Visitors can view hero section with Nixtia value proposition
- FR56: Visitors can read educational content about nixtamalized corn
- FR57: Visitors can see product showcase with sample items
- FR58: Visitors can access social media links
- FR59: Visitors can navigate to virtual store via clear CTA

---

## Non-Functional Requirements

### Performance

**Load Times:**
- Product catalog page loads in < 2 seconds on mobile 4G
- Product detail pages load in < 1.5 seconds
- Cart updates reflect in < 200ms
- Checkout form submission completes in < 3 seconds
- Dashboard analytics render in < 2 seconds

**Scalability:**
- System handles 100 concurrent users without degradation (MVP scale)
- Database queries optimized with indexing on frequently accessed fields
- Image assets served via CDN with optimization
- Supabase connection pooling configured appropriately

**Caching:**
- Product catalog data cached for 5 minutes
- Static assets cached with aggressive browser cache headers
- CDN caching for images and public pages

### Security

**Authentication & Authorization:**
- Admin passwords hashed using bcrypt (via Supabase)
- Session tokens use secure, httpOnly cookies
- CSRF protection enabled on all state-changing requests
- Rate limiting on authentication endpoints (prevent brute force)

**Data Protection:**
- All traffic served over HTTPS
- Customer phone numbers stored securely (encrypted at rest via Supabase)
- No sensitive payment data stored (PCI DSS via Stripe)
- Environment variables for API keys and secrets (never in code)

**Input Validation:**
- All user inputs sanitized to prevent XSS attacks
- Phone number format validation (client and server-side)
- SQL injection prevention via parameterized queries (Supabase)
- File upload validation for product images (type, size limits)

**Admin Security:**
- Role-based access control for admin routes
- Session timeout after 30 minutes of inactivity
- Audit logging for admin actions (post-demo)

### Integration

**Supabase Integration:**
- Real-time database subscriptions for order updates
- Row-level security policies configured
- Automated backups enabled
- Connection pooling for performance

**Stripe Integration:**
- Stripe Connect setup for client payment portal access
- Webhook handlers for payment events (post-demo)
- Test mode for demo, live mode post-launch
- PCI compliance handled by Stripe

**WhatsApp Integration (Post-MVP):**
- Webhook endpoints for bot communication
- Order notification templates
- Customer inquiry handling

**Future Integrations:**
- Google Analytics for traffic insights
- Social media sharing (Open Graph tags)
- Email service (SendGrid/Mailgun) for admin notifications

---

## Implementation Planning

### Epic Breakdown Required

This PRD defines the **capability contract**. Requirements must now be decomposed into implementable epics and bite-sized stories (200k context limit) for development.

**Development Sequence:**
1. **Epic 1:** Project Setup & Infrastructure
2. **Epic 2:** Virtual Store - Product Catalog
3. **Epic 3:** Virtual Store - Cart & Checkout
4. **Epic 4:** Payment Integration (UI for demo)
5. **Epic 5:** Admin Dashboard - Authentication
6. **Epic 6:** Admin Dashboard - Analytics Widgets
7. **Epic 7:** Landing Page (optional)
8. **Epic 8:** Polish & Demo Preparation

**Next Step:** Run `/bmad:bmm:workflows:create-epics-and-stories` to create implementation breakdown.

---

## References

- **Product Brief:** [docs/discovery/product-brief-proyecto-nixtia-2025-11-15 19-16-57-035](../discovery/product-brief-proyecto-nixtia-2025-11-15 19-16-57-035/index.md)
- **Brainstorming Session:** [docs/discovery/brainstorming-session-results-2025-11-15](../discovery/brainstorming-session-results-2025-11-15/index.md)

---

## Next Steps

### Immediate Actions

1. **Epic & Story Breakdown** - Run: `/bmad:bmm:workflows:create-epics-and-stories`
2. **UX Design** - Run: `/bmad:bmm:workflows:create-design` for detailed user experience design
3. **Architecture** - Run: `/bmad:bmm:workflows:create-architecture` for technical architecture decisions

### Project Track

**Track:** BMad Method (Greenfield)
**Phase:** Planning (PRD Complete)

**Epic Context for Breakdown:**

This is a **dual-interface platform** requiring careful story sequencing:
- Virtual Store must be demoable before Dashboard
- Landing Page is lowest priority (can be cut)
- Mock data acceptable for demo analytics
- Real Stripe integration deferred post-demo

**Story Altitude:** Stories should focus on user-facing capabilities and vertical slices (e.g., "Customer can complete checkout flow" not "Build checkout API endpoint"). Each story should deliver testable value.

---

_This PRD captures the essence of proyecto-nixtia - **operational liberation for artisan food businesses**, transforming WhatsApp chaos into systematic clarity while meeting customers where they are._

_Created through collaborative discovery between Facundo and AI Product Manager._
