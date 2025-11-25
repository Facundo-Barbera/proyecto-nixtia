# Nixtia Project Documentation Index

**Generated:** 2025-11-24
**Project:** proyecto-nixtia
**Purpose:** Master index for AI-assisted development

---

## 📖 About This Index

This is your **primary entry point** for AI-assisted development on the Nixtia project. All documentation is organized by workflow phase and purpose, making it easy to find the context you need for any development task.

---

## 🎯 Quick Reference

### Project Overview

- **Type:** Web Application (Full-Stack Monolith)
- **Primary Language:** TypeScript
- **Framework:** Next.js 16 (App Router)
- **Architecture:** Layered SSR application with React Server Components
- **Database:** PostgreSQL (Prisma ORM + Supabase)
- **Phase:** Implementation (Phase 3)

### Tech Stack Summary

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Next.js 16, Tailwind CSS 4, shadcn/ui |
| **Backend** | Next.js API Routes, Prisma, Supabase Auth |
| **Database** | PostgreSQL (Supabase-hosted) |
| **Testing** | Vitest (unit), Playwright (E2E) |
| **Deployment** | Vercel / Docker |

### Key Entry Points

| File | Purpose |
|------|---------|
| [src/app/layout.tsx](../src/app/layout.tsx) | Root layout - app shell |
| [src/middleware.ts](../src/middleware.ts) | Auth middleware |
| [next.config.ts](../next.config.ts) | Next.js configuration |
| [prisma/schema.prisma](../prisma/schema.prisma) | Database schema |

---

## 📂 Documentation Structure

### 1. Brownfield Documentation (Codebase Scan)

**Location:** `docs/brownfield/`

These documents were auto-generated from the existing codebase to provide comprehensive reference for AI-assisted development:

| Document | Description | Use When |
|----------|-------------|----------|
| **[Project Overview](./brownfield/project-overview.md)** | High-level project summary | Getting project context |
| **[Data Models](./brownfield/data-models.md)** | Database schema, tables, relationships | Working with data layer |
| **[API Contracts](./brownfield/api-contracts.md)** | API endpoints, request/response schemas | Building/consuming APIs |
| **[Component Inventory](./brownfield/component-inventory.md)** | UI component catalog | Building UI features |
| **[Source Tree Analysis](./brownfield/source-tree-analysis.md)** | Directory structure, file organization | Navigating codebase |
| **[Development Guide](./brownfield/development-guide.md)** | Setup, workflow, testing, deployment | Developer onboarding |

---

### 2. BMM Workflow Documentation

**Purpose:** Planning artifacts from BMad Method workflow (Phases 0-2)

#### Phase 0: Discovery

**Location:** `docs/discovery/`

| Document | Description |
|----------|-------------|
| **[Brainstorming Session](./discovery/brainstorming-session-results-2025-11-15/)** | Initial ideation and feature discovery |
| **[Product Brief](./discovery/product-brief-proyecto-nixtia-2025-11-15 19-16-57-035/)** | Core vision, market context, MVP scope |

**Key Files:**
- [Executive Summary](./discovery/product-brief-proyecto-nixtia-2025-11-15 19-16-57-035/executive-summary.md)
- [Core Vision](./discovery/product-brief-proyecto-nixtia-2025-11-15 19-16-57-035/core-vision.md)
- [MVP Scope](./discovery/product-brief-proyecto-nixtia-2025-11-15 19-16-57-035/mvp-scope.md)

---

#### Phase 1: Planning

**Location:** `docs/planning/`

| Document | Description | Use When |
|----------|-------------|----------|
| **[PRD](./planning/PRD/)** | Product Requirements Document | Understanding requirements |
| **[Epics](./planning/epics/)** | Epic breakdown and coverage | Planning features |
| **[UX Design Specification](./planning/ux-design-specification/)** | Design system, components, patterns | Building UI |

**PRD Key Sections:**
- [Executive Summary](./planning/PRD/executive-summary.md)
- [Functional Requirements](./planning/PRD/functional-requirements.md)
- [Non-Functional Requirements](./planning/PRD/non-functional-requirements.md)
- [Web App Specific Requirements](./planning/PRD/web-app-specific-requirements.md)

**Epic Files:**
- [Epic 1: Foundation & Infrastructure](./planning/epics/epic-1-foundation-infrastructure.md)
- [Epic 2: Customer Store Experience](./planning/epics/epic-2-customer-store-experience.md)
- [Epic 3: Admin Business Intelligence](./planning/epics/epic-3-admin-business-intelligence.md)
- [Epic 4: Product Management & Landing Page](./planning/epics/epic-4-product-management-landing-page.md)

