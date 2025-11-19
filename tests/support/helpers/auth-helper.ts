import { Page } from '@playwright/test'

/**
 * Authentication helper for admin login flows
 *
 * @example
 * await loginAsAdmin(page)
 * // Now on admin dashboard, authenticated
 */

export async function loginAsAdmin(page: Page): Promise<void> {
  const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@test.nixtia.com'
  const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'TestPassword123!'

  await page.goto('/admin/login')

  await page.fill('[data-testid="email-input"]', adminEmail)
  await page.fill('[data-testid="password-input"]', adminPassword)
  await page.click('[data-testid="login-button"]')

  // Wait for redirect to dashboard
  await page.waitForURL('/admin/dashboard', { timeout: 10000 })
}

/**
 * Logout from admin session
 */
export async function logoutAdmin(page: Page): Promise<void> {
  await page.click('[data-testid="logout-button"]')
  await page.waitForURL('/admin/login', { timeout: 10000 })
}

/**
 * Check if currently authenticated as admin
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    // Check for admin-specific UI element
    await page.waitForSelector('[data-testid="admin-header"]', { timeout: 2000 })
    return true
  } catch {
    return false
  }
}
