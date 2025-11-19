# Epic 4: Product Management & Landing Page

**Goal:** Enable admin to manage products independently + provide optional marketing landing page

**User Value:** Client can add/edit products without developer help + visitors see brand story

**FRs Covered:** FR16-FR20, FR55-FR59

**Stories:** 5 stories (Post-Demo Priority)

---

## Story 4.1: Admin Product List View

As a **business owner**,
I want to see all my products in a table,
So that I can quickly review what's available and make changes.

**Acceptance Criteria:**

**Given** I am logged in and navigate to /admin/products
**When** the products page loads
**Then** I see:

- Table with columns: Image (thumbnail), Name, Price, Status (Active/Inactive toggle), Actions (Edit/Delete icons)
- "Add New Product" button (primary purple-600, top-right)
- Products sorted by created_at DESC (newest first)
- Active/Inactive toggle switch in Status column (instant update on click)
- Edit icon (pencil) opens edit modal
- Delete icon (trash) shows confirmation modal

**And** table is responsive (card view on mobile, full table on desktop)

**And** empty state shows: "No products yet. Add your first product!" with CTA button

**And** page loads in < 2 seconds

**Prerequisites:** Story 3.3 (admin layout), Story 1.2 (products table)

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-product-management.spec.ts`

- **Test:** Product list page displays correctly
  - Login and navigate to `/admin/products`
  - Verify table with columns: Image, Name, Price, Status, Actions
  - Verify "Add New Product" button visible
  - Verify products sorted by created_at DESC
- **Test:** Active/Inactive toggle
  - Toggle product status from Active to Inactive
  - Verify status updates instantly
  - Verify database updated
  - Verify customer store doesn't show inactive products
- **Test:** Edit and Delete icons
  - Verify Edit icon (pencil) present for each product
  - Verify Delete icon (trash) present for each product
- **Test:** Responsive layout
  - Mobile: verify card view
  - Desktop: verify full table
- **Test:** Empty state
  - Clear all products
  - Verify message: "No products yet. Add your first product!"
  - Verify CTA button visible

**Technical Notes:**

- Route: /admin/products
- Table component: shadcn/ui Table or custom table with styling
- Toggle: shadcn/ui Switch component, updates product.active in database
- Icons: Lucide React (Pencil, Trash2)
- Image thumbnail: 60x60px, object-fit cover, rounded corners
- Responsive: Similar to TransactionsTable (cards on mobile)

---

## Story 4.2: Add New Product (Modal with Image Upload)

As a **business owner**,
I want to add new products with images,
So that customers see what I'm offering.

**Acceptance Criteria:**

**Given** I am on the products page
**When** I click "Add New Product"
**Then** a modal opens showing a form with:

- Image upload area (drag-drop or click to browse, preview uploaded image)
- Name field (required, max 100 chars)
- Description field (required, textarea, max 500 chars)
- Price field (required, number input, min 0.01)
- Active toggle (default: ON)
- "Save" button (primary purple-600) / "Cancel" button (secondary)

**And** uploading an image shows preview immediately

**And** clicking "Save" validates all required fields

**And** successful save shows success toast: "Product added successfully!"

**And** product appears in table immediately (optimistic UI update)

**And** image is uploaded to Supabase Storage, URL saved to products.image_url

**And** modal closes after successful save

**Prerequisites:** Story 4.1

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-add-product.spec.ts`

- **Test:** Add product modal opens
  - Click "Add New Product" button
  - Verify modal opens with form fields
- **Test:** Form fields display correctly
  - Verify image upload area (drag-drop or click)
  - Verify Name, Description, Price, Active toggle fields
  - Verify "Save" and "Cancel" buttons
- **Test:** Image upload functionality
  - Upload image file
  - Verify preview displays immediately
  - Verify image size validation (< 5MB)
  - Verify image type validation (jpg, png, webp)
- **Test:** Form validation
  - Submit empty form → verify required field errors
  - Submit with invalid price (< 0.01) → verify error
  - Submit with price = 0 → verify error
  - Submit with name > 100 chars → verify error
  - Submit with description > 500 chars → verify error
- **Test:** Successful product creation
  - Fill all fields correctly
  - Upload valid image
  - Click "Save"
  - Verify success toast: "Product added successfully!"
  - Verify product appears in table immediately (optimistic UI)
  - Verify image uploaded to Supabase Storage
  - Verify modal closes
- **Test:** Cancel button
  - Fill form
  - Click "Cancel" → verify modal closes without saving

**Technical Notes:**

- Modal: shadcn/ui Dialog component
- Image upload: Supabase Storage bucket (public read access)
- Drag-drop: react-dropzone or similar
- Preview: Display selected file using FileReader or URL.createObjectURL
- Validation: Required fields, price > 0, image size < 5MB, image type (jpg, png, webp)
- Optimistic UI: Add product to local state immediately, revert if save fails

---

## Story 4.3: Edit Product (Modal with Existing Data)

As a **business owner**,
I want to edit product details,
So that I can keep information accurate and update pricing.

**Acceptance Criteria:**

**Given** I am on the products page
**When** I click the Edit icon for a product
**Then** a modal opens pre-filled with:

- Current product image (preview with option to replace)
- Current name, description, price, active status

**And** I can modify any field

**And** clicking "Save" updates the product in database

**And** successful save shows toast: "Product updated successfully!"

**And** table row updates immediately with new data

**And** clicking "Cancel" closes modal without saving changes (confirm if dirty: "Discard changes?")

