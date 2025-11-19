# 1. Design System Foundation

## 1.1 Design System Choice

**Selected:** **shadcn/ui** (Modern, customizable, Tailwind-based)

**Rationale:**

- **Highly customizable** - Can adapt completely to Nixtia's purple brand identity
- **Accessibility built-in** - WCAG 2.1 AA compliant by default, critical for elder-friendly UX
- **Modern components** - Beautiful, minimal aesthetic that feels professional
- **Tailwind-based** - Rapid prototyping and easy theming
- **Mobile-first** - Perfect for 80% mobile traffic expectation
- **Radix UI primitives** - Industry-leading accessible unstyled components underneath

**Components Provided:**

- Buttons (all variants), Forms (inputs, selects, checkboxes), Modals/Dialogs, Navigation components, Cards, Alerts/Toasts, Badges, Tables, Dropdown menus, Tabs, Tooltips

**Custom Components Needed:**

- **Product Card** (with add-to-cart interaction)
- **Cart Widget** (persistent floating cart with count badge)
- **Phone Input** (with country code selector)
- **Payment Method Selector** (visual cards for bank/cash/Stripe)
- **Revenue Chart** (Chart.js or Recharts integration)

---
