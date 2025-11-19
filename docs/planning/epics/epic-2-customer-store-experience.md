# Epic 2: Customer Store Experience

**Goal:** Enable customers to browse products, add to cart, and complete checkout with frictionless mobile-first UX

**User Value:** Customers can self-serve orders without WhatsApp chaos - THE CORE MVP

**FRs Covered:** FR1-FR4, FR11-FR15, FR21-FR43

**Stories:** 9 stories

---

## Story 2.1: Product Catalog Grid (Mobile-First)

As a **customer**,
I want to see all available products in a clean grid layout on my mobile device,
So that I can easily browse what's available without zooming or scrolling horizontally.

**Acceptance Criteria:**

**Given** I visit the Nixtia store homepage
**When** the product catalog loads
**Then** I see:

- Product cards in single-column grid on mobile (320-767px)
- 2-column grid on tablet (768-1023px)
- 3-column grid on desktop (1024px+)
- Each card shows: product image (4:3 aspect ratio), name (max 2 lines, truncate), price (1.5rem purple-600), availability badge if out of stock
- Large touch targets (44x44px minimum for add-to-cart button per UX pg 8)
- Card-based layout with subtle shadow (0 1px 3px rgba(0,0,0,0.1) per UX pg 4)
- Images load efficiently with progressive enhancement (NFR performance: <2s on 4G)

**And** products are fetched from Supabase `products` table (active=true only)

**And** page loads in < 2 seconds on mobile 4G connection

**And** empty state shows if no products: "No products available yet. Check back soon!"

**Prerequisites:** Story 1.2 (database with products)

**E2E Testing Requirements:**

**Test File:** `tests/e2e/product-catalog.spec.ts`

- **Test:** Product grid displays correctly on mobile/tablet/desktop
  - Verify single-column on mobile (320-767px)
  - Verify 2-column on tablet (768-1023px)
  - Verify 3-column on desktop (1024px+)
- **Test:** Products load from database
  - Verify active products are displayed
  - Verify inactive products are NOT displayed
  - Verify product card shows: image, name, price, availability badge
- **Test:** Empty state displays when no products exist
  - Verify empty state message appears
- **Test:** Page load performance (< 2s on simulated 4G)
  - Use Playwright's `page.waitForLoadState('networkidle')`

**Technical Notes:**

