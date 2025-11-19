# 6. Component Library

## 6.1 Component Strategy

**From shadcn/ui (Standard Components):**

- Button (primary, secondary, ghost, destructive variants)
- Input, Select, Checkbox, Radio
- Card, Badge, Avatar
- Dialog (Modal), Sheet (Sidebar), Popover
- Dropdown Menu, Tabs
- Toast (notifications)
- Table
- Tooltip

**Custom Components Required:**

### **ProductCard**

**Purpose:** Display product in catalog grid with quick add-to-cart

**Anatomy:**

- Product image (aspect ratio 4:3, object-fit: cover)
- Product name (H4, truncate after 2 lines)
- Product price (large, bold, purple-600)
- Availability status badge (if out of stock)
- "Add to Cart" button (floating bottom right on hover)

**States:**

- Default: Image + text, button hidden
- Hover (desktop): Button slides in from bottom, subtle shadow increases
- Active (mobile): Tap shows button briefly
- Loading: Skeleton placeholder with shimmer effect
- Out of Stock: Grayscale filter on image, "Out of Stock" badge, button disabled

**Variants:**

- Grid view (default): Square-ish cards
- List view: Horizontal layout (image left, content right)

**Behavior:**

- Click card → Navigate to product detail page
- Click "Add to Cart" → Add to cart, show success toast, stop propagation (don't navigate)

**Accessibility:**

- Card is focusable with keyboard
- "Add to Cart" button is separate focusable element
- Screen reader announces: "{{product_name}}, {{price}}, Add to Cart button"

### **CartWidget**

**Purpose:** Persistent cart indicator with item count

**Anatomy:**

- Shopping cart icon (outline style)
- Item count badge (purple-600 background, white text)
- (On click) Slides in Cart Sheet from right

**States:**

- Empty: Gray cart icon, no badge
- Has Items: Purple cart icon, badge with count
- Updating: Brief pulse animation on badge

**Behavior:**

- Click → Open CartSheet sidebar
- Badge animates when count changes

**Accessibility:**

- Button labeled "Shopping cart, {{count}} items"
- Badge has aria-live="polite" for screen reader updates

### **PhoneInput**

**Purpose:** International phone number input with country code selector

**Anatomy:**

- Country code dropdown (flag + code, e.g., "🇦🇷 +54")
- Phone number text input
- Validation feedback (checkmark or error icon)

**States:**

- Default: Empty input, placeholder "555 123 4567"
- Focus: Border highlight (purple-500)
- Valid: Subtle green checkmark icon right side
- Invalid: Red border, error message below, error icon
- Disabled: Gray background, not editable

**Behavior:**

- Type in input → Auto-format phone number based on country
- Validation: On blur, check format matches country pattern
- Error: Show inline message "Please enter a valid phone number"

**Accessibility:**

- Proper label association
- Error message linked with aria-describedby
- Country selector keyboard navigable

### **PaymentMethodSelector**

**Purpose:** Visual card-based payment method selection

**Anatomy:**

- Three large cards side-by-side (mobile: stacked)
- Each card: Icon, method name, brief description
- Selected state: Purple border, checkmark badge top-right

**States:**

- Unselected: Gray border, white background
- Hover: Purple border preview
- Selected: Purple border (2px), purple-100 background, checkmark badge
- Disabled: Grayscale, not clickable (if payment method unavailable)

**Variants:**

- Bank Transfer card: Bank icon, "Bank Transfer", "View account details after order"
- Cash/Card on Delivery: Wallet icon, "Pay on Delivery", "Cash or card when you receive"
- Stripe card: Credit card icon, "Card Payment", "Pay securely with Stripe"

**Behavior:**

- Click card → Select (radio behavior, only one selected)
- Selection changes → Update order summary with any fees if applicable

**Accessibility:**

- Radio group with proper labels
- Keyboard navigable with arrow keys
- Screen reader announces selection state

### **RevenueChart**

**Purpose:** Admin dashboard visual revenue trends over time

**Anatomy:**

- Chart.js or Recharts area/line chart
- X-axis: Date labels (responsive based on range)
- Y-axis: Currency amounts
- Tooltip on hover: Date + exact amount
- Date range selector above chart

**States:**

- Loading: Skeleton chart placeholder with shimmer
- Data loaded: Smooth animation drawing chart
- No data: Empty state with message "No sales data for this period"

**Variants:**

- Daily view: Show 7-30 days
- Weekly view: Show 12-16 weeks
- Monthly view: Show 6-12 months

**Behavior:**

- Hover data point → Show tooltip with details
- Select date range → Fetch new data, re-render chart with transition

**Accessibility:**

- Chart has text alternative describing trend
- Data table toggle for screen readers

---
