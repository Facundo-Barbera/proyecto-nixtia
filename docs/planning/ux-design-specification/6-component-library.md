# 6. Component Library

## 6.1 Component Strategy

**Base:** shadcn/ui components themed with Nixtia brand

### Standard Components (from shadcn/ui)

| Component | Usage | Customization |
|-----------|-------|---------------|
| Button | CTAs, actions | Gold accent for primary, purple for secondary |
| Input | Forms, search | Nixtia border colors, focus states |
| Select | Dropdowns | Branded styling |
| Card | Product cards, KPI cards | Surface color, shadow |
| Table | Transactions, orders | Striped rows option |
| Dialog | Modals, confirmations | Branded header |
| Toast | Notifications | Success/error/info colors |
| Skeleton | Loading states | Purple-tinted |

### Custom Components

**ProductCard**
- Large product image (aspect-ratio 1:1 or 4:3)
- Product name (Poppins bold)
- Price display (prominent)
- Quantity selector (+/- buttons, input)
- "Add to Cart" button (gold accent)
- States: default, hover, added-to-cart feedback

**CartSummary** (Desktop)
- Sticky right panel
- Line items with quantity adjusters
- Running subtotal
- "Proceed to Checkout" CTA
- Collapsible on tablet

**CartFAB** (Mobile)
- Floating action button (bottom-right)
- Gold background, cart icon
- Badge showing item count
- Expands to cart sheet on tap

**PhoneInput**
- Country code selector (MX default)
- Auto-formatting as user types
- Clear validation feedback
- Large touch target (elder-friendly)

**PaymentMethodSelector**
- Radio card layout (not small radio buttons)
- Icons for each method (bank, cash, card)
- Selected state with gold border
- Expandable details (bank info, etc.)

**KPICard** (Admin)
- Metric label
- Large value display
- Trend indicator (up/down arrow, percentage)
- Subtle icon
- Hover state for detail

**RevenueChart**
- Recharts or Chart.js wrapper
- Line chart for trends
- Bar/pie for payment breakdown
- Nixtia color palette applied
- Responsive sizing

---