- Component: ProductCard (UX Design pg 6)
- Use shadcn/ui Card component as base, customize per UX spec
- Responsive grid: CSS Grid with breakpoints (UX pg 8)
- Image optimization: Next.js Image component with blur placeholder
- Accessibility: Each card is focusable, keyboard navigable (WCAG AA per UX pg 9)
- Color: Purple-600 (#7c3aed) for price, Slate-900 (#0f172a) for name (UX pg 3-4)
- Spacing: 1.5rem gap between cards (24px per UX spacing system)

---

## Story 2.2: Product Detail View

As a **customer**,
I want to click a product to see its full details,
So that I can learn more before deciding to purchase.

**Acceptance Criteria:**

**Given** I am viewing the product catalog
**When** I tap/click a product card
**Then** I am taken to a product detail page showing:

- Large product image (full width on mobile, max 600px on desktop)
- Product name (H1, TAN Headline font per UX pg 4)
- Full description (body text, readable line-height 1.5)
- Price prominently displayed (2rem purple-600)
- Quantity selector (default: 1, min: 1, max: 99)
- "Add to Cart" button (primary button style: purple-600 solid, white text, shadow per UX pg 7)
- Availability status (if out of stock, button disabled with gray style)

**And** URL updates to /products/[product-id] for shareable link

**And** clicking "Add to Cart" adds selected quantity to cart with success toast ("Product added to cart!", green, auto-dismiss 3s per UX pg 7)

**And** page loads in < 1.5 seconds (NFR from PRD)

**Prerequisites:** Story 2.1

**E2E Testing Requirements:**

**Test File:** `tests/e2e/product-detail.spec.ts`

- **Test:** Product detail page loads with correct data
  - Navigate from catalog to product detail
  - Verify URL updates to `/products/[product-id]`
  - Verify all product details displayed (image, name, description, price)
- **Test:** Add to cart functionality
  - Set quantity using selector
  - Click "Add to Cart" button
  - Verify success toast appears
  - Verify cart badge updates with count
- **Test:** Quantity selector validation
  - Verify min quantity is 1
  - Verify max quantity is 99
  - Verify +/- buttons work correctly
- **Test:** Out of stock product handling
  - Verify "Add to Cart" button is disabled for out-of-stock products
  - Verify availability status message displayed

**Technical Notes:**

- Dynamic route: app/products/[id]/page.tsx
- Fetch product by ID from Supabase
- Quantity selector: HTML number input with +/- buttons (elder-friendly large targets)
- Toast notification: Use shadcn/ui Toast component
- Responsive: Full-width image on mobile, centered max-600px container on desktop
- 404 handling: Show friendly error if product not found
- Back button: Browser back works naturally (UX navigation pattern pg 7)

---

## Story 2.3: Shopping Cart Widget & Persistent State

As a **customer**,
I want to see a cart icon with item count in the header,
So that I always know what's in my cart and can access it quickly.

**Acceptance Criteria:**

**Given** I am browsing the store
**When** I add items to cart
**Then** I see:

- Cart icon (shopping cart outline) in top-right header (mobile and desktop)
- Purple badge with item count (purple-600 background, white text, positioned top-right of icon per UX pg 6)
- Badge animates briefly (pulse) when count changes
- Cart icon shows gray when empty, purple-600 when has items

**And** clicking cart icon opens Cart Sheet (sidebar on desktop/tablet, full screen on mobile)

**And** cart state persists during browsing session (localStorage or session state)

**And** cart resets on browser close (no persistence across sessions for MVP)

**Prerequisites:** Story 2.2

**E2E Testing Requirements:**

**Test File:** `tests/e2e/cart-widget.spec.ts`

- **Test:** Cart icon updates when items added
  - Add item to cart from product detail
  - Verify badge appears with correct count
  - Verify badge animates (pulse effect)
  - Verify icon changes from gray to purple
- **Test:** Cart icon opens cart sheet
  - Click cart icon
  - Verify Cart Sheet slides in
- **Test:** Cart state persists during session
  - Add items to cart
  - Navigate to different pages
  - Verify cart count persists
  - Verify cart resets on browser close (new session)

**Technical Notes:**

- Component: CartWidget (UX Design pg 6)
- State management: React Context or Zustand for cart state
- localStorage for session persistence: `nixtia_cart_{sessionId}`
- Badge component: shadcn/ui Badge with custom positioning
- Icon: Lucide React shopping-cart icon
- Animation: Tailwind animate-pulse on count change
- Accessibility: Button labeled "Shopping cart, 3 items" (screen reader support)

---

## Story 2.4: Cart Sheet with Item Management

As a **customer**,
I want to review and modify my cart contents,
So that I can adjust quantities or remove items before checkout.

**Acceptance Criteria:**

**Given** I have items in my cart
**When** I click the cart icon
**Then** a Cart Sheet slides in from the right (desktop/tablet) or up from bottom (mobile) showing:

- List of cart items with: product image (thumbnail), name, price, quantity selector (inline +/- buttons), remove button (red "X")
- Subtotal calculation (sum of all item prices × quantities)
- "Proceed to Checkout" button (primary purple-600, bottom of sheet)
- Empty state if no items: "Your cart is empty. Browse products to get started!"

**And** adjusting quantity updates subtotal in < 200ms (real-time per NFR)

**And** clicking remove shows brief undo toast: "Item removed. Undo?" (3s, manual dismiss)

**And** clicking "Proceed to Checkout" closes sheet and navigates to /checkout

**And** clicking outside sheet or ESC key closes sheet (modal pattern per UX pg 7)

**Prerequisites:** Story 2.3

**E2E Testing Requirements:**

**Test File:** `tests/e2e/cart-management.spec.ts` (uses `CartPage` page object)

- **Test:** Cart sheet displays all items correctly
  - Add multiple items to cart
  - Open cart sheet
  - Verify all items displayed with image, name, price, quantity
  - Verify subtotal calculation is correct
- **Test:** Update item quantity in cart
  - Use `cartPage.updateQuantity()` method
  - Verify subtotal updates in real-time (< 200ms)
- **Test:** Remove item from cart
  - Use `cartPage.removeItem()` method
  - Verify undo toast appears
  - Verify item count decreases
  - Test undo functionality (if clicked within 3s)
- **Test:** Empty cart state
  - Remove all items from cart
  - Verify empty state message displayed
- **Test:** Proceed to checkout navigation
  - Click "Proceed to Checkout" button
  - Verify navigation to `/checkout`
- **Test:** Close cart sheet (ESC key, click outside)
  - Verify sheet closes
  - Verify focus returns to cart icon

**Technical Notes:**

- Component: CartSheet using shadcn/ui Sheet component
- Slide animation: Right-to-left on desktop, bottom-to-top on mobile (responsive)
- Item list: Scrollable if exceeds viewport height
- Quantity controls: Debounce updates to prevent rapid state changes
- Remove with undo: Show toast, keep item in memory for 3s for undo
- Dim background overlay when sheet open (z-index management)
- Accessibility: Focus trap within sheet, ESC closes, focus returns to cart icon on close

---

## Story 2.5: Guest Checkout Form with Phone Input

As a **customer**,
I want to complete checkout by only providing my phone number,
So that I can purchase quickly without creating an account.

**Acceptance Criteria:**

**Given** I click "Proceed to Checkout" from cart
**When** the checkout page loads
**Then** I see a single-screen form with:

- Phone number input with country code dropdown (default: Argentina +54, flag icon, searchable)
- Phone number field with format hint placeholder ("555 123 4567")
- Inline validation: Check format on blur, show green checkmark if valid, red error if invalid
- Error message below field: "Please enter a valid phone number" (red-500, 0.875rem per UX pg 7)
- Order summary sidebar (desktop) or section above form (mobile) showing: cart items, subtotal

**And** form validates phone number format on blur (not just on submit)

**And** empty field on submit shows error: "Phone number is required"

**And** invalid format on submit prevents submission and highlights field with red border

**And** page loads in < 2 seconds

**Prerequisites:** Story 2.4

**E2E Testing Requirements:**

**Test File:** `tests/e2e/guest-checkout.spec.ts`

- **Test:** Checkout form displays correctly
  - Navigate from cart to checkout
  - Verify phone input field with country code selector
  - Verify order summary displays cart items
- **Test:** Phone number validation
  - Test empty field submission → error displayed
  - Test invalid format → error displayed
  - Test valid format → green checkmark displayed
  - Verify inline validation on blur
- **Test:** Country code selector
  - Verify default is Argentina (+54)
  - Verify searchable dropdown works
  - Verify flag icon displayed

**Technical Notes:**

- Component: PhoneInput (custom, UX Design pg 6)
- Country code selector: Use react-phone-number-input or similar library
- Validation: libphonenumber-js for format checking
- Form: React Hook Form for form state and validation
- Label position: Above input (not floating, per UX pg 7)
- Required field indicator: Asterisk (\*) + "(required)" in label
- Accessibility: Proper label association, error linked with aria-describedby
- Layout: Centered 600px max-width container, fields stack vertically

---

## Story 2.6: Payment Method Selector (Visual Cards)

As a **customer**,
I want to choose how I'll pay using clear visual options,
So that I understand the payment process and can select my preferred method.

**Acceptance Criteria:**

**Given** I have entered a valid phone number on checkout
**When** I see the payment method section
**Then** I see three large visual cards (stacked on mobile, 3-column on desktop):

1. **Bank Transfer:** Bank icon, "Bank Transfer" title, "View account details after order" description
2. **Cash/Card on Delivery:** Wallet icon, "Pay on Delivery" title, "Cash or card when you receive" description
3. **Stripe:** Credit card icon, "Card Payment" title, "Pay securely with Stripe" description (UI ready, actual processing post-demo)

**And** cards show:

- Unselected: Gray border (slate-300), white background
- Hover (desktop): Purple border preview
- Selected: Purple border (2px solid purple-600), purple-100 background, checkmark badge top-right

**And** only one payment method can be selected at a time (radio behavior)

**And** no payment method selected on submit shows error: "Please select a payment method" with red highlight on section

**Prerequisites:** Story 2.5

**E2E Testing Requirements:**

**Test File:** `tests/e2e/payment-method.spec.ts`

- **Test:** All payment methods displayed
  - Verify 3 payment method cards visible
  - Verify correct icons and descriptions
- **Test:** Payment method selection (radio behavior)
  - Select Bank Transfer → verify purple border & checkmark
  - Select Cash/Card → verify only one selected at a time
  - Select Stripe → verify visual selection state
- **Test:** Payment method validation
  - Submit without selecting → verify error message
  - Verify error highlights section in red
- **Test:** Responsive layout
  - Mobile: verify vertical stack
  - Desktop: verify 3-column layout

**Technical Notes:**

- Component: PaymentMethodSelector (custom, UX Design pg 6)
- Cards: shadcn/ui Card with custom selection styling
- Icons: Lucide React (Building2, Wallet, CreditCard)
- Radio behavior: HTML radio inputs hidden, cards as visual labels
- Selection state: Controlled component with React state
- Accessibility: Radio group with proper labels, arrow key navigation
- Responsive: Stack vertically on mobile (<768px), 3-column on tablet/desktop

---

## Story 2.7: Order Review & Confirmation

As a **customer**,
I want to review my complete order before submitting,
So that I can verify everything is correct and avoid mistakes.

**Acceptance Criteria:**

**Given** I have entered phone number and selected payment method
**When** I review the order summary
**Then** I see:

- Order summary section showing: list of items (name, quantity, price), subtotal
- My phone number displayed (formatted nicely)
- Selected payment method displayed with icon
- "Complete Order" button (large, primary purple-600 solid, full-width on mobile)

**And** clicking "Complete Order" shows loading state (spinner overlay on button, button disabled, text changes to "Processing...")

**And** order submission completes in < 3 seconds (NFR from PRD)

**And** system validates:

- Cart is not empty
- Phone number format is valid
- Payment method is selected
- Prevents duplicate submission (disable button after first click)

**And** if submission fails (network error), show error toast: "Failed to process order. Please try again." with "Retry" button

**Prerequisites:** Story 2.6

**E2E Testing Requirements:**

**Test File:** `tests/e2e/order-submission.spec.ts`

- **Test:** Order review displays correctly
  - Verify order summary shows all items
  - Verify phone number displayed
  - Verify payment method displayed with icon
- **Test:** Complete order submission (happy path)
  - Fill phone, select payment, click "Complete Order"
  - Verify loading state (spinner, button disabled, text changes)
  - Verify submission completes in < 3s
  - Verify redirection to confirmation page
- **Test:** Order validation
  - Test empty cart → error
  - Test invalid phone → error
  - Test no payment method → error
- **Test:** Duplicate submission prevention
  - Click "Complete Order"
  - Verify button disabled after first click
  - Verify second click does not duplicate order
- **Test:** Network error handling
  - Simulate network failure
  - Verify error toast displays
  - Verify "Retry" button appears

**Technical Notes:**

- Form submission: POST to API route /api/orders
- Loading state: Use shadcn/ui Button loading variant (spinner icon)
- Validation: Client-side pre-checks before API call
- Duplicate prevention: Disable button immediately on click + request debouncing
- Error handling: Network timeout after 10s, show user-friendly error
- Order data structure: { customer_phone, items: [{ product_id, quantity, price }], total, payment_method, status: 'pending' }

---

## Story 2.8: Order Confirmation Page & Success State

As a **customer**,
I want immediate confirmation after placing my order,
So that I know it succeeded and can save my order reference.

**Acceptance Criteria:**

**Given** my order submission succeeded
**When** I am redirected to the confirmation page
**Then** I see:

- Success checkmark animation (green circle with checkmark, scale-in animation)
- "Order Confirmed!" heading (H1, TAN Headline)
- Order reference number (large, bold, copyable text - e.g., "ORD-2025-001234")
- Order summary: items purchased, quantities, total amount
- Payment instructions based on selected method:
  - Bank Transfer: Bank account details, reference number to include
  - Cash/Card: "Pay when you receive your order. Thank you!"
  - Stripe: "Payment processed. Confirmation sent to [phone]." (post-demo)
- "Return to Store" button (secondary style, navigates to homepage)

**And** order reference is selectable/copyable (not an image)

**And** order is saved to Supabase `orders` table with status='confirmed'

**And** page URL is /orders/[order-id] for future reference

**And** cart is cleared after successful order

**Prerequisites:** Story 2.7

**E2E Testing Requirements:**

**Test File:** `tests/e2e/order-confirmation.spec.ts`

- **Test:** Order confirmation page displays correctly
  - Complete checkout flow
  - Verify URL is `/orders/[order-id]`
  - Verify success checkmark animation plays
  - Verify "Order Confirmed!" heading
  - Verify order reference number (format: ORD-YYYY-MMDDHHSS)
  - Verify order summary displayed
- **Test:** Payment instructions display correctly
  - Bank Transfer: verify bank account details shown
  - Cash/Card: verify "Pay when you receive" message
  - Stripe: verify payment processed message (post-demo)
- **Test:** Order reference is copyable
  - Verify order reference is selectable text (not image)
  - Test copy functionality
- **Test:** Cart cleared after order
  - Verify cart badge shows 0
  - Navigate to cart → verify empty state
- **Test:** "Return to Store" button
  - Click button → verify navigation to homepage

**Technical Notes:**

- Success animation: Lottie or CSS animation (scale-in, 0.5s ease-out)
- Order reference format: ORD-YYYY-MMDDHHSS (timestamped for uniqueness)
- API: POST /api/orders creates order record, returns order ID
- Redirect: Server-side redirect or client-side navigate to /orders/[id]
- Payment instructions: Conditional rendering based on payment_method field
- Security: Order ID in URL is NOT guessable (use UUID or nanoid, not sequential)

---

## Story 2.9: Basic Navigation Header (Customer Store)

As a **customer**,
I want simple navigation to move between pages,
So that I can easily browse the store and access my cart.

**Acceptance Criteria:**

**Given** I am anywhere in the customer store
**When** I look at the page header
**Then** I see:

- Nixtia logo/text (left side, clickable, navigates to homepage)
- Cart icon with badge (right side, per Story 2.3)
- Clean white background with subtle bottom border (1px slate-300)
- Sticky header (stays visible when scrolling)

**And** logo uses TAN Headline font, purple-600 color (per UX branding)

**And** header is responsive:

- Mobile (320-767px): Logo + Cart only, minimal padding
- Desktop (1024px+): Centered content, max-width 1280px

**And** header height is 64px (provides adequate touch target area)

**Prerequisites:** Story 2.1

**E2E Testing Requirements:**

**Test File:** `tests/e2e/navigation.spec.ts`

- **Test:** Header displays on all pages
  - Navigate to different pages
  - Verify header is visible and sticky
- **Test:** Logo navigation
  - Click logo → verify navigation to homepage
  - Verify logo uses correct font and color (purple-600)
- **Test:** Responsive header layout
  - Mobile: verify minimal padding, logo + cart only
  - Desktop: verify centered content, max-width 1280px
- **Test:** Accessibility
  - Verify skip-to-main-content link (hidden, visible on focus)
  - Verify semantic nav element

**Technical Notes:**

- Component: Header (layout component)
- Position: Sticky top-0 z-50 (stays above content)
- Logo: Text-based "Nixtia" (no image needed for MVP), links to /
- Responsive: Flexbox with justify-between, padding responsive (1rem mobile, 1.5rem desktop)
- Accessibility: Semantic nav element, skip-to-main-content link (hidden, visible on focus)
- Color: Background white, border-bottom slate-300 (UX pg 3)

---
