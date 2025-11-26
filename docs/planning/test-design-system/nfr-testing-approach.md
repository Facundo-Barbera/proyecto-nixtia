# NFR Testing Approach

## Security (SEC)

| Requirement | Test Approach | Tool | Priority |
|-------------|---------------|------|----------|
| RLS enforcement | API tests attempting unauthorized access | Playwright request | P0 |
| Admin authentication | E2E login flow + protected route access | Playwright | P0 |
| Session timeout (30min) | E2E with clock manipulation | Playwright | P1 |
| CSRF protection | Verify Server Action tokens | Playwright | P1 |
| XSS prevention | Input sanitization tests | Playwright | P1 |
| SQL injection | Supabase parameterized (inherent) | - | P2 (audit) |
| Secrets not exposed | Console/network inspection | Playwright | P0 |

**RLS Test Pattern:**
```typescript
// Test: Anon user cannot access orders
test('anon cannot read orders', async ({ request }) => {
  const response = await request.get('/api/orders');
  expect(response.status()).toBe(401); // or empty array via RLS
});

// Test: Admin can read all orders
test('admin can read orders', async ({ request, adminAuth }) => {
  const response = await request.get('/api/orders', {
    headers: { Authorization: `Bearer ${adminAuth.token}` }
  });
  expect(response.status()).toBe(200);
});
```

## Performance (PERF)

| Requirement | Test Approach | Tool | Threshold |
|-------------|---------------|------|-----------|
| Catalog <2s mobile 4G | Throttled page load | Playwright + Lighthouse | FCP <1.5s, LCP <2.5s |
| Product detail <1.5s | Page load timing | Playwright | navigationStart → loadEventEnd |
| Cart update <200ms | UI response timing | Playwright | click → UI update |
| Checkout <3s | E2E journey timing | Playwright | form submit → confirmation |
| 100 concurrent users | Load test | k6 | p95 <500ms, error rate <1% |

**k6 Load Test Pattern:**
```javascript
export const options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    errors: ['rate<0.01'],
  },
};
```

## Reliability (REL)

| Requirement | Test Approach | Tool | Priority |
|-------------|---------------|------|----------|
| Graceful API failure handling | Mock 500 responses | Playwright route | P0 |
| Network disconnection handling | Offline mode simulation | Playwright context | P1 |
| Health check endpoint | API availability test | Playwright request | P0 |
| Error message display | UI error state validation | Playwright | P0 |

**Reliability Test Pattern:**
```typescript
test('app shows error UI on API failure', async ({ page, context }) => {
  await context.route('**/api/products', route =>
    route.fulfill({ status: 500 })
  );
  await page.goto('/tienda');
  await expect(page.getByText(/error|intente/i)).toBeVisible();
});
```

## Maintainability (MAINT)

| Requirement | Test Approach | Tool | Threshold |
|-------------|---------------|------|-----------|
| Test coverage ≥80% critical paths | Coverage report | Vitest + Istanbul | 80% lines |
| No critical vulnerabilities | Dependency audit | npm audit (CI) | 0 critical/high |
| Code duplication <5% | Static analysis | jscpd (CI) | <5% |
| Structured logging | Log format validation | Manual review + E2E | JSON format |

---
