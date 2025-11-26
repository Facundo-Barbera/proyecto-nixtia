# Epic 3: Store Experience Completion

**Goal:** Complete the customer-facing store with product detail page and verified cart/checkout functionality.

**User Value:** Customers can view detailed product information before purchasing, and the complete shopping flow works reliably.

**FR Coverage:** FR13 (product detail), FR14 (availability), FR15 (image loading), FR34 (duplicate prevention)

---

## Story 3.1: Product Detail Page

As a **customer**,
I want to **view detailed information about a product**,
So that **I can make an informed purchase decision**.

**Acceptance Criteria:**

**Given** a product in the catalog
**When** the customer clicks on the product card
**Then** they navigate to `/store/[id]` showing:
- Large product image (responsive, optimized with Next.js Image)
- Product name (h1, prominent)
- Full description (not truncated)
- Price with currency (MXN)
- Availability status badge
- "Add to Cart" button (large, accessible, 44x44px touch target)
- Quantity selector (default 1)
- "Back to Store" link

**And** the page fetches product from Supabase by ID:
```typescript
const { data: product } = await supabase
  .from('products')
  .select('*')
  .eq('id', params.id)
  .single()
```

**And** if product not found, show 404 page
**And** if product inactive, show "Product unavailable" message
**And** page is mobile-first responsive (UX spec compliant)

**Prerequisites:** Epic 1 complete

**Technical Notes:**
- Create `src/app/store/[id]/page.tsx`
- Use existing ProductCard styling patterns
- Connect to CartContext for add-to-cart functionality
- Per UX spec: large touch targets, high contrast

---

## Story 3.2: Product Card Links to Detail Page

As a **customer**,
I want to **click a product card to see details**,
So that **I can learn more before adding to cart**.

**Acceptance Criteria:**

**Given** the product grid on `/store`
**When** the customer clicks a product card (not the Add to Cart button)
**Then** they navigate to `/store/[id]`

**And** update `ProductCard` component:
- Wrap card content in `<Link href={`/store/${product.id}`}>`
- Keep "Add to Cart" button functional (stops propagation)
- Add hover state indicating clickable (cursor-pointer, subtle shadow)

**And** clicking "Add to Cart" does NOT navigate (adds to cart only)

**Prerequisites:** Story 3.1

**Technical Notes:**
- Careful with event handling: card click = navigate, button click = add to cart
- Test touch behavior on mobile

---

## Story 3.3: Add to Cart from Detail Page

As a **customer**,
I want to **add products to cart from the detail page**,
So that **I can purchase after viewing details**.

**Acceptance Criteria:**

**Given** the product detail page at `/store/[id]`
**When** the customer selects quantity and clicks "Add to Cart"
**Then** the product is added to cart with selected quantity

**And** show success feedback:
- Toast notification: "Added to cart"
- Cart icon in header updates count
- Button shows brief loading state

**And** if product already in cart, update quantity (don't duplicate)

**And** quantity selector:
- Min: 1
- Max: 99 (or stock if tracked)
- +/- buttons with keyboard accessibility

**Prerequisites:** Story 3.1, Story 3.2

**Technical Notes:**
- Use existing `useCartContext` hook
- Follow existing pattern from ProductCard add-to-cart

---

## Story 3.4: Verify Duplicate Order Prevention

As a **customer**,
I want to **be protected from accidentally submitting duplicate orders**,
So that **I don't get charged twice**.

**Acceptance Criteria:**

**Given** the checkout page with a valid order
**When** the customer clicks "Place Order"
**Then** the button is disabled immediately during submission

**And** if order succeeds, redirect to success page (button stays disabled)
**And** if network error, re-enable button with error message
**And** implement idempotency check:
- Generate client-side idempotency key on checkout page load
- Send with order request
- Server rejects duplicate idempotency keys within 5 minutes

**Prerequisites:** Epic 1 complete

**Technical Notes:**
- Review existing `CheckoutForm` submit handling
- Add idempotency key to order payload
- Server-side: check `orders` table for recent orders with same key

---

## Epic 3 Summary

| Story | Title | Dependencies |
|-------|-------|--------------|
| 3.1 | Product Detail Page | Epic 1 |
| 3.2 | Product Card Links to Detail Page | 3.1 |
| 3.3 | Add to Cart from Detail Page | 3.1, 3.2 |
| 3.4 | Verify Duplicate Order Prevention | Epic 1 |

**Output:** Complete store with product detail pages, verified checkout

---
