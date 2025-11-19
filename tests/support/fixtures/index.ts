import { test as base } from '@playwright/test'
import { ProductFactory } from './factories/product-factory'
import { OrderFactory } from './factories/order-factory'

/**
 * Custom test fixtures for Nixtia E-commerce Platform
 *
 * This extends Playwright's base test with custom fixtures that provide:
 * - Data factories for creating test data
 * - Automatic cleanup after each test
 * - Shared test utilities
 *
 * @example
 * import { test, expect } from '@/tests/support/fixtures'
 *
 * test('should create product', async ({ page, productFactory }) => {
 *   const product = await productFactory.create()
 *   // Test logic...
 *   // Cleanup happens automatically
 * })
 */

type TestFixtures = {
  productFactory: ProductFactory
  orderFactory: OrderFactory
}

export const test = base.extend<TestFixtures>({
  productFactory: async ({ page }, use) => {
    const factory = new ProductFactory(page)
    await use(factory)
    await factory.cleanup()
  },

  orderFactory: async ({ page }, use) => {
    const factory = new OrderFactory(page)
    await use(factory)
    await factory.cleanup()
  },
})

export { expect } from '@playwright/test'
