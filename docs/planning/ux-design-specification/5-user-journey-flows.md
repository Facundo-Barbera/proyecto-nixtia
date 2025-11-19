# 5. User Journey Flows

## 5.1 Critical User Paths

### Journey 1: **Browse → Add to Cart → Checkout** (Customer Core Flow)

**User Goal:** Purchase nixtamalized corn products quickly from mobile device

**Flow Approach:** Progressive disclosure - start simple, add complexity only when needed

**Steps:**

1. **Landing / Product Catalog** (Entry Point)
   - User sees: Grid of product cards with large images, names, prices
   - User does: Scrolls to browse, taps card to view details
   - System responds: Smooth scroll, instant card tap feedback

2. **Product Detail** (Information)
   - User sees: Large image, full description, price, quantity selector, "Add to Cart" button
   - User does: Adjusts quantity (default: 1), taps "Add to Cart"
   - System responds: Cart icon badge updates with count + brief success toast

3. **Cart Review** (Optional but Encouraged)
   - User sees: Persistent cart icon in header (shows item count)
   - User does: Taps cart icon
   - System responds: Cart sidebar slides in from right showing items, quantities, total

4. **Cart Management** (Refinement)
   - User sees: List of cart items with inline quantity controls, remove buttons, subtotal
   - User does: Adjusts quantities, removes items, taps "Proceed to Checkout"
   - System responds: Inline updates to totals, smooth transition to checkout form

5. **Checkout Form** (Conversion Critical)
   - User sees: Single-screen form - Phone number input (with country code), Payment method selector (3 visual cards), Order summary, "Complete Order" button
   - User does: Enters phone, selects payment method, taps "Complete Order"
   - System responds: Inline validation on phone number, visual selection state on payment method

6. **Order Confirmation** (Success State)
   - User sees: Success checkmark animation, order reference number (large, copyable), order summary, payment instructions (if bank transfer), "Return to Store" button
   - User does: Screenshots/copies order number, follows payment instructions
   - System responds: Order reference is selectable text, payment details clearly displayed

**Decision Points:**

- Cart empty? → Show empty state with "Browse Products" CTA
- Invalid phone number? → Inline error message below input, prevent submission
- Payment method not selected? → Highlight payment selector with error border

**Error States:**

- Network failure on checkout submission → Show retry button with error message
- Duplicate order detected → Confirm with user: "You just placed this order. Submit again?"

**Success Flow Diagram:**

```
[Product Catalog]
       ↓ (tap product)
[Product Detail]
       ↓ (add to cart)
[Cart Icon Badge Updates]
       ↓ (tap cart icon)
[Cart Sidebar Slides In]
       ↓ (proceed to checkout)
[Checkout Form]
       ↓ (complete order)
[Order Confirmation]
```

### Journey 2: **Admin Login → Dashboard Analytics** (Business Owner Core Flow)

**User Goal:** Log in and immediately see business performance

**Flow Approach:** Single-screen dashboard with all three analytics widgets visible

**Steps:**

1. **Login Screen** (Entry)
   - User sees: Simple email/password form, "Remember me" checkbox, "Forgot password?" link (disabled for demo)
   - User does: Enters credentials, checks "Remember me", taps "Sign In"
   - System responds: Loading spinner on button, validates credentials, redirects to dashboard

2. **Dashboard Home** (Primary Screen)
   - User sees: Three prominent widgets - Revenue Chart (top, large), Transactions Table (middle), Payment Breakdown Chart (bottom right)
   - User does: Views analytics, hovers over chart elements for details, scrolls for more transactions
   - System responds: Interactive chart tooltips, smooth scrolling

3. **Date Range Filtering** (Optional)
   - User sees: Date range picker above revenue chart
   - User does: Selects date range (Daily, Weekly, Monthly, Custom)
   - System responds: Revenue chart updates with filtered data, totals recalculate

4. **Transaction Details** (Optional)
   - User sees: Transaction table with Date, Customer Phone, Total, Payment Method columns
   - User does: Scans recent orders
   - System responds: (Post-demo: Sort, search, filter capabilities)

**Decision Points:**

- Invalid credentials? → Inline error below form: "Invalid email or password"
- Session expired? → Redirect to login with message: "Session expired, please log in again"

**Error States:**

- Dashboard load failure → Show error with "Retry" button
- Chart render error → Fallback to table view

### Journey 3: **Product Management** (Post-Demo Admin Flow)

**User Goal:** Add/edit products independently

**Flow Approach:** Table view with inline editing + modal for creation

**Steps:**

1. **Products Tab** (Entry)
   - User sees: Table of products (Image thumbnail, Name, Price, Status toggle, Actions)
   - User does: Taps "Add New Product" button
   - System responds: Modal opens with product creation form

2. **Add Product Form** (Modal)
   - User sees: Form fields - Image upload, Name, Description, Price, Active toggle, "Save" / "Cancel"
   - User does: Fills form, uploads image (drag-drop or click), taps "Save"
   - System responds: Image preview updates, validation on required fields, success toast on save

3. **Edit Product** (Inline)
   - User sees: Pencil icon in Actions column
   - User does: Taps edit icon
   - System responds: Row expands to inline edit mode OR modal opens (TBD during implementation)

4. **Toggle Active/Inactive** (Quick Action)
   - User sees: Toggle switch in Status column
   - User does: Taps toggle
   - System responds: Instant visual update, brief confirmation toast

---
