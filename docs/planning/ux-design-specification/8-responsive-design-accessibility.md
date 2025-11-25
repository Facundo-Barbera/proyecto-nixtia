# 8. Responsive Design & Accessibility

## 8.1 Responsive Strategy

**Breakpoints (Tailwind defaults)**
| Name | Width | Target |
|------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

**Store Adaptations**
| Element | Mobile (<768px) | Desktop (≥1024px) |
|---------|-----------------|-------------------|
| Layout | Single column | Split (65/35) |
| Cart | FAB + bottom sheet | Sticky right panel |
| Product cards | Full width, stacked | Grid or side-by-side |
| Checkout | Full screen flow | Inline in cart panel |
| Header | Minimal (logo + cart) | Full (logo + nav + cart) |

**Admin Adaptations**
| Element | Mobile (<768px) | Desktop (≥1024px) |
|---------|-----------------|-------------------|
| Navigation | Bottom nav / hamburger | Sidebar |
| KPI cards | Stacked, 1 per row | 3-4 per row |
| Charts | Simplified, tap to expand | Full interactive |
| Tables | Card view per row | Full table |

## 8.2 Accessibility Requirements

**Target:** WCAG 2.1 Level AA

**Color Contrast**
- Text on background: minimum 4.5:1
- Large text (18px+): minimum 3:1
- UI components: minimum 3:1
- All Nixtia colors tested for compliance

**Keyboard Navigation**
- All interactive elements focusable
- Logical tab order
- Visible focus indicators (not just outline)
- Skip-to-content link on all pages
- Escape closes modals

**Screen Reader Support**
- Semantic HTML (nav, main, article, etc.)
- ARIA labels on icon-only buttons
- Form labels properly associated
- Error messages announced
- Dynamic content updates announced

**Motor Accessibility**
- Touch targets: minimum 44×44px
- Adequate spacing between targets
- No time-limited interactions
- Single-tap actions (no complex gestures required)

**Elder-Friendly Considerations** (Target user context)
- Large, readable text (base 16px minimum)
- High contrast mode support
- Clear, simple language
- No auto-playing media
- Obvious interactive elements (buttons look like buttons)

---