**Prerequisites:** Story 4.2

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-edit-product.spec.ts`

- **Test:** Edit modal opens with existing data
  - Click Edit icon for a product
  - Verify modal opens
  - Verify fields pre-filled with current product data
  - Verify current image displayed with "Replace Image" option
- **Test:** Edit product fields
  - Modify name, description, price
  - Replace image
  - Toggle active status
  - Click "Save"
  - Verify success toast: "Product updated successfully!"
  - Verify table updates immediately with new data
  - Verify database updated
- **Test:** Cancel with dirty form
  - Modify fields
  - Click "Cancel"
  - Verify confirmation: "Discard changes?"
  - Click "Discard" → verify modal closes without saving
- **Test:** Cancel without changes
  - Open edit modal
  - Don't modify anything
  - Click "Cancel" → verify modal closes immediately (no confirmation)

**Technical Notes:**

- Reuse Add Product modal component, pass product data as prop
- Load existing image from URL, show "Replace Image" option
- Update: PATCH /api/products/[id] with changes
- Dirty check: Track form state, show confirmation only if modified

---

## Story 4.4: Delete Product (Confirmation Modal)

As a **business owner**,
I want to safely delete products,
So that I can remove discontinued items without accidental deletion.

**Acceptance Criteria:**

**Given** I am on the products page
**When** I click the Delete icon for a product
**Then** a confirmation modal appears showing:

- "Delete [Product Name]?" heading
- "This cannot be undone." warning text
- "Cancel" button (secondary) / "Delete" button (destructive red-500 solid)

**And** clicking "Delete" removes the product from database

**And** successful delete shows toast: "Product deleted successfully!"

**And** product is removed from table immediately

**And** clicking "Cancel" or clicking outside modal closes without deleting

**Prerequisites:** Story 4.3

**E2E Testing Requirements:**

**Test File:** `tests/e2e/admin-delete-product.spec.ts`

- **Test:** Delete confirmation modal
  - Click Delete icon for a product
  - Verify confirmation modal appears
  - Verify heading: "Delete [Product Name]?"
  - Verify warning: "This cannot be undone."
  - Verify "Cancel" and "Delete" buttons
- **Test:** Successful deletion
  - Click "Delete" button (red destructive style)
  - Verify success toast: "Product deleted successfully!"
  - Verify product removed from table immediately
  - Verify product deleted from database (or active=false if soft delete)
- **Test:** Cancel deletion
  - Click "Cancel" → verify modal closes without deleting
  - Click outside modal → verify modal closes without deleting
- **Test:** Delete product referenced in orders
  - Create product and order referencing it
  - Try to delete product
  - Verify warning about order history impact (if applicable)

**Technical Notes:**

- Confirmation modal: shadcn/ui AlertDialog component
- DELETE /api/products/[id] removes record from database
- Soft delete option: Set active=false instead of hard delete (preserves order history)
- Cascading: Check if product is referenced in orders, warn if deleting will affect order history

---

## Story 4.5: Marketing Landing Page (Optional MVP)

As a **visitor**,
I want to learn about Nixtia and what makes nixtamalized corn special,
So that I understand the value before shopping.

**Acceptance Criteria:**

**Given** I visit the root homepage (/)
**When** the landing page loads
**Then** I see five sections:

1. **Hero:** Large heading with value proposition, subheading, "Shop Now" CTA button
2. **Education:** "What is Nixtamalization?" with brief description, benefits of traditional process
3. **Product Showcase:** 3-4 featured products with images, "View All Products" link
4. **About:** Brand story, commitment to authenticity, artisan craftsmanship
5. **Footer:** Social media links (Instagram, Facebook icons), contact info

**And** "Shop Now" CTA navigates to /store (product catalog)

**And** page uses purple brand palette, TAN Headline font for headings

**And** page is mobile-first responsive (single column on mobile, multi-column on desktop)

**And** page loads in < 2 seconds with optimized images

**And** SEO: Proper meta tags, Open Graph tags, semantic HTML (per PRD Web App Requirements)

**Prerequisites:** Story 2.1 (product catalog)

**E2E Testing Requirements:**

**Test File:** `tests/e2e/landing-page.spec.ts`

- **Test:** Landing page sections display
  - Navigate to root `/`
  - Verify 5 sections visible:
    1. Hero (value proposition + CTA)
    2. Education ("What is Nixtamalization?")
    3. Product Showcase (3-4 featured products)
    4. About (brand story)
    5. Footer (social links, contact)
- **Test:** "Shop Now" CTA
  - Click "Shop Now" button
  - Verify navigation to `/store` (product catalog)
- **Test:** Featured products
  - Verify 3-4 products displayed
  - Click "View All Products" link → verify navigation to `/store`
- **Test:** Responsive layout
  - Mobile: verify single column layout
  - Desktop: verify multi-column sections
- **Test:** Page load performance
  - Verify page loads in < 2s
  - Verify images optimized with Next.js Image component
- **Test:** SEO elements
  - Verify proper meta tags present
  - Verify Open Graph tags for social sharing
  - Verify semantic HTML (headings hierarchy)
- **Test:** Accessibility
  - Verify WCAG AA compliance
  - Verify alt text on all images
  - Verify proper heading structure (H1 → H2 → H3)
- **Test:** Social links
  - Verify Instagram/Facebook links in footer
  - Verify links open in new tab with rel="noopener noreferrer"

**Technical Notes:**

- Route: / (root page, separate from /store catalog)
- SSG: Next.js static generation for SEO performance
- Images: Next.js Image component with blur placeholders
- Sections: Scroll-in-view animations (Intersection Observer, subtle fade-in)
- Social links: External links with rel="noopener noreferrer" for security
- SEO: next-seo package for meta tags, sitemap generation
- Accessibility: WCAG AA compliant, alt text on all images, semantic headings
- Content: Collaborate with client for authentic brand story copy

---
