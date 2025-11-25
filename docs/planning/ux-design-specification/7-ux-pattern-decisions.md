# 7. UX Pattern Decisions

## 7.1 Consistency Rules

**Button Hierarchy**
| Type | Style | Usage |
|------|-------|-------|
| Primary | Gold background (#ffbb1c), dark text | Main CTAs: Add to Cart, Checkout, Login |
| Secondary | Purple outline (#4b4877) | Secondary actions: View details, Cancel |
| Ghost | Text only, purple | Tertiary: Back, Skip, minor actions |
| Destructive | Coral red (#f53f67) | Remove item, Delete, Logout |

**Feedback Patterns**
| Type | Pattern | Behavior |
|------|---------|----------|
| Success | Toast (top-right) | Auto-dismiss 3s, green accent |
| Error | Inline + Toast | Inline for forms, toast for system errors |
| Loading | Skeleton → Content | Skeleton loaders, no spinners on main content |
| Progress | Button loading state | Disable + spinner on submit buttons |

**Form Patterns**
| Element | Decision |
|---------|----------|
| Labels | Above input (not floating) — clearer for elder users |
| Required fields | Asterisk (*) with legend |
| Validation | On blur + on submit |
| Error display | Inline below field, red text |
| Help text | Below label, muted color |

**Empty States**
| Context | Content |
|---------|---------|
| Empty cart | Illustration + "Your cart is empty" + CTA to shop |
| No orders (admin) | "No orders yet" + encouraging message |
| No data (charts) | Placeholder chart with "Data will appear here" |

**Confirmation Patterns**
| Action | Confirmation |
|--------|--------------|
| Remove from cart | Immediate (with undo toast) |
| Place order | Review step before confirm |
| Logout (admin) | None — immediate |
| Delete product (future) | Modal confirmation |

**Navigation Patterns**
| Context | Pattern |
|---------|---------|
| Store (mobile) | Minimal header + FAB cart |
| Store (desktop) | Header + sticky cart panel |
| Admin (desktop) | Sidebar + header |
| Admin (mobile) | Bottom nav or hamburger |
| Back navigation | Browser back works naturally |

## 7.2 Interaction States

**All Interactive Elements:**
- Default → Hover → Active → Focus → Disabled
- Focus rings visible (accessibility)
- Minimum touch target: 44×44px (mobile)

---