**UX Design Key Sections:**
- [Design System Foundation](./planning/ux-design-specification/1-design-system-foundation.md)
- [Core User Experience](./planning/ux-design-specification/2-core-user-experience.md)
- [Visual Foundation](./planning/ux-design-specification/3-visual-foundation.md)
- [Component Library](./planning/ux-design-specification/6-component-library.md)
- [Responsive Design & Accessibility](./planning/ux-design-specification/8-responsive-design-accessibility.md)

---

#### Phase 2: Solutioning

**Location:** `docs/solutioning/`

| Document | Description | Use When |
|----------|-------------|----------|
| **[Architecture](./solutioning/architecture.md)** | System architecture + ADRs | Making architectural decisions |
| **[Epic Breakdown (Technical)](./solutioning/epic-breakdown-technical.md)** | Technical epic breakdown | Understanding implementation scope |
| **[Test Design Strategy](./solutioning/test-design-strategy.md)** | Testing approach and coverage | Writing tests |
| **[Implementation Readiness](./solutioning/implementation-readiness-report-20251118.md)** | Pre-implementation validation | Verifying readiness |

---

#### Phase 3: Implementation (Archived)

**Location:** `docs/sprint-artifacts/archive/`

Completed user stories from initial implementation:

**Stories:**
- [1-1: Project Setup & Core Dependencies](./sprint-artifacts/archive/stories/1-1-project-setup-core-dependencies.md)
- [1-2: Supabase Integration & Database Setup](./sprint-artifacts/archive/stories/1-2-supabase-integration-database-setup.md)
- [2-1: Product Catalog Grid (Mobile-First)](./sprint-artifacts/archive/stories/2-1-product-catalog-grid-mobile-first.md)
- [2-3: Shopping Cart Widget & Persistent State](./sprint-artifacts/archive/stories/2-3-shopping-cart-widget-persistent-state.md)
- [2-5: Guest Checkout Form with Phone Input](./sprint-artifacts/archive/stories/2-5-guest-checkout-form-with-phone-input.md)
- [2-8: Order Confirmation Page (Success State)](./sprint-artifacts/archive/stories/2-8-order-confirmation-page-success-state.md)
- [3-1: Admin Authentication (Email/Password Login)](./sprint-artifacts/archive/stories/3-1-admin-authentication-email-password-login.md)
- [3-5: Transactions Table Widget](./sprint-artifacts/archive/stories/3-5-transactions-table-widget.md)

---

## 🗂️ Documentation by Use Case

### Use Case 1: Understanding the Project

**Start here:**
1. [Project Overview](./brownfield/project-overview.md) - High-level summary
2. [PRD Executive Summary](./planning/PRD/executive-summary.md) - Product vision
3. [Architecture](./solutioning/architecture.md) - Technical decisions

---

### Use Case 2: Building a New Feature

**Follow this path:**

1. **Requirements:** [PRD Functional Requirements](./planning/PRD/functional-requirements.md)
2. **Design:** [UX Design Specification](./planning/ux-design-specification/)
3. **Architecture:** [Architecture Document](./solutioning/architecture.md)
4. **Data:** [Data Models](./brownfield/data-models.md)
5. **Components:** [Component Inventory](./brownfield/component-inventory.md)
6. **Testing:** [Test Design Strategy](./solutioning/test-design-strategy.md)

---

### Use Case 3: Working with the Database

**Reference:**
1. [Data Models](./brownfield/data-models.md) - Schema documentation
2. [prisma/schema.prisma](../prisma/schema.prisma) - Source of truth
3. [Development Guide](./brownfield/development-guide.md) - Prisma commands

**Key Information:**
- **Tables:** products, orders, admin_users
- **Enums:** PaymentMethod, PaymentStatus, OrderStatus
- **Indexes:** created_at, customer_phone, order_number

---

### Use Case 4: Building or Consuming APIs

**Reference:**
1. [API Contracts](./brownfield/api-contracts.md) - Endpoint documentation
2. [Architecture](./solutioning/architecture.md) - API design patterns
3. [Source Tree](./brownfield/source-tree-analysis.md) - API route locations

**Existing Endpoints:**
- `GET /api/test-db` - Database health
- `POST /api/orders` - Create order
- `POST /api/auth/logout` - Admin logout

---

### Use Case 5: Building UI Components

**Reference:**
1. [Component Inventory](./brownfield/component-inventory.md) - Existing components
2. [UX Design Specification](./planning/ux-design-specification/) - Design system
3. [Component Library](./planning/ux-design-specification/6-component-library.md) - Component patterns

