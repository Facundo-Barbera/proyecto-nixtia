# Technique Sessions

## **Session 1: Resource Constraints (Structured)**

**Client Vision for Landing Page:**
- Header/Nav: Logo → Pages (Inicio, Nosotros, Tienda, Blog?, Contacto) → Social links → Cart
- Hero: Product image + "La tradición se renueva con más proteína" + pea/soy mention
- Educational: Why pea + soy proteins complement amino acids
- Product Showcase: Photos + "Explorar" CTA to store
- About/Nosotros: Purpose, values, brand story

**Decision 1 - Landing Page Scope:**
✅ **ALL 5 sections in MVP** - Landing is static content, shouldn't consume much dev time
💡 **Key Insight:** Don't over-invest time here. Use template/component library for speed, focus dev effort on WebApp + Store functionality.

---

**Constraint Round 2: Where the REAL complexity lives...**

Now let's tackle the **WebApp (for Nixtia)** and **Virtual Store (for their clients)** - this is where your 2-3 days will really be tested.

**The WebApp includes:**
- Dashboard (income data, transaction data, data tables)
- Virtual store editor
- Product CRUD

**The Virtual Store includes:**
- Product display
- Cart & selections
- Payment methods (bank transfer, on delivery, Stripe Connect)

**Here's the brutal constraint question:**

**If you could only deliver ONE fully-working feature in each platform for the demo, which would prove the concept and win client confidence?**

**For WebApp:** Which single feature?
- A) Dashboard with mock/sample data showing analytics
- B) Product CRUD (add/edit/delete products that appear in store)
- C) Basic store editor (configure store settings)

**For Virtual Store:** Which single feature?
- A) Product catalog display with real products
- B) Shopping cart functionality (add to cart, view cart)
- C) One working payment method (which one?)

**Decision 2 - Core Feature Priority:**

**WebApp MVP:**
✅ **Dashboard with analytics** (income data, transactions, data tables with mock/sample data)
⏸️ Product CRUD - can be manual/seeded data for demo
⏸️ Store editor - not critical for initial demo

**Virtual Store MVP:**
✅ **Product catalog** - must work with real product display
✅ **Shopping cart** - functional add-to-cart and cart view (demo-ready)
✅ **Payment methods** - UI/flow demoable, but integrations can be mocked
   - Bank transfer: Show form/instructions
   - On delivery: Show options (card/cash selection)
   - Stripe Connect: UI present, actual integration can wait

💡 **Key Insight:** "Demoable" vs "Fully integrated" - show the complete user journey with working UI, but payment processing can be simulated for the demo.

---

## **Constraint Round 3: Dashboard Widgets & Data Tables**

**Decision 3 - Dashboard MVP Widgets:**

✅ **Revenue overview chart** (daily/weekly/monthly toggle)
✅ **Recent transactions table** (sortable, with key details)
✅ **Sales by payment method breakdown** (bank transfer vs on-delivery vs Stripe)

💡 **Key Insight:** These three widgets demonstrate business health (revenue trends), operational transparency (transaction details), and payment strategy (which methods customers prefer). This gives Nixtia's client exactly what they need to feel confident managing their business.

---

## **Constraint Round 4: Virtual Store - The Customer Journey**

**Decision 4 - Virtual Store Feature Cuts:**

❌ **Product search/filtering** - ELIMINATED
   - Rationale: Low product variation means catalog browsing is sufficient
   - Simple scroll-through works fine for limited SKUs

⏸️ **Order confirmation** - DEFER (but keep in scope)
   - Can be a simple styled page - doesn't need complex logic
   - Priority: Implement AFTER cart + payment flow working

✅ **KEEPING in MVP:**
- **Product details page** - Shows product properly
- **Quantity selector** - Essential for cart functionality

💡 **Key Insight:** With low product density, you're building a boutique catalog experience, not a massive marketplace. Simpler = faster = more polished within 2-3 days.

---

## **Constraint Round 5: The Authentication Question**

**Decision 5 - Authentication Strategy:**

**WebApp (Nixtia admin):**
✅ **Full Supabase auth** - Email/password with email verification
✅ **Email verification flow** - Send code to email via Supabase
✅ **Password reset flow** - Forgot password link, reset via email
✅ **Protected routes** - Auth gates on dashboard/admin pages
⏱️ **Time Budget:** ~6-8 hours total

**Virtual Store (customers):**
✅ **Guest checkout PRIMARY** - Phone number required, minimal friction
✅ **Optional account creation** - Post-purchase opt-in
✅ **Phone-first design** - Elder-friendly, WhatsApp-ready
✅ **Email optional** - Phone is customer identifier
⏱️ **Time Budget:** ~2-3 hours

💡 **CRITICAL Insight:** Your real customers are ordering tortillas via WhatsApp! This changes everything about store design:
- Simple, minimal friction checkout - elder-friendly, phone-first
- Large buttons, clear text - accessibility for older users
- Phone number validates/formats - ensure it's WhatsApp-compatible
- Future integration point - Twilio bot can reference orders by phone number
- No complex password requirements - phone verification is enough for guest orders

💡 **Strategic Trade-off:** Two-tier security model:
- **High security for business owner** (Nixtia) - Full auth, email verification, protected data
- **Low friction for customers** - Phone number + optional account, optimized for speed

---

## **Constraint Round 6: The Tech Stack Decision**

**Decision 6 - Tech Stack:**

✅ **NextJS** (TypeScript) - Single framework for all three components
   - **Rationale:** Covers everything needed out of the box
   - Supabase integration = copy-paste ready
   - API routes for backend logic if needed
   - SSR/SSG flexibility (static landing, dynamic apps)
   - Vercel deployment = one-click
   - Massive ecosystem = solutions already exist

💡 **Key Insight:** Being pragmatic. NextJS is heavier than preferred, but it eliminates decision fatigue and "gluing things together" time. In a 2-3 day sprint, **boring and proven wins**.

**Confirmed Stack:**
- **Frontend:** NextJS (TypeScript)
- **Database/Auth:** Supabase
- **Payments:** Stripe Connect (UI ready, integration can be progressive)
- **Hosting:** Vercel

---

## **Constraint Round 7: FINAL CUT - The Demo Killer**

**Decision 7 - Demo Safety Net:**

❌ **SACRIFICE if time runs out: Landing Page**
   - Rationale: The **working applications** demonstrate real capability
   - Client cares more about "can this manage my business?" than marketing site
   - Landing can be delivered post-demo as polish

✅ **NON-NEGOTIABLES for demo confidence:**
   - WebApp dashboard with analytics (proves business management)
   - Virtual Store with cart (proves customer experience works)
   - Payment methods UI (shows complete flow)

💡 **Key Insight:** The **apps are the real demo**. Landing page is marketing; WebApp + Store are the actual product that generates revenue.

**Updated Critical Path:**
1. **MUST WORK:** Virtual Store (catalog → cart → checkout flow)
2. **MUST WORK:** WebApp (auth → dashboard → analytics widgets)
3. **NICE TO HAVE:** Landing page (can be delivered day 4-5)

---
