# Component Inventory - Nixtia

**Generated:** 2025-11-24
**Project:** proyecto-nixtia
**UI Framework:** React 19.2.0 + Next.js 16 App Router

## Overview

Nixtia's component library follows atomic design principles with shadcn/ui as the foundation. Components are organized by domain (ui, landing, store, admin, shared) for clarity and reusability.

**Total Components:** 24+ identified
**Component Library:** shadcn/ui with Radix UI primitives
**Styling:** Tailwind CSS 4.x with class-variance-authority

---

## Component Categories

### 1. Base UI Components (shadcn/ui)

**Location:** `src/components/ui/`

**Purpose:** Foundational, framework-agnostic UI primitives

| Component | File | Description | Radix Primitive |
|-----------|------|-------------|-----------------|
| Button | `button.tsx` | Primary action buttons with variants | @radix-ui/react-slot |
| Card | `card.tsx` | Container for content sections | N/A (pure CSS) |
| Input | `input.tsx` | Form text inputs | N/A |
| Badge | `badge.tsx` | Status/category labels | N/A |
| Alert | `alert.tsx` | Notifications and messaging | N/A |
| Table | `table.tsx` | Data table structure | N/A |

**Variants:**
- **Button:** primary, secondary, outline, ghost, link, destructive
- **Badge:** default, secondary, outline, destructive
- **Alert:** default, destructive

**Accessibility:** WCAG AA compliant (per architecture ADR-003)

---

### 2. Landing Page Components

**Location:** `src/components/landing/`

**Purpose:** Marketing and educational content for homepage

| Component | File | Description | Used In |
|-----------|------|-------------|---------|
| HeroSection | `HeroSection.tsx` | Above-fold hero with CTA | `/landing` page |
| ValueProposition | `ValueProposition.tsx` | Brand values and benefits | `/landing` page |
| FeaturedProducts | `FeaturedProducts.tsx` | Product showcase carousel/grid | `/landing` page |
| EducationalContent | `EducationalContent.tsx` | Nixtamalization process explanation | `/landing` page |
| LandingFooter | `LandingFooter.tsx` | Footer with links and branding | `/landing` page |

**Design Patterns:**
- Full-width sections with constrained content (max-width container)
- Mobile-first responsive breakpoints
- Image optimization via Next.js Image component

**Assets Used:**
- `public/hero-corn.jpg`
- `public/nixtamalization-process.jpg`

---

### 3. Store/E-Commerce Components

**Location:** `src/components/store/`

**Purpose:** Product browsing and checkout flow

| Component | File | Description | State Management |
|-----------|------|-------------|------------------|
| ProductCard | `ProductCard.tsx` | Product display with add-to-cart | Props |
| CartWidget | `CartWidget.tsx` | Shopping cart UI with item list | Context (CartContext) |
| CheckoutForm | `CheckoutForm.tsx` | Customer info + payment selection | react-hook-form |
| PhoneInputField | `PhoneInputField.tsx` | Phone number input with validation | Controlled component |
| PaymentMethodSelector | `PaymentMethodSelector.tsx` | Radio group for payment options | Controlled component |
| OrderDetailsCard | `OrderDetailsCard.tsx` | Order summary display | Props |
| OrderNumberCopy | `OrderNumberCopy.tsx` | Copy-to-clipboard for order number | Local state |
| PaymentInstructions | `PaymentInstructions.tsx` | Post-checkout payment instructions | Props |
| ClearCartOnMount | `ClearCartOnMount.tsx` | Side-effect component (clears cart) | Context (CartContext) |

**Forms & Validation:**
- **Library:** react-hook-form + @hookform/resolvers
- **Schema Validation:** Zod
- **Phone Input:** react-phone-number-input (E.164 format)

**Cart State:**
- **Context Provider:** `src/contexts/CartContext.tsx` (assumed)
- **Persistence:** localStorage or sessionStorage (mobile-first)

---

### 4. Admin Dashboard Components

**Location:** `src/components/admin/`

**Purpose:** Business intelligence and order management

| Component | File | Description | Data Source |
|-----------|------|-------------|-------------|
| LoginForm | `LoginForm.tsx` | Email/password login | Supabase Auth |
| LogoutButton | `LogoutButton.tsx` | Sign out action | Supabase Auth |
| TransactionsTable | `TransactionsTable.tsx` | Order history table | API + Prisma |
| StatusBadge | `StatusBadge.tsx` | Order/payment status indicators | Props |

**Admin Features:**
- **Authentication:** Supabase session-based auth
- **Authorization:** RLS policies on `admin_users` table
- **Data Fetching:** Server Components (Next.js App Router)

