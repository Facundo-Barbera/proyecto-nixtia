# Functional Requirements Inventory

## User Account & Access (FR1-FR10)

- FR1: Customers can browse product catalog without creating an account
- FR2: Customers can add products to cart as guest users
- FR3: Customers can complete checkout by providing only phone number
- FR4: Customers can view order confirmation immediately after purchase
- FR5: System stores order reference for future phone-based lookup (post-MVP)
- FR6: Business owner can create admin account with email and password
- FR7: Business owner can log in securely with email/password authentication
- FR8: Business owner can access password reset via email (post-demo)
- FR9: Admin sessions persist across browser sessions (remember me)
- FR10: Admin can log out and clear session data

## Product Catalog Management (FR11-FR20)

- FR11: Customers can view all available products in grid layout
- FR12: Customers can see product image, name, price, and description preview
- FR13: Customers can click product to view detailed information page
- FR14: Customers can see product availability status
- FR15: Product images load efficiently with progressive enhancement
- FR16: Admin can add new products with image, name, description, price (post-demo)
- FR17: Admin can edit existing product information (post-demo)
- FR18: Admin can delete products with confirmation (post-demo)
- FR19: Admin can toggle product active/inactive status (post-demo)
- FR20: Admin can upload and manage product images (post-demo)

## Shopping Cart & Checkout (FR21-FR34)

- FR21: Customers can add products to cart from catalog or detail pages
- FR22: Customers can adjust product quantities in cart
- FR23: Customers can remove products from cart
- FR24: Customers can see real-time cart total and item count
- FR25: Cart persists during browsing session
- FR26: Cart displays clear pricing breakdown (subtotal, taxes if applicable)
- FR27: Customers can proceed to checkout from cart
- FR28: Customers can enter phone number with country code selection
- FR29: Customers can select payment method (bank transfer, cash/card on delivery, Stripe)
- FR30: System displays payment instructions based on selected method
- FR31: Customers can review order summary before confirming
- FR32: Customers receive order confirmation with reference number
- FR33: System validates phone number format
- FR34: System prevents duplicate order submission

## Payment Processing (FR35-FR43)

- FR35: Customers can choose bank transfer and view account details
- FR36: Customers can choose cash/card on delivery option
- FR37: Customers can choose Stripe card payment (post-demo: live processing)
- FR38: System displays clear instructions for each payment method
- FR39: System records payment method selection with order
- FR40: System creates order record with customer details, items, total, payment method
- FR41: System generates unique order reference number
- FR42: System stores order timestamp and status
- FR43: Admin can view all orders in chronological list (post-demo: filtering)

## Business Analytics & Dashboard (FR44-FR54)

- FR44: Admin can view revenue chart showing trends over time
- FR45: Admin can filter revenue by date range (daily, weekly, monthly)
- FR46: Admin can see total revenue for selected period
- FR47: Revenue chart displays visual trend line or bars
- FR48: Admin can view table of recent transactions
- FR49: Transaction table shows date, customer phone, order total, payment method
- FR50: Admin can sort transactions by date or amount (post-demo)
- FR51: Admin can search transactions by customer phone (post-demo)
- FR52: Admin can view payment method breakdown (chart visualization)
- FR53: Payment breakdown shows percentage and count for each method
- FR54: Admin can compare payment methods across date ranges (post-demo)

## Landing Page (FR55-FR59) - Optional MVP

- FR55: Visitors can view hero section with Nixtia value proposition
- FR56: Visitors can read educational content about nixtamalized corn
- FR57: Visitors can see product showcase with sample items
- FR58: Visitors can access social media links
- FR59: Visitors can navigate to virtual store via clear CTA

---
