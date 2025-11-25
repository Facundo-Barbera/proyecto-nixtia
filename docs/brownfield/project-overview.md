# Project Overview - Nixtia

**Generated:** 2025-11-24
**Project:** proyecto-nixtia

## Executive Summary

**Nixtia** is a modern, mobile-first e-commerce web application for selling artisan corn products. The platform features a marketing landing page, customer-facing store with guest checkout, and an admin dashboard for business intelligence and order management.

Built with Next.js 16, React 19, and Supabase, Nixtia demonstrates a full-stack greenfield implementation following the BMad Method workflow for structured software development.

---

## Quick Reference

### Project Metadata

| Attribute | Value |
|-----------|-------|
| **Name** | Nixtia |
| **Type** | Web Application (Full-Stack Monolith) |
| **Status** | In Development (Phase 3: Implementation) |
| **Repository Structure** | Monolith (single codebase) |
| **Primary Language** | TypeScript |
| **Framework** | Next.js 16 (App Router) |
| **Database** | PostgreSQL (Supabase-hosted) |
| **Deployment Target** | Vercel / Docker |

---

## Technology Stack

### Frontend

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 16.0.3 | App Router, SSR, React framework |
| **UI Library** | React | 19.2.0 | Component-based UI |
| **Language** | TypeScript | 5.x | Type-safe development |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework |
| **Components** | shadcn/ui | Latest | Radix UI primitives + variants |
| **Icons** | Lucide React | ^0.554.0 | Icon library |
| **Forms** | React Hook Form | ^7.66.1 | Form state management |
| **Validation** | Zod | ^4.1.13 | Schema validation |
| **Notifications** | React Hot Toast | ^2.6.0 | Toast messages |

### Backend

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Runtime** | Node.js | 20.x LTS | Server runtime |
| **API** | Next.js API Routes | 16.0.3 | RESTful endpoints |
| **Database** | PostgreSQL | 15.x | Relational database |
| **ORM** | Prisma | ^6.19.0 | Database client & migrations |
| **Auth** | Supabase Auth | ^2.84.0 | Authentication & sessions |
| **Storage** | Supabase Storage | ^2.84.0 | File uploads (planned) |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Linting (Next.js config) |
| **Prettier** | Code formatting |
| **Vitest** | Unit testing |
| **Playwright** | E2E testing |
| **Docker** | Containerization |
| **Git** | Version control |

---

## Architecture Classification

### Architecture Pattern

**Type:** Layered Monolith with Server-Side Rendering (SSR)

**Layers:**
1. **Presentation Layer:** React components (Server & Client Components)
2. **Application Layer:** Next.js App Router (pages, layouts, route handlers)
3. **Business Logic Layer:** API routes, server actions
4. **Data Access Layer:** Prisma ORM
5. **Database Layer:** PostgreSQL (Supabase)

**Key Architectural Decisions (ADRs):**
- **ADR-001:** Next.js App Router (not Pages Router) for Server Components
- **ADR-003:** shadcn/ui for full component control and accessibility
- **ADR-005:** Prisma ORM for type-safe database access
- **ADR-007:** Supabase for managed PostgreSQL + Auth

---

## Repository Structure

**Repository Type:** Monolith

Nixtia is organized as a single cohesive codebase with feature-based directory structure within the Next.js App Router convention.

### Key Directories

```
proyecto-nixtia/
├── src/app/              # Routes, pages, API endpoints
│   ├── landing/          # Marketing section
│   ├── store/            # E-commerce section
│   ├── admin/            # Business intelligence section
│   └── api/              # API endpoints
├── src/components/       # React components (ui, landing, store, admin, shared)
├── src/lib/              # Utilities (prisma, supabase, validations)
├── prisma/               # Database schema & migrations
├── docs/                 # BMM workflow documentation (PRD, architecture, etc.)
└── tests/                # Unit & E2E tests
```

---

## Features Overview

### 1. Landing Page (`/landing`)

**Purpose:** Marketing and brand awareness

**Components:**
- Hero section with CTA
- Value proposition
- Featured products showcase
- Educational content (nixtamalization process)
- Footer with navigation

**Target Audience:** New visitors, potential customers

---

### 2. Store (`/store`)

**Purpose:** Product catalog and guest checkout

**Features:**
- Product catalog grid (mobile-first)
- Shopping cart widget (persistent state)
- Guest checkout (phone number only)
- Payment method selection (bank transfer, cash/card on delivery, Stripe)
- Order confirmation page

**User Flow:**
1. Browse products → Add to cart
2. View cart → Proceed to checkout
3. Enter phone number → Select payment method
4. Place order → Receive order number
5. View payment instructions

---

### 3. Admin Dashboard (`/admin`)

**Purpose:** Business intelligence and order management

**Features:**
- Email/password authentication (Supabase Auth)
- Transactions table (order history)
- Order status management
- Payment status tracking

**Access:** Admin users only (RLS policies)

---

## Data Model Summary

### Core Entities

**1. Products**
- Product catalog (name, description, price, image)
- Soft-delete with `active` flag

**2. Orders**
- Order tracking (order_number, customer_phone, items_json)
- Payment method & status
- Order fulfillment status

