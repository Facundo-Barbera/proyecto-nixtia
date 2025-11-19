# Non-Functional Requirements

## Performance

**Load Times:**

- Product catalog page loads in < 2 seconds on mobile 4G
- Product detail pages load in < 1.5 seconds
- Cart updates reflect in < 200ms
- Checkout form submission completes in < 3 seconds
- Dashboard analytics render in < 2 seconds

**Scalability:**

- System handles 100 concurrent users without degradation (MVP scale)
- Database queries optimized with indexing on frequently accessed fields
- Image assets served via CDN with optimization
- Supabase connection pooling configured appropriately

**Caching:**

- Product catalog data cached for 5 minutes
- Static assets cached with aggressive browser cache headers
- CDN caching for images and public pages

## Security

**Authentication & Authorization:**

- Admin passwords hashed using bcrypt (via Supabase)
- Session tokens use secure, httpOnly cookies
- CSRF protection enabled on all state-changing requests
- Rate limiting on authentication endpoints (prevent brute force)

**Data Protection:**

- All traffic served over HTTPS
- Customer phone numbers stored securely (encrypted at rest via Supabase)
- No sensitive payment data stored (PCI DSS via Stripe)
- Environment variables for API keys and secrets (never in code)

**Input Validation:**

- All user inputs sanitized to prevent XSS attacks
- Phone number format validation (client and server-side)
- SQL injection prevention via parameterized queries (Supabase)
- File upload validation for product images (type, size limits)

**Admin Security:**

- Role-based access control for admin routes
- Session timeout after 30 minutes of inactivity
- Audit logging for admin actions (post-demo)

## Integration

**Supabase Integration:**

- Real-time database subscriptions for order updates
- Row-level security policies configured
- Automated backups enabled
- Connection pooling for performance

**Stripe Integration:**

- Stripe Connect setup for client payment portal access
- Webhook handlers for payment events (post-demo)
- Test mode for demo, live mode post-launch
- PCI compliance handled by Stripe

**WhatsApp Integration (Post-MVP):**

- Webhook endpoints for bot communication
- Order notification templates
- Customer inquiry handling

**Future Integrations:**

- Google Analytics for traffic insights
- Social media sharing (Open Graph tags)
- Email service (SendGrid/Mailgun) for admin notifications

---
