import { Page } from '@playwright/test'

/**
 * Order Factory for creating test order data
 *
 * Generates realistic order data for testing customer checkout flows.
 * Automatically tracks created orders for cleanup.
 *
 * @example
 * const order = await orderFactory.create({
 *   customer_phone: '+5491123456789',
 *   items: [{ product_id: '...', quantity: 2 }]
 * })
 */

export interface OrderItem {
  product_id: string
  quantity: number
  unit_price: number
}

export interface Order {
  id: string
  order_number: string
  customer_phone: string
  total_amount: number
  payment_method: 'BANK_TRANSFER' | 'CASH_ON_DELIVERY' | 'CARD_ON_DELIVERY' | 'STRIPE'
  payment_status: 'PENDING' | 'CONFIRMED' | 'FAILED'
  order_status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
  order_items: OrderItem[]
}

export class OrderFactory {
  private createdOrders: string[] = []
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Generate a random test phone number in E.164 format
   */
  private generatePhoneNumber(): string {
    const countryCode = '+549' // Argentina
    const areaCode = '11'
    const number = Math.floor(10000000 + Math.random() * 90000000)
    return `${countryCode}${areaCode}${number}`
  }

  /**
   * Create a test order via API
   */
  async create(
    overrides: Partial<{
      customer_phone: string
      payment_method: Order['payment_method']
      items: OrderItem[]
    }> = {}
  ): Promise<Order> {
    const orderData = {
      customerPhone: overrides.customer_phone || this.generatePhoneNumber(),
      paymentMethod: overrides.payment_method || 'CASH_ON_DELIVERY',
      items: overrides.items || [
        {
          product_id: 'test-product-id', // Replace with actual product ID in tests
          quantity: 1,
          unit_price: 29.99,
        },
      ],
    }

    const response = await this.page.request.post(
      `${process.env.API_URL || 'http://localhost:3000/api'}/orders`,
      {
        data: orderData,
      }
    )

    if (!response.ok()) {
      throw new Error(`Failed to create order: ${response.status()} ${await response.text()}`)
    }

    const result = await response.json()
    const order = result.data

    this.createdOrders.push(order.id)
    return order
  }

  /**
   * Cleanup all created orders
   * Called automatically after each test
   */
  async cleanup(): Promise<void> {
    // Note: In production, you may want to soft-delete orders instead
    for (const orderId of this.createdOrders) {
      try {
        await this.page.request.delete(
          `${process.env.API_URL || 'http://localhost:3000/api'}/orders/${orderId}`
        )
      } catch (error) {
        console.warn(`Failed to cleanup order ${orderId}:`, error)
      }
    }
    this.createdOrders = []
  }
}
