# Nixtia E2E Test Suite

Production-ready Playwright test framework for the Nixtia e-commerce platform.

## Quick Start

### Installation

```bash
# Install dependencies (includes Playwright)
npm install

# Install Playwright browsers
npx playwright install
```

### Environment Setup

1. Copy the environment template:

```bash
cp .env.test.example .env.test
```

2. Edit `.env.test` with your test environment values:

```env
BASE_URL=http://localhost:3000
TEST_ADMIN_EMAIL=admin@test.nixtia.com
TEST_ADMIN_PASSWORD=YourTestPassword123!
```

### Running Tests

```bash
# Run all tests (headless)
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode (step through tests)
npm run test:e2e:debug

# View HTML report
npm run test:e2e:report
```

### Running Specific Tests

```bash
# Run single test file
npx playwright test tests/e2e/customer-checkout.spec.ts

# Run tests matching pattern
npx playwright test --grep "checkout"

# Run on specific browser
npx playwright test --project=chromium
```

## Test Architecture

### Directory Structure

```
tests/
├── e2e/                          # Test files
│   ├── example.spec.ts           # Basic examples
│   ├── customer-checkout.spec.ts # Guest checkout flows
│   └── admin-dashboard.spec.ts   # Admin authentication & dashboard
├── support/                      # Test infrastructure
│   ├── fixtures/                 # Custom test fixtures
│   │   ├── index.ts              # Fixture exports (test, expect)
│   │   └── factories/            # Data factories
│   │       ├── product-factory.ts
│   │       └── order-factory.ts
│   ├── helpers/                  # Utility functions
│   │   └── auth-helper.ts        # Admin authentication
│   └── page-objects/             # Page Object Models
│       └── cart-page.ts          # Cart page interactions
└── README.md                     # This file
```

### Fixture Architecture

Tests use custom fixtures for automatic setup and cleanup:

```typescript
import { test, expect } from '../support/fixtures'

test('should create product', async ({ page, productFactory }) => {
  const product = await productFactory.create({ name: 'Test Product' })
  // Test logic...
  // Automatic cleanup happens after test
})
```

**Available Fixtures:**

- `productFactory` - Create test products with auto-cleanup
- `orderFactory` - Create test orders with auto-cleanup

### Data Factories

Factories generate realistic test data with deterministic randomness:

```typescript
// Create single product
const product = await productFactory.create({
  name: 'Artisan Cheese',
  price: 24.99,
})

// Create multiple products
const products = await productFactory.createMany(5, { is_active: true })

// Create order with items
const order = await orderFactory.create({
  customer_phone: '+5491123456789',
  items: [{ product_id: product.id, quantity: 2, unit_price: product.price }],
})
```

Factories automatically:

- Generate unique data per test run
- Track created entities
- Clean up after test completion

### Page Object Pattern

Page Objects encapsulate page interactions and selectors:

```typescript
import { CartPage } from '../support/page-objects/cart-page'

const cartPage = new CartPage(page)
await cartPage.goto()
await cartPage.updateQuantity(productId, 3)
await cartPage.proceedToCheckout()
```

**Benefits:**

- Reusable page interactions
- Centralized selector management
- Easier test maintenance

## Best Practices

### Selector Strategy

Always use `data-testid` attributes for stable selectors:

```typescript
// ✅ Good - data-testid selector
await page.click('[data-testid="add-to-cart-button"]')

// ❌ Bad - brittle CSS selector
await page.click('.btn.btn-primary.add-to-cart')
```

**Naming Convention:** `data-testid="component-action"` or `data-testid="component-element"`

### Test Isolation

Each test should:

1. **Be independent** - Not rely on other tests
2. **Clean up** - Remove created data (fixtures handle this)
3. **Use fresh data** - Create new test data per test

```typescript
test('isolated test', async ({ page, productFactory }) => {
  // ✅ Create fresh data
  const product = await productFactory.create()

  // ✅ Test runs independently
  await page.goto(`/store/products/${product.id}`)

  // ✅ Automatic cleanup via fixture
})
```

### Assertions

Use explicit Playwright assertions with clear messages:

```typescript
// ✅ Good - specific assertion
await expect(page.locator('[data-testid="product-name"]')).toContainText('Artisan Cheese')

// ❌ Bad - generic assertion
expect(await page.textContent('.name')).toBe('Artisan Cheese')
```

### Timeouts

Configure appropriate timeouts for different operations:

