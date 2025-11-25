# 3. Visual Foundation

## 3.1 Color System

**Source:** Nixtia brand assets (`docs/nixtia-assets/`)

### Primary Palette

| Color | Hex | Semantic Usage |
|-------|-----|----------------|
| Deep Purple | `#4b4877` | Primary brand color, headers, navigation backgrounds |
| Rich Purple | `#6b4179` | Secondary purple, hover states, accents |
| Dark Purple | `#241140` | Dark backgrounds, text on light, footer |
| Marigold Gold | `#ffbb1c` | **Primary CTAs**, highlights, key actions, cart button |

### Secondary Palette

| Color | Hex | Semantic Usage |
|-------|-----|----------------|
| Magenta | `#7b2d81` | Accent, promotional badges |
| Pink | `#d4528f` | Secondary accent, decorative |
| Orange | `#f57532` | Warnings, attention states |
| Teal | `#218c9d` | Info states, links, secondary actions |
| Olive Green | `#668622` | Success states, confirmations, "in stock" |
| Coral Red | `#f53f67` | Error states, destructive actions, alerts |

### Semantic Color Mapping

```
--primary: #4b4877        /* Main brand actions */
--primary-hover: #6b4179  /* Primary hover state */
--primary-dark: #241140   /* Dark mode / contrast */

--accent: #ffbb1c         /* CTAs, Add to Cart, key actions */
--accent-hover: #e5a818   /* Accent hover (slightly darker gold) */

--success: #668622        /* Order confirmed, in stock */
--warning: #f57532        /* Attention needed */
--error: #f53f67          /* Errors, out of stock, delete */
--info: #218c9d           /* Informational, links */

--background: #ffffff     /* Main background */
--surface: #f8f7fc        /* Cards, elevated surfaces (slight purple tint) */
--border: #e5e4eb         /* Borders (muted purple-gray) */

--text-primary: #241140   /* Main text (dark purple) */
--text-secondary: #6b4877 /* Secondary text */
--text-muted: #9994a8     /* Muted/placeholder text */
--text-inverse: #ffffff   /* Text on dark backgrounds */
```

## 3.2 Typography System

**Source:** Nixtia brand assets

| Role | Font | Usage |
|------|------|-------|
| **Display/Headlines** | TAN Headline | Logo, hero text, major section headers |
| **Elegant Accent** | Libre Baskerville | Subheadings, quotes, premium feel moments |
| **Body/UI** | Poppins | Primary UI text, buttons, labels, body copy |
| **Fallback** | Inter, Open Sauce, system sans-serif | Fallback stack |

### Type Scale

```
--text-xs: 0.75rem      /* 12px - captions, fine print */
--text-sm: 0.875rem     /* 14px - secondary text, labels */
--text-base: 1rem       /* 16px - body text */
--text-lg: 1.125rem     /* 18px - large body, intro text */
--text-xl: 1.25rem      /* 20px - small headings */
--text-2xl: 1.5rem      /* 24px - section headings */
--text-3xl: 1.875rem    /* 30px - page titles */
--text-4xl: 2.25rem     /* 36px - hero headlines */
--text-5xl: 3rem        /* 48px - major display text */
```

## 3.3 Spacing System

**Base unit:** 4px (Tailwind default)

```
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
```

## 3.4 Visual Motifs

**Mexican Folk Art Elements** (from brand assets):
- Decorative flourishes around logo
- Floral/botanical border patterns
- Use sparingly: headers, dividers, special moments
- NOT on every component — reserve for brand moments

**Interactive Visualizations:**

- Color Theme Explorer: [ux-color-themes.html](./ux-color-themes.html)

---
