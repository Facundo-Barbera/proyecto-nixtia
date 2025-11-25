# 9. Implementation Guidance

## 9.1 Implementation Priority

**Phase 1: Core Store (MVP)**
1. Product catalog page (mobile + desktop layouts)
2. ProductCard component with quantity selector
3. Cart functionality (FAB mobile, split-panel desktop)
4. Checkout flow (phone → payment → confirm)
5. Order confirmation page

**Phase 2: Admin Dashboard (MVP)**
1. Login page with Supabase auth
2. Dashboard layout (sidebar + content)
3. KPI cards (Revenue, Orders, Payment breakdown)
4. Revenue trend chart
5. Transactions table

**Phase 3: Polish & Enhancement**
1. Loading states (skeletons)
2. Error states and recovery
3. Empty states
4. Toast notifications
5. Responsive refinements

## 9.2 Key Technical Notes

**shadcn/ui Setup**
- Initialize with Tailwind CSS
- Configure theme with Nixtia color variables
- Install: Button, Card, Input, Select, Table, Dialog, Toast

**Typography Setup**
- Load TAN Headline (display)
- Load Libre Baskerville (accent)
- Load Poppins (body/UI)
- Configure Tailwind font families

**Chart Library**
- Recommend: Recharts (React-friendly, customizable)
- Apply Nixtia color palette to charts

## 9.3 Completion Summary

**What This Spec Covers:**
- ✅ Design system: shadcn/ui + Nixtia brand theming
- ✅ Visual foundation: Complete color, typography, spacing systems
- ✅ Design direction: Store (mobile + desktop) + Admin (desktop + mobile)
- ✅ User journeys: Customer purchase flow + Admin dashboard flow
- ✅ Component library: Standard + 7 custom components defined
- ✅ UX patterns: Buttons, feedback, forms, navigation consistency
- ✅ Responsive strategy: Breakpoints and adaptations
- ✅ Accessibility: WCAG 2.1 AA + elder-friendly considerations

**Ready for Implementation:**
This specification provides everything needed for developers to build consistent, branded, accessible interfaces for both the Virtual Store and Admin Dashboard.

---
