# 4. Design Direction

## 4.1 Virtual Store — Mobile

| Dimension | Direction | Rationale |
|-----------|-----------|-----------|
| **Layout** | Single column, vertical scroll | Mobile-native, thumb-friendly |
| **Density** | Spacious | Elder-friendly, large touch targets (min 44px) |
| **Visual Weight** | Warm & inviting | Food context, brand personality |
| **Imagery** | Product-forward | Large product photos drive appetite |
| **Navigation** | Sticky cart FAB, minimal header | Speed to checkout, always accessible |
| **Flow** | Products → Cart → Checkout | Linear, no branching |

**Vibe:** Like ordering from a trusted friend's menu — warm, simple, immediate.

## 4.2 Virtual Store — Desktop

| Dimension | Direction | Rationale |
|-----------|-----------|-----------|
| **Layout** | Split: Products (65%) / Cart (35%) | Cart always visible, no surprises |
| **Density** | Balanced | More screen real estate, still clean |
| **Visual Weight** | Warm, premium feel | Elevated from mobile, same brand warmth |
| **Imagery** | Large product cards | Appetite-driving visuals |
| **Navigation** | Header with logo, cart summary sticky on right | One-click checkout always accessible |
| **Flow** | Browse left, cart updates right, checkout expands | Real-time feedback as customer builds order |

**Vibe:** Like a curated market stall with your basket beside you — everything visible, nothing hidden.

## 4.3 Admin Dashboard — Desktop (Primary)

| Dimension | Direction | Rationale |
|-----------|-----------|-----------|
| **Layout** | Sidebar navigation + main content area | Desktop standard, clear section access |
| **Density** | Balanced | Enough data to impress, not overwhelming |
| **Visual Weight** | Professional/clean | SaaS credibility for demo/sale |
| **Data Display** | Card-based KPI metrics + data tables | Visual impact + actionable detail |
| **Charts** | Revenue trend line, payment method breakdown | Immediate "I understand my business" moment |
| **Navigation** | Collapsible sidebar, breadcrumbs | Scalable for future features |

**Vibe:** Like logging into a tool that finally makes sense of the chaos — clarity from day one.

## 4.4 Admin Dashboard — Mobile (Secondary)

| Dimension | Direction | Rationale |
|-----------|-----------|-----------|
| **Layout** | Single column, stacked cards | Functional mobile fallback |
| **Navigation** | Bottom nav or hamburger menu | Thumb-accessible |
| **Data Display** | Simplified cards, key metrics only | Quick glance on-the-go |
| **Charts** | Simplified or hidden, tap to expand | Performance over polish on mobile |

**Vibe:** Quick business pulse check while away from desk — functional, not primary.

## 4.5 Responsive Breakpoints

| Breakpoint | Width | Store Behavior | Admin Behavior |
|------------|-------|----------------|----------------|
| **Mobile** | < 768px | Single column, FAB cart | Stacked cards, bottom nav |
| **Tablet** | 768px - 1024px | Split layout (50/50) | Sidebar collapsed by default |
| **Desktop** | > 1024px | Split layout (65/35) | Full sidebar, expanded view |

**Interactive Mockups:**

- Design Direction Showcase: [ux-design-directions.html](./ux-design-directions.html)

---
