import { test, expect } from '../support/fixtures'

/**
 * Example Test Suite for Nixtia E-commerce Platform
 *
 * Demonstrates:
 * - Basic page navigation and assertions
 * - Custom fixtures usage (productFactory, orderFactory)
 * - Page object pattern
 * - Data-testid selector strategy
 */

test.describe('Homepage', () => {
  test('should load store homepage', async ({ page }) => {
    await page.goto('/store')

    // Verify page title
    await expect(page).toHaveTitle(/Nixtia/i)

    // Verify main content is visible
    await expect(page.locator('[data-testid="product-grid"]')).toBeVisible()
  })

  test('should display product cards', async ({ page, productFactory }) => {
    // Create test products
    await productFactory.createMany(3, { is_active: true })

    await page.goto('/store')

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]')

    // Verify at least 3 products are displayed
    const productCards = page.locator('[data-testid="product-card"]')
    await expect(productCards).toHaveCount(3, { timeout: 5000 })
  })
})

test.describe('Product Detail', () => {
  test('should show product details', async ({ page, productFactory }) => {
    // Create a test product
    const product = await productFactory.create({
      name: 'Artisan Cheese',
      price: 24.99,
      description: 'Delicious aged cheese from local farm',
    })

    await page.goto(`/store/products/${product.id}`)

    // Verify product information is displayed
    await expect(page.locator('[data-testid="product-name"]')).toContainText('Artisan Cheese')
    await expect(page.locator('[data-testid="product-price"]')).toContainText('24.99')
    await expect(page.locator('[data-testid="product-description"]')).toContainText(
      'Delicious aged cheese'
    )
  })

  test('should add product to cart', async ({ page, productFactory }) => {
    const product = await productFactory.create()

    await page.goto(`/store/products/${product.id}`)

    // Click add to cart button
    await page.click('[data-testid="add-to-cart-button"]')

    // Verify cart widget shows item count
    const cartWidget = page.locator('[data-testid="cart-widget"]')
    await expect(cartWidget).toContainText('1')
  })
})