- **Action timeout:** 15 seconds (click, fill, select)
- **Navigation timeout:** 30 seconds (page.goto, waitForURL)
- **Test timeout:** 60 seconds (entire test)

Override when needed:

```typescript
await expect(slowElement).toBeVisible({ timeout: 30000 })
```

### Network-First Testing

For API-heavy flows, wait for network requests:

```typescript
// Wait for API call before assertion
await page.waitForResponse((response) => response.url().includes('/api/products'))
```

## Mobile Testing

Playwright includes mobile device emulation:

```bash
# Run tests on mobile browsers
npx playwright test --project=mobile-chrome
npx playwright test --project=mobile-safari
```

Mobile projects are pre-configured in `playwright.config.ts`:

- **mobile-chrome:** Pixel 5 emulation
- **mobile-safari:** iPhone 13 emulation

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: test-results/
```

### Environment Variables in CI

Set these secrets in your CI platform:

- `BASE_URL` - Test environment URL
- `TEST_ADMIN_EMAIL` - Admin test credentials
- `TEST_ADMIN_PASSWORD` - Admin test credentials
- `DATABASE_URL` - Test database connection

## Debugging Tests

### Visual Debugging

```bash
# UI mode (recommended)
npm run test:e2e:ui

# Headed mode (see browser)
npm run test:e2e:headed

# Debug mode (step through)
npm run test:e2e:debug
```

### Viewing Traces

Traces are captured on test failures:

```bash
# View trace from failed test
npx playwright show-trace test-results/trace.zip
```

### Screenshots & Videos

Configured to capture on failure only:

- **Screenshots:** `test-results/{test-name}/screenshot.png`
- **Videos:** `test-results/{test-name}/video.webm`
- **Traces:** `test-results/{test-name}/trace.zip`

## Writing New Tests

### Template

```typescript
import { test, expect } from '../support/fixtures'

test.describe('Feature Name', () => {
  test('should do something', async ({ page, productFactory }) => {
    // 1. Setup: Create test data
    const product = await productFactory.create()

    // 2. Action: Perform user interaction
    await page.goto(`/store/products/${product.id}`)
    await page.click('[data-testid="add-to-cart-button"]')

    // 3. Assert: Verify expected outcome
    await expect(page.locator('[data-testid="cart-widget"]')).toContainText('1')
  })
})
```

### Adding New Fixtures

1. Create fixture factory in `tests/support/fixtures/factories/`
2. Export fixture in `tests/support/fixtures/index.ts`
3. Use in tests via destructuring

### Adding New Page Objects

1. Create class in `tests/support/page-objects/`
2. Define locators as class properties
3. Implement interaction methods
4. Import and use in tests

## Performance Optimization

### Parallel Execution

Playwright runs tests in parallel by default:

```typescript
// playwright.config.ts
export default defineConfig({
  fullyParallel: true, // Run all tests in parallel
  workers: process.env.CI ? 1 : undefined, // CI: 1 worker, Local: CPU cores
})
```

### Test Splitting

For large test suites, use test sharding in CI:

```bash
# Run 1st shard of 4
npx playwright test --shard=1/4
```

## Troubleshooting

### Common Issues

**Issue:** Tests fail with "Timeout" errors
**Solution:** Increase timeout or check if app is running

```typescript
await expect(element).toBeVisible({ timeout: 30000 })
```

**Issue:** "No tests found"
**Solution:** Ensure test files end with `.spec.ts` or `.test.ts`

**Issue:** "Browser not found"
**Solution:** Run `npx playwright install`

**Issue:** Flaky tests (pass/fail inconsistently)
**Solution:**

- Use `waitForSelector` before interactions
- Avoid hard-coded `page.waitForTimeout()`
- Use network waiting instead of arbitrary delays

### Getting Help

- Playwright Docs: https://playwright.dev
- Playwright Discord: https://aka.ms/playwright/discord
- Project Issues: [GitHub Issues](https://github.com/your-org/nixtia/issues)

## Next Steps

1. **Install Playwright:** `npm install && npx playwright install`
2. **Configure Environment:** Copy `.env.test.example` to `.env.test`
3. **Run Sample Tests:** `npm run test:e2e:ui`
4. **Write Your First Test:** Use the template above
5. **Add to CI/CD:** Integrate with your pipeline

---

**Framework Version:** Playwright 1.49+
**Last Updated:** 2025-11-18
**Maintained by:** Murat (Test Architect)
