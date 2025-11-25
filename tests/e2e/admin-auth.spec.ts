import { test, expect } from '@playwright/test'

test.describe('Admin Authentication', () => {
  const ADMIN_EMAIL = 'admin@nixtia.com'
  const ADMIN_PASSWORD = 'Admin123!'
  const INVALID_EMAIL = 'wrong@example.com'
  const INVALID_PASSWORD = 'wrongpassword'

  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('/admin/login')
  })

  test('should display login form correctly', async ({ page }) => {
    // Verify page title and branding
    await expect(page.locator('h1')).toContainText('Nixtia Admin')
    await expect(page.locator('p')).toContainText(
      'Sign in to manage your business'
    )

    // Verify form fields
    const emailInput = page.locator('input[type="email"]')
    await expect(emailInput).toBeVisible()
    await expect(emailInput).toHaveAttribute('autocomplete', 'email')

    const passwordInput = page.locator('input[type="password"]')
    await expect(passwordInput).toBeVisible()
    await expect(passwordInput).toHaveAttribute(
      'autocomplete',
      'current-password'
    )

    // Verify show/hide password toggle
    const passwordToggle = page.locator('button[aria-label="Show password"]')
    await expect(passwordToggle).toBeVisible()

    // Verify submit button
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()
    await expect(submitButton).toContainText('Sign In')
  })

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.locator('input#password')
    const passwordToggle = page.locator('button[aria-label="Show password"]')

    // Initially password should be hidden
    await expect(passwordInput).toHaveAttribute('type', 'password')

    // Click toggle to show password
    await passwordToggle.click()
    await expect(passwordInput).toHaveAttribute('type', 'text')

    // Click again to hide password
    const hideToggle = page.locator('button[aria-label="Hide password"]')
    await hideToggle.click()
    await expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('should show validation errors for empty form', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]')

    // Submit empty form
    await submitButton.click()

    // Wait for validation errors
    await expect(page.locator('text=Please enter a valid email')).toBeVisible({
      timeout: 2000,
    })
  })

  test('should show validation error for invalid email format', async ({
    page,
  }) => {
    const emailInput = page.locator('input[type="email"]')
    const submitButton = page.locator('button[type="submit"]')

    // Enter invalid email
    await emailInput.fill('invalid-email')
    await submitButton.click()

    // Expect validation error
    await expect(page.locator('text=Please enter a valid email')).toBeVisible({
      timeout: 2000,
    })
  })

  test('should show validation error for short password', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    const submitButton = page.locator('button[type="submit"]')

    // Enter valid email but short password
    await emailInput.fill(ADMIN_EMAIL)
    await passwordInput.fill('short')
    await submitButton.click()

    // Expect validation error
    await expect(
      page.locator('text=Password must be at least 8 characters')
    ).toBeVisible({ timeout: 2000 })
  })

  test('should show error for invalid credentials', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    const submitButton = page.locator('button[type="submit"]')

    // Enter invalid credentials
    await emailInput.fill(INVALID_EMAIL)
    await passwordInput.fill(INVALID_PASSWORD)
    await submitButton.click()

    // Expect authentication error
    await expect(
      page.locator('text=Incorrect email or password')
    ).toBeVisible({ timeout: 5000 })

    // Form fields should remain populated
    await expect(emailInput).toHaveValue(INVALID_EMAIL)
    await expect(passwordInput).toHaveValue(INVALID_PASSWORD)
  })

  test('should successfully login with valid credentials', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    const submitButton = page.locator('button[type="submit"]')

    // Enter valid credentials
    await emailInput.fill(ADMIN_EMAIL)
    await passwordInput.fill(ADMIN_PASSWORD)

    // Submit form
    await submitButton.click()

    // Verify loading state
    await expect(submitButton).toContainText('Signing in...', {
      timeout: 1000,
    })

    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/admin/dashboard', { timeout: 5000 })

    // Verify dashboard loaded
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('should redirect to dashboard if already authenticated', async ({
    page,
  }) => {
    // First login
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL)
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
    await page.locator('button[type="submit"]').click()
    await page.waitForURL('/admin/dashboard', { timeout: 5000 })

    // Navigate back to login page
    await page.goto('/admin/login')

    // Should redirect to dashboard automatically
    await expect(page).toHaveURL('/admin/dashboard', { timeout: 3000 })
  })
})

test.describe('Admin Protected Routes', () => {
  const ADMIN_EMAIL = 'admin@nixtia.com'
  const ADMIN_PASSWORD = 'Admin123!'

  test('should redirect unauthenticated user to login', async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto('/admin/dashboard')

    // Should redirect to login page
    await expect(page).toHaveURL('/admin/login', { timeout: 3000 })
  })

  test('should allow authenticated user to access dashboard', async ({
    page,
  }) => {
    // Login first
    await page.goto('/admin/login')
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL)
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
    await page.locator('button[type="submit"]').click()
    await page.waitForURL('/admin/dashboard', { timeout: 5000 })

    // Verify access to dashboard
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('should persist session across page reloads', async ({ page }) => {
    // Login
    await page.goto('/admin/login')
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL)
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
    await page.locator('button[type="submit"]').click()
    await page.waitForURL('/admin/dashboard', { timeout: 5000 })

    // Reload page
    await page.reload()

    // Should still be authenticated
    await expect(page).toHaveURL('/admin/dashboard')
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/admin/login')
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL)
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD)
    await page.locator('button[type="submit"]').click()
    await page.waitForURL('/admin/dashboard', { timeout: 5000 })

    // Click logout button
    const logoutButton = page.locator('button:has-text("Logout")')
    await logoutButton.click()

    // Should redirect to login page
    await expect(page).toHaveURL('/admin/login', { timeout: 3000 })

    // Try to access dashboard again - should redirect to login
    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL('/admin/login', { timeout: 3000 })
  })
})