**3. Admin Users**
- Admin accounts for dashboard access

### Enums

- **PaymentMethod:** BANK_TRANSFER, CASH_ON_DELIVERY, CARD_ON_DELIVERY, STRIPE
- **PaymentStatus:** PENDING, CONFIRMED, FAILED
- **OrderStatus:** PENDING, CONFIRMED, PREPARING, READY, DELIVERED, CANCELLED

---

## API Endpoints

### Public APIs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/test-db` | Database health check |
| POST | `/api/orders` | Create new order (guest checkout) |

### Admin APIs

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/auth/logout` | Admin logout | Required |

**Future APIs (Planned):**
- GET `/api/products` - List products
- GET `/api/admin/orders` - List all orders
- PUT `/api/admin/orders/:id` - Update order status

---

## Development Workflow (BMad Method)

Nixtia follows the **BMad Method** workflow with comprehensive documentation artifacts:

### Phase 0: Discovery
- ✅ Brainstorming session
- ✅ Product brief

### Phase 1: Planning
- ✅ Product Requirements Document (PRD)
- ✅ Epic breakdown
- ✅ UX design specification

### Phase 2: Solutioning
- ✅ Architecture document
- ✅ Test design strategy
- ✅ Implementation readiness report

### Phase 3: Implementation
- 🔄 Sprint planning (in progress)
- User stories in development

**Documentation Location:** `docs/` directory (77+ files)

---

## Testing Strategy

### Test Coverage

| Test Type | Framework | Location | Coverage |
|-----------|-----------|----------|----------|
| **Unit Tests** | Vitest | `tests/unit/` | Component logic, utilities |
| **E2E Tests** | Playwright | `tests/e2e/` | Critical user flows |

**Existing E2E Tests:**
- Admin authentication flow
- Transactions table functionality

**Test Commands:**
```bash
npm run test          # Unit tests (watch mode)
npm run test:e2e      # E2E tests
```

---

## Deployment

### Production Environment

**Recommended Platform:** Vercel

**Deployment Configuration:**
- **Build Command:** `npm run build`
- **Output:** Standalone (Docker-ready)
- **Environment Variables:** Supabase URL, API keys, DATABASE_URL

**Docker Support:**
- `Dockerfile` for production container
- `docker-compose.yml` for local multi-container setup

---

## Getting Started

### Prerequisites

- Node.js 20.x
- npm 10.x+
- PostgreSQL 15.x (or Supabase account)

### Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/nixtia.git
cd nixtia

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npx prisma migrate deploy
npx prisma generate

# Start development server
npm run dev
```

**Development URLs:**
- Landing: http://localhost:3000/landing
- Store: http://localhost:3000/store
- Admin: http://localhost:3000/admin

---

## Documentation Index

### Brownfield Documentation (This Scan)

| Document | Description |
|----------|-------------|
| [project-overview.md](./project-overview.md) | This file - high-level summary |
| [data-models.md](./data-models.md) | Database schema documentation |
| [api-contracts.md](./api-contracts.md) | API endpoint specifications |
| [component-inventory.md](./component-inventory.md) | Component catalog |
| [source-tree-analysis.md](./source-tree-analysis.md) | Directory structure |
| [development-guide.md](./development-guide.md) | Setup and development workflow |

### BMM Workflow Documentation

| Document | Description | Location |
|----------|-------------|----------|
| **PRD** | Product Requirements Document | [docs/planning/PRD/](../planning/PRD/) |
| **Architecture** | System architecture + ADRs | [docs/solutioning/architecture.md](../solutioning/architecture.md) |
| **UX Design** | Design system specification | [docs/planning/ux-design-specification/](../planning/ux-design-specification/) |
| **Epics** | Epic breakdown | [docs/planning/epics/](../planning/epics/) |
| **Test Strategy** | Test design strategy | [docs/solutioning/test-design-strategy.md](../solutioning/test-design-strategy.md) |

---

## Project Status

**Current Phase:** Implementation (Phase 3)

**Completed:**
- ✅ Project setup & core dependencies
- ✅ Database integration (Prisma + Supabase)
- ✅ Basic UI components (shadcn/ui)
- ✅ Landing page structure
- ✅ Store product catalog
- ✅ Shopping cart functionality
- ✅ Guest checkout flow
- ✅ Order confirmation
- ✅ Admin authentication
- ✅ Transactions table

**In Progress:**
- 🔄 Product management (admin CRUD)
- 🔄 Order status updates (admin)
- 🔄 Stripe payment integration

**Planned:**
- Inventory management
- Customer accounts
- Order tracking for customers
- Email notifications
- Analytics dashboard

---

## Team & Contacts

**Project Owner:** Facundo

**Development Methodology:** BMad Method (AI-assisted structured development)

**Support:**
- GitHub Issues: [Repository Issues](https://github.com/your-org/nixtia/issues)
- Documentation: `docs/` directory

---

## License

[Your License Here]

---

## References

- [Architecture Document](../solutioning/architecture.md)
- [PRD](../planning/PRD/index.md)
- [UX Design Specification](../planning/ux-design-specification/index.md)
- [API Contracts](./api-contracts.md)
- [Data Models](./data-models.md)
- [Development Guide](./development-guide.md)
