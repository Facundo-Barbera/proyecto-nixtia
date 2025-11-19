# 7. UX Pattern Decisions

## 7.1 Consistency Rules

**BUTTON HIERARCHY:**

- **Primary Action:** Solid purple-600 background, white text, medium shadow → Use for main CTAs ("Add to Cart", "Complete Order", "Sign In")
- **Secondary Action:** Purple-600 outline, purple text, no fill → Use for alternate options ("View Details", "Cancel")
- **Tertiary Action:** Ghost (no border, purple text, hover background) → Use for less important actions ("Clear Cart")
- **Destructive Action:** Red-500 solid or outline → Use for delete, remove ("Remove from Cart")

**FEEDBACK PATTERNS:**

- **Success:** Green toast notification top-right, auto-dismiss 3s ("Product added to cart!")
- **Error:** Red toast top-right, manual dismiss with X button ("Failed to process order. Retry?")
- **Warning:** Amber toast top-right, auto-dismiss 5s ("Your session will expire in 5 minutes")
- **Info:** Blue toast top-right, auto-dismiss 4s ("New products added!")
- **Loading:** Inline spinner for buttons, skeleton screens for content areas, progress bar for multi-step

**FORM PATTERNS:**

- **Label Position:** Above input (not floating labels - clearer for accessibility)
- **Required Field Indicator:** Asterisk (\*) next to label + "(required)" in parentheses
- **Validation Timing:** onBlur (when user leaves field) + onSubmit (catch-all)
- **Error Display:** Inline below field in red text with error icon + red border on input
- **Help Text:** Gray text below input (not tooltip - always visible for accessibility)

**MODAL PATTERNS:**

- **Size Variants:** Small (alerts, confirms), Medium (forms, default), Large (complex content), Full (mobile checkout on small screens)
- **Dismiss Behavior:** Click outside to close + Escape key + explicit X button top-right
- **Focus Management:** Auto-focus first input field on open, trap focus within modal, restore focus on close
- **Stacking:** Max 2 modals (rare), dim previous modal if second opens

**NAVIGATION PATTERNS:**

- **Active State:** Purple-600 text + underline (2px) for current page
- **Breadcrumb Usage:** Not needed for flat navigation (only 3-4 top-level pages)
- **Back Button:** Browser back works naturally, no custom back button needed
- **Deep Linking:** All pages URL-addressable (products, cart, checkout use URL params/state)

**EMPTY STATE PATTERNS:**

- **First Use:** Friendly illustration + helpful text + primary CTA ("No products yet. Add your first product!")
- **No Results:** Helpful message + suggestions ("No products match '{{query}}'. Try browsing all products.")
- **Cleared Content:** Brief message + undo option if applicable ("Cart cleared. Undo?")

**CONFIRMATION PATTERNS:**

- **Delete Product (Admin):** Modal confirmation ("Delete {{product_name}}? This cannot be undone." [Cancel] [Delete])
- **Leave Unsaved Form:** Browser confirmation if form dirty ("You have unsaved changes. Leave anyway?")
- **Remove from Cart:** No confirmation (easy to re-add, not destructive enough)
- **Clear Entire Cart:** No confirmation but show undo toast

**NOTIFICATION PATTERNS:**

- **Placement:** Top-right corner (not blocking content)
- **Duration:** Success/Info: auto-dismiss 3-4s, Error/Warning: manual dismiss
- **Stacking:** Vertical stack, max 3 visible (older ones dismissed automatically)
- **Priority Levels:** Error (red, stays until dismissed), Warning (amber, 5s), Success (green, 3s), Info (blue, 4s)

**SEARCH PATTERNS:** (Post-MVP)

- **Trigger:** Type-ahead search, debounced 300ms (search as you type)
- **Results Display:** Dropdown below search input with product cards
- **Filters:** Sidebar on desktop, drawer on mobile
- **No Results:** "No products found for '{{query}}'. Browse all products instead?"

**DATE/TIME PATTERNS:**

- **Format:** Relative for recent ("2 hours ago", "Yesterday"), Absolute for older ("Nov 15, 2025")
- **Timezone:** User's local timezone (detected automatically)
- **Pickers:** Calendar dropdown for date range selection (admin dashboard)

---
