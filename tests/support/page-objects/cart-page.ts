import { Page, Locator } from '@playwright/test'

/**
 * Page Object Model for Cart Page
 *
 * Encapsulates cart page interactions and selectors.
 * Use data-testid selectors for stability.
 *
 * @example
 * const cartPage = new CartPage(page)
 * await cartPage.goto()
 * await cartPage.updateQuantity(productId, 3)
 * await cartPage.proceedToCheckout()
 */

export class CartPage {
  readonly page: Page
  readonly cartItemsContainer: Locator
  readonly checkoutButton: Locator
  readonly emptyCartMessage: Locator
  readonly totalAmount: Locator

  constructor(page: Page) {
    this.page = page
    this.cartItemsContainer = page.locator('[data-testid="cart-items"]')
    this.checkoutButton = page.locator('[data-testid="checkout-button"]')
    this.emptyCartMessage = page.locator('[data-testid="empty-cart-message"]')
    this.totalAmount = page.locator('[data-testid="cart-total"]')
  }

  async goto(): Promise<void> {
    await this.page.goto('/store/cart')
  }

  async getCartItem(productId: string): Promise<Locator> {
    return this.page.locator(`[data-testid="cart-item-${productId}"]`)
  }

  async updateQuantity(productId: string, quantity: number): Promise<void> {
    const quantityInput = this.page.locator(
      `[data-testid="cart-item-${productId}"] [data-testid="quantity-input"]`
    )
    await quantityInput.fill(quantity.toString())
    await quantityInput.blur() // Trigger update
  }

  async removeItem(productId: string): Promise<void> {
    await this.page.click(`[data-testid="cart-item-${productId}"] [data-testid="remove-button"]`)
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click()
    await this.page.waitForURL('/store/checkout')
  }

  async getTotalAmount(): Promise<string> {
    return await this.totalAmount.textContent()
  }

  async getItemCount(): Promise<number> {
    const items = await this.cartItemsContainer.locator('[data-testid^="cart-item-"]').count()
    return items
  }

  async isEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible()
  }
}
