import { Page } from '@playwright/test'

/**
 * Product Factory for creating test product data
 *
 * Generates realistic product data for testing using deterministic random data.
 * Automatically tracks created products for cleanup.
 *
 * @example
 * const product = await productFactory.create({
 *   name: 'Custom Product Name',
 *   price: 29.99
 * })
 */

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
  is_active: boolean
}

export class ProductFactory {
  private createdProducts: string[] = []
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Create a test product via API
   */
  async create(overrides: Partial<Product> = {}): Promise<Product> {
    const timestamp = Date.now()
    const randomSuffix = Math.floor(Math.random() * 1000)

    const productData = {
      name: overrides.name || `Test Product ${timestamp}-${randomSuffix}`,
      description:
        overrides.description ||
        'Delicious artisan food product made with love and traditional methods.',
      price: overrides.price || parseFloat((Math.random() * 100 + 10).toFixed(2)),
      image_url: overrides.image_url || 'https://via.placeholder.com/400',
      is_active: overrides.is_active ?? true,
    }

    const response = await this.page.request.post(
      `${process.env.API_URL || 'http://localhost:3000/api'}/products`,
      {
        data: productData,
      }
    )

    if (!response.ok()) {
      throw new Error(`Failed to create product: ${response.status()} ${await response.text()}`)
    }

    const result = await response.json()
    const product = result.data

    this.createdProducts.push(product.id)
    return product
  }

  /**
   * Create multiple products at once
   */
  async createMany(count: number, overrides: Partial<Product> = {}): Promise<Product[]> {
    const products: Product[] = []
    for (let i = 0; i < count; i++) {
      products.push(
        await this.create({
          ...overrides,
          name: overrides.name ? `${overrides.name} ${i + 1}` : undefined,
        })
      )
    }
    return products
  }

  /**
   * Cleanup all created products
   * Called automatically after each test
   */
  async cleanup(): Promise<void> {
    for (const productId of this.createdProducts) {
      try {
        await this.page.request.delete(
          `${process.env.API_URL || 'http://localhost:3000/api'}/products/${productId}`
        )
      } catch (error) {
        console.warn(`Failed to cleanup product ${productId}:`, error)
      }
    }
    this.createdProducts = []
  }
}