**Table Features:**
- Sortable columns
- Status filtering
- Date range filtering (planned)
- Pagination (planned)

---

### 5. Shared Components

**Location:** `src/components/shared/`

**Purpose:** Reusable components across all sections

| Component | File | Description | Used In |
|-----------|------|-------------|---------|
| Header | `Header.tsx` | Top navigation bar | All pages (root layout) |

**Navigation Structure:**
- Logo/brand link to home
- Main nav links (Landing, Store, Admin)
- Cart icon with item count (store pages)
- Responsive mobile menu (hamburger)

---

## Component Composition Patterns

### 1. Compound Components

**Example: Card**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Footer */}
  </CardFooter>
</Card>
```

### 2. Controlled Form Components

**Example: PhoneInputField**
```tsx
<PhoneInputField
  value={phoneNumber}
  onChange={setPhoneNumber}
  error={errors.phone?.message}
/>
```

### 3. Context-Aware Components

**Example: CartWidget**
```tsx
const { items, removeItem, updateQuantity } = useCart();
```

---

## Component Dependencies

### Core Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| react | 19.2.0 | UI framework |
| react-dom | 19.2.0 | DOM rendering |
| react-hook-form | ^7.66.1 | Form state management |
| @hookform/resolvers | ^5.2.2 | Validation integration |
| zod | ^4.1.13 | Schema validation |
| @radix-ui/react-slot | ^1.2.4 | Polymorphic components |
| lucide-react | ^0.554.0 | Icon library |
| react-hot-toast | ^2.6.0 | Toast notifications |
| react-phone-number-input | ^3.4.14 | Phone input component |

### Utility Libraries

| Library | Purpose |
|---------|---------|
| clsx | Conditional classNames |
| tailwind-merge | Merge Tailwind classes |
| class-variance-authority | Component variants |
| date-fns | Date formatting |

---

## Component Testing

**Test Framework:** Vitest + @testing-library/react (unit tests)
**E2E Tests:** Playwright

**Test Coverage:**
- Unit tests for isolated components (planned)
- Integration tests for forms and cart logic
- E2E tests for critical user flows

**Run Tests:**
```bash
npm run test              # Unit tests
npm run test:ui           # Unit tests with UI
npm run test:e2e          # E2E tests
```

---

## Component Documentation Standards

### Props Interface

All components use TypeScript interfaces for props:

```typescript
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  };
  onAddToCart: (productId: string) => void;
}
```

### Component File Structure

```tsx
// 1. Imports
import { ComponentProps } from './types';

// 2. Interface/Type definitions
interface MyComponentProps { ... }

// 3. Component implementation
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // ...
}

// 4. Default export (if applicable)
export default MyComponent;
```

---

## Styling Conventions

### Tailwind CSS Patterns

- **Mobile-first:** Base styles for mobile, use `md:`, `lg:` for larger screens
- **Spacing:** 4px base unit (Tailwind default)
- **Colors:** Design tokens from globals.css
- **Hover/Focus:** Always include focus states for accessibility

### Class Composition

```tsx
import { cn } from '@/lib/utils';

<button className={cn(
  "base-classes",
  variant === "primary" && "variant-classes",
  className  // Allow prop overrides
)} />
```

---

## Component Design System

**Colors:**
- Primary: Purple 600 (`#7c3aed`)
- Hover: Purple 500 (`#8b5cf6`)
- Active: Purple 700 (`#6d28d9`)

**Typography:**
- Headings: Inter (TAN Headline planned)
- Body: Inter
- Monospace: JetBrains Mono

**Component Sizes:**
- sm, md (default), lg, xl

**Border Radius:**
- Default: `rounded-md` (0.375rem)
- Cards: `rounded-lg` (0.5rem)

---

## Reusability Guidelines

### When to Create a New Component

✅ **Do create a component when:**
- Logic is reused 2+ times
- Component has distinct, testable behavior
- Improves readability by abstracting complexity

❌ **Don't create a component for:**
- One-off layouts (use inline JSX)
- Trivial wrappers (e.g., `<div className="flex">`)

### Component Naming

- **PascalCase:** All component files (e.g., `ProductCard.tsx`)
- **Descriptive:** Name reflects purpose (e.g., `PhoneInputField`, not `Input2`)
- **Domain prefix:** For domain-specific components (e.g., `AdminLoginForm`)

---

## References

- shadcn/ui Docs: [ui.shadcn.com](https://ui.shadcn.com)
- Radix UI: [radix-ui.com](https://www.radix-ui.com)
- UX Design Spec: [docs/planning/ux-design-specification/](../planning/ux-design-specification/)
- Component Library: [docs/planning/ux-design-specification/6-component-library.md](../planning/ux-design-specification/6-component-library.md)
