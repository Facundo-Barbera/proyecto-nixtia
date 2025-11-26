# Recommendations for Sprint 0

## Must Complete (Blocking)

1. **Add `/api/health` endpoint**
   - Returns: `{ status: 'healthy', timestamp: ISO, services: { database: 'UP' } }`
   - Used by: Reliability tests, monitoring

2. **Configure Playwright project**
   - Create `playwright.config.ts` with projects: chromium, mobile
   - Enable tracing and screenshot on failure
   - Configure baseURL for environment switching

3. **Setup Vitest for unit tests**
   - Configure coverage thresholds (80%)
   - Add test scripts to package.json

4. **Create test data factories**
   - `createProduct()`, `createOrder()`, `createUser()` with faker
   - Auto-cleanup fixtures

## Should Complete (Recommended)

5. **Add Lighthouse CI to pipeline**
   - Performance budget: score >85
   - Accessibility audit: 0 violations

6. **Configure k6 baseline**
   - Smoke test: 10 VU, 30s
   - Load test: 100 VU, 5min

7. **Add structured logging**
   - Format: JSON with timestamp, level, message
   - Levels: debug, info, warn, error

## Could Complete (Nice to Have)

8. **Visual regression setup**
   - Playwright snapshot tests for landing page
   - Chromium baseline comparison

9. **Accessibility automation**
   - axe-core integration in E2E tests
   - WCAG 2.1 AA validation

---
