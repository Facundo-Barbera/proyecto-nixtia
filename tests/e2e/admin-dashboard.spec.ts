import { test, expect } from '../support/fixtures'
import { loginAsAdmin } from '../support/helpers/auth-helper'

/**
 * Admin Dashboard Tests
 *
 * Tests admin authentication and dashboard functionality:
 * - Admin login flow
 * - Dashboard analytics display
 * - Revenue charts
 * - Order management
 */

test.describe('Admin Authentication', () => {
  test('should login as admin successfully', async ({ page }) => {
    await loginAsAdmin(page)

    // Verify we're on the dashboard
    await expect(page).toHaveURL(/\/admin\/dashboard/)

    // Verify admin header is visible
    await expect(page.locator('[data-testid="admin-header"]')).toBeVisible()
  })

  test('should reject invalid credentials', async ({ page }) => {
    await page.goto('/admin/login')

    await page.fill('[data-testid="email-input"]', 'invalid@test.com')
    await page.fill('[data-testid="password-input"]', 'wrongpassword')
    await page.click('[data-testid="login-button"]')

    // Verify error message
    await expect(page.locator('[data-testid="login-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="login-error"]')).toContainText(/invalid/i)
  })

  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/admin/dashboard')

    // Should redirect to login page
    await expect(page).toHaveURL(/\/admin\/login/)
  })
})

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
  })

  test('should display revenue chart', async ({ page }) => {
    await page.goto('/admin/dashboard')

    // Verify revenue chart is visible
    await expect(page.locator('[data-testid="revenue-chart"]')).toBeVisible()
  })

  test('should display recent orders table', async ({ page, orderFactory, productFactory }) => {
    // Create test data
    const product = await productFactory.create({ price: 50.0 })
    await orderFactory.create({
      items: [
        {
          product_id: product.id,
          quantity: 2,
          unit_price: product.price,
        },
      ],
    })

    await page.goto('/admin/dashboard')

    // Verify orders table is visible
    await expect(page.locator('[data-testid="orders-table"]')).toBeVisible()

    // Verify at least one order row
    const orderRows = page.locator('[data-testid^="order-row-"]')
    await expect(orderRows.first()).toBeVisible({ timeout: 5000 })
  })

  test('should display payment method breakdown', async ({ page }) => {
    await page.goto('/admin/dashboard')

    // Verify payment breakdown section
    await expect(page.locator('[data-testid="payment-breakdown"]')).toBeVisible()

    // Verify payment method labels
    await expect(page.locator('[data-testid="payment-cash-amount"]')).toBeVisible()
    await expect(page.locator('[data-testid="payment-bank-amount"]')).toBeVisible()
    await expect(page.locator('[data-testid="payment-card-amount"]')).toBeVisible()
  })
})

test.describe('Product Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page)
  })

  test('should navigate to product management', async ({ page }) => {
    await page.goto('/admin/dashboard')

    await page.click('[data-testid="nav-products"]')

    await expect(page).toHaveURL(/\/admin\/products/)
    await expect(page.locator('[data-testid="products-list"]')).toBeVisible()
  })

  test('should create new product', async ({ page }) => {
    await page.goto('/admin/products')

    await page.click('[data-testid="new-product-button"]')

    // Fill product form
    await page.fill('[data-testid="product-name-input"]', 'Test Product')
    await page.fill('[data-testid="product-description-input"]', 'Test description')
    await page.fill('[data-testid="product-price-input"]', '29.99')

    await page.click('[data-testid="save-product-button"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/created/i)
  })

  test('should edit existing product', async ({ page, productFactory }) => {
    const product = await productFactory.create({ name: 'Original Name' })

    await page.goto(`/admin/products/${product.id}/edit`)

    // Update product name
    await page.fill('[data-testid="product-name-input"]', 'Updated Name')
    await page.click('[data-testid="save-product-button"]')

    // Verify success
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/updated/i)
  })

  test('should delete product', async ({ page, productFactory }) => {
    const product = await productFactory.create()

    await page.goto('/admin/products')

    // Find and delete the product
    await page.click(`[data-testid="delete-product-${product.id}"]`)

    // Confirm deletion in dialog
    await page.click('[data-testid="confirm-delete-button"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/deleted/i)
  })
})
