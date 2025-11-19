import { test, expect } from '../support/fixtures'
import { CartPage } from '../support/page-objects/cart-page'

/**
 * Customer Checkout Flow Tests
 *
 * Tests the complete guest checkout experience:
 * - Adding products to cart
 * - Updating cart quantities
 * - Providing phone number (guest checkout)
 * - Selecting payment method
 * - Order confirmation
 */

test.describe('Guest Checkout Flow', () => {
  test('should complete checkout with phone number', async ({ page, productFactory }) => {
    // Setup: Create test products
    const product = await productFactory.create({
      name: 'Artisan Bread',
      price: 12.5,
    })

    // Step 1: Add product to cart
    await page.goto(`/store/products/${product.id}`)
    await page.click('[data-testid="add-to-cart-button"]')

    // Step 2: Navigate to cart
    const cartPage = new CartPage(page)
    await cartPage.goto()

    // Verify cart has the product
    await expect(await cartPage.getItemCount()).toBe(1)
    await expect(cartPage.totalAmount).toContainText('12.50')

    // Step 3: Proceed to checkout
    await cartPage.proceedToCheckout()

    // Step 4: Fill checkout form (phone-number-as-identity pattern)
    await page.fill('[data-testid="phone-input"]', '+5491123456789')

    // Step 5: Select payment method
    await page.click('[data-testid="payment-method-cash"]')

    // Step 6: Submit order
    await page.click('[data-testid="submit-order-button"]')

    // Step 7: Verify order confirmation
    await page.waitForURL(/\/store\/checkout\/success/)
    await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible()
    await expect(page.locator('[data-testid="order-number"]')).toBeVisible()

    // Verify order number format (NX-YYYY-XXXXXX)
    const orderNumber = await page.locator('[data-testid="order-number"]').textContent()
    expect(orderNumber).toMatch(/NX-\d{4}-\d{6}/)
  })

  test('should update cart quantities before checkout', async ({ page, productFactory }) => {
    const product = await productFactory.create({ price: 10.0 })

    // Add product to cart
    await page.goto(`/store/products/${product.id}`)
    await page.click('[data-testid="add-to-cart-button"]')

    // Go to cart
    const cartPage = new CartPage(page)
    await cartPage.goto()

    // Update quantity to 3
    await cartPage.updateQuantity(product.id, 3)

    // Verify total is updated
    await expect(cartPage.totalAmount).toContainText('30.00', { timeout: 5000 })
  })

  test('should remove items from cart', async ({ page, productFactory }) => {
    const products = await productFactory.createMany(2)

    // Add both products to cart
    for (const product of products) {
      await page.goto(`/store/products/${product.id}`)
      await page.click('[data-testid="add-to-cart-button"]')
    }

    // Go to cart
    const cartPage = new CartPage(page)
    await cartPage.goto()

    // Verify 2 items in cart
    await expect(await cartPage.getItemCount()).toBe(2)

    // Remove first product
    await cartPage.removeItem(products[0].id)

    // Verify only 1 item remains
    await expect(await cartPage.getItemCount()).toBe(1)
  })

  test('should validate phone number format', async ({ page, productFactory }) => {
    const product = await productFactory.create()

    // Add to cart and proceed to checkout
    await page.goto(`/store/products/${product.id}`)
    await page.click('[data-testid="add-to-cart-button"]')
    await page.goto('/store/checkout')

    // Try invalid phone number
    await page.fill('[data-testid="phone-input"]', '123') // Invalid format
    await page.click('[data-testid="payment-method-cash"]')
    await page.click('[data-testid="submit-order-button"]')

    // Verify error message
    await expect(page.locator('[data-testid="phone-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="phone-error"]')).toContainText(/invalid/i)
  })
})

test.describe('Payment Method Selection', () => {
  test('should display all payment methods', async ({ page, productFactory }) => {
    const product = await productFactory.create()

    await page.goto(`/store/products/${product.id}`)
    await page.click('[data-testid="add-to-cart-button"]')
    await page.goto('/store/checkout')

    // Verify all payment methods are available
    await expect(page.locator('[data-testid="payment-method-cash"]')).toBeVisible()
    await expect(page.locator('[data-testid="payment-method-bank"]')).toBeVisible()
    await expect(page.locator('[data-testid="payment-method-card"]')).toBeVisible()
  })

  test('should select bank transfer and see payment instructions', async ({
    page,
    productFactory,
  }) => {
    const product = await productFactory.create()

    await page.goto(`/store/products/${product.id}`)
    await page.click('[data-testid="add-to-cart-button"]')
    await page.goto('/store/checkout')

    await page.fill('[data-testid="phone-input"]', '+5491123456789')

    // Select bank transfer
    await page.click('[data-testid="payment-method-bank"]')

    // Verify bank transfer instructions appear
    await expect(page.locator('[data-testid="bank-instructions"]')).toBeVisible()
  })
})