**Component Categories:**
- **UI Primitives:** `src/components/ui/` (shadcn/ui)
- **Landing:** `src/components/landing/`
- **Store:** `src/components/store/`
- **Admin:** `src/components/admin/`
- **Shared:** `src/components/shared/`

---

### Use Case 6: Developer Onboarding

**Onboarding Path:**
1. [README.md](../README.md) - Quick start
2. [Development Guide](./brownfield/development-guide.md) - Full setup
3. [Source Tree Analysis](./brownfield/source-tree-analysis.md) - Codebase navigation
4. [Project Overview](./brownfield/project-overview.md) - Context

---

### Use Case 7: Deployment & Operations

**Reference:**
1. [Development Guide - Deployment](./brownfield/development-guide.md#deployment)
2. [Architecture - Deployment](./solutioning/architecture.md) - Infrastructure
3. Docker files in project root

---

## 🔍 Finding Documentation

### By Topic

| Topic | Primary Document | Secondary References |
|-------|------------------|---------------------|
| **Requirements** | [PRD](./planning/PRD/) | [Product Brief](./discovery/product-brief-proyecto-nixtia-2025-11-15 19-16-57-035/) |
| **Architecture** | [Architecture](./solutioning/architecture.md) | [Source Tree](./brownfield/source-tree-analysis.md) |
| **Database** | [Data Models](./brownfield/data-models.md) | [Prisma Schema](../prisma/schema.prisma) |
| **API** | [API Contracts](./brownfield/api-contracts.md) | [Architecture](./solutioning/architecture.md) |
| **UI/UX** | [UX Design Spec](./planning/ux-design-specification/) | [Component Inventory](./brownfield/component-inventory.md) |
| **Testing** | [Test Design Strategy](./solutioning/test-design-strategy.md) | [Development Guide](./brownfield/development-guide.md) |
| **Development** | [Development Guide](./brownfield/development-guide.md) | [README](../README.md) |

---

## 📊 Project Status Tracking

**Current Status File:** [bmm-workflow-status.yaml](./bmm-workflow-status.yaml)

**Completed Phases:**
- ✅ Phase 0: Discovery (Brainstorming, Product Brief)
- ✅ Phase 1: Planning (PRD, Epics, UX Design)
- ✅ Phase 2: Solutioning (Architecture, Test Strategy, Readiness Check)
- 🔄 Phase 3: Implementation (In Progress)

**Next Required Workflow:** Sprint Planning

---

## 🛠️ Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # Check linting
npm run format           # Format code
npm run type-check       # TypeScript check

# Testing
npm run test             # Unit tests
npm run test:e2e         # E2E tests

# Database
npx prisma studio        # Visual DB editor
npx prisma generate      # Regenerate client
npx prisma migrate dev   # Create migration
```

---

## 📝 Conventions & Standards

### File Naming
- **Components:** PascalCase (`ProductCard.tsx`)
- **Utilities:** camelCase (`formatPrice.ts`)
- **API routes:** lowercase (`route.ts`)

### Import Alias
```typescript
import { Component } from '@/components/ui/component';
import { prisma } from '@/lib/prisma';
```

### Documentation Updates

When making significant changes, update relevant documentation:
- **Schema changes** → Update [Data Models](./brownfield/data-models.md)
- **New API endpoints** → Update [API Contracts](./brownfield/api-contracts.md)
- **New components** → Update [Component Inventory](./brownfield/component-inventory.md)
- **Architecture decisions** → Add ADR to [Architecture](./solutioning/architecture.md)

---

## 🎓 Learning Resources

### External References
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **React:** [react.dev](https://react.dev)
- **Prisma:** [prisma.io/docs](https://www.prisma.io/docs)
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui:** [ui.shadcn.com](https://ui.shadcn.com)

---

## 🤝 Contributing

**Development Methodology:** BMad Method (AI-assisted structured development)

**Workflow:**
1. Review relevant documentation from this index
2. Follow architectural decisions in [Architecture](./solutioning/architecture.md)
3. Maintain design system consistency per [UX Design Spec](./planning/ux-design-specification/)
4. Write tests per [Test Design Strategy](./solutioning/test-design-strategy.md)
5. Update documentation as needed

---

## 📞 Support & Feedback

**Project Owner:** Facundo

**Issues & Questions:**
- GitHub Issues: Repository issue tracker
- Documentation: This index and linked files

---

**Last Updated:** 2025-11-24
**Documentation Version:** 1.0.0
**Scan Mode:** Deep Scan (reading critical files)
