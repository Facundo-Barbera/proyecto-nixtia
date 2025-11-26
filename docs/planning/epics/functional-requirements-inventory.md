# Functional Requirements Inventory

## User Account & Access (FR1-10)
| FR | Description | Scope | Status |
|----|-------------|-------|--------|
| FR1 | Customers can browse product catalog without creating an account | MVP | IMPLEMENTED (needs Prisma->Supabase) |
| FR2 | Customers can add products to cart as guest users | MVP | IMPLEMENTED |
| FR3 | Customers can complete checkout by providing only phone number | MVP | IMPLEMENTED |
| FR4 | Customers can view order confirmation immediately after purchase | MVP | IMPLEMENTED |
| FR5 | System stores order reference for future phone-based lookup | Post-MVP | DEFERRED |
| FR6 | Business owner can create admin account with email and password | MVP | IMPLEMENTED |
| FR7 | Business owner can log in securely with email/password authentication | MVP | IMPLEMENTED |
| FR8 | Business owner can access password reset via email | Post-Demo | DEFERRED |
| FR9 | Admin sessions persist across browser sessions (remember me) | MVP | IMPLEMENTED |
| FR10 | Admin can log out and clear session data | MVP | IMPLEMENTED |

## Product Catalog Management (FR11-20)
| FR | Description | Scope | Status |
|----|-------------|-------|--------|
| FR11 | Customers can view all available products in grid layout | MVP | IMPLEMENTED (needs Prisma->Supabase) |
| FR12 | Customers can see product image, name, price, and description preview | MVP | IMPLEMENTED |
| FR13 | Customers can click product to view detailed information page | MVP | **NOT IMPLEMENTED** |
| FR14 | Customers can see product availability status | MVP | PARTIAL (needs verification) |
| FR15 | Product images load efficiently with progressive enhancement | MVP | PARTIAL |
| FR16-20 | Admin product CRUD | Post-Demo | DEFERRED |

## Shopping Cart & Checkout (FR21-34)
| FR | Description | Scope | Status |
|----|-------------|-------|--------|
| FR21 | Customers can add products to cart from catalog or detail pages | MVP | IMPLEMENTED |
| FR22 | Customers can adjust product quantities in cart | MVP | IMPLEMENTED |
| FR23 | Customers can remove products from cart | MVP | IMPLEMENTED |
| FR24 | Customers can see real-time cart total and item count | MVP | IMPLEMENTED |
| FR25 | Cart persists during browsing session | MVP | IMPLEMENTED |
| FR26 | Cart displays clear pricing breakdown | MVP | IMPLEMENTED |
| FR27 | Customers can proceed to checkout from cart | MVP | IMPLEMENTED |
| FR28 | Customers can enter phone number with country code selection | MVP | IMPLEMENTED |
| FR29 | Customers can select payment method | MVP | IMPLEMENTED |
| FR30 | System displays payment instructions based on selected method | MVP | IMPLEMENTED |
| FR31 | Customers can review order summary before confirming | MVP | IMPLEMENTED |
| FR32 | Customers receive order confirmation with reference number | MVP | IMPLEMENTED |
| FR33 | System validates phone number format | MVP | IMPLEMENTED |
| FR34 | System prevents duplicate order submission | MVP | NEEDS VERIFICATION |

## Payment Processing (FR35-43)
| FR | Description | Scope | Status |
|----|-------------|-------|--------|
| FR35 | Customers can choose bank transfer and view account details | MVP | IMPLEMENTED |
| FR36 | Customers can choose cash/card on delivery option | MVP | IMPLEMENTED |
| FR37 | Customers can choose Stripe card payment | MVP (UI) | UI IMPLEMENTED |
| FR38 | System displays clear instructions for each payment method | MVP | IMPLEMENTED |
| FR39 | System records payment method selection with order | MVP | IMPLEMENTED |
| FR40 | System creates order record | MVP | IMPLEMENTED (verify Supabase) |
| FR41 | System generates unique order reference number | MVP | IMPLEMENTED |
| FR42 | System stores order timestamp and status | MVP | IMPLEMENTED |
| FR43 | Admin can view all orders in chronological list | MVP (basic) | IMPLEMENTED (needs Prisma->Supabase) |

## Business Analytics & Dashboard (FR44-54)
| FR | Description | Scope | Status |
|----|-------------|-------|--------|
| FR44 | Admin can view revenue chart showing trends over time | MVP | **NOT IMPLEMENTED** |
| FR45 | Admin can filter revenue by date range | MVP | **NOT IMPLEMENTED** |
| FR46 | Admin can see total revenue for selected period | MVP | **NOT IMPLEMENTED** |
| FR47 | Revenue chart displays visual trend line or bars | MVP | **NOT IMPLEMENTED** |
| FR48 | Admin can view table of recent transactions | MVP | IMPLEMENTED (needs Prisma->Supabase) |
| FR49 | Transaction table shows date, customer phone, order total, payment method | MVP | IMPLEMENTED |
| FR50-51 | Transaction sorting and search | Post-Demo | DEFERRED |
| FR52 | Admin can view payment method breakdown (chart visualization) | MVP | **NOT IMPLEMENTED** |
| FR53 | Payment breakdown shows percentage and count for each method | MVP | **NOT IMPLEMENTED** |
| FR54 | Admin can compare payment methods across date ranges | Post-Demo | DEFERRED |

## Landing Page (FR55-59)
| FR | Description | Scope | Status |
|----|-------------|-------|--------|
| FR55 | Visitors can view hero section with Nixtia value proposition | MVP (if time) | IMPLEMENTED |
| FR56 | Visitors can read educational content about nixtamalized corn | MVP (if time) | IMPLEMENTED |
| FR57 | Visitors can see product showcase with sample items | MVP (if time) | IMPLEMENTED |
| FR58 | Visitors can access social media links | MVP (if time) | PARTIAL |
| FR59 | Visitors can navigate to virtual store via clear CTA | MVP (if time) | IMPLEMENTED |

**MVP Status:** 44 FRs required | 32 IMPLEMENTED | 6 NOT IMPLEMENTED | 6 PARTIAL/VERIFY

---
