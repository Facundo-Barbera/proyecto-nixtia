# Performance Considerations

## Frontend Optimization

**Code Splitting:**
- Next.js automatic route-based code splitting
- Dynamic imports for heavy components (Recharts)
- Lazy loading for admin dashboard

**Image Optimization:**
- Next.js `<Image>` component with automatic optimization
- Supabase Storage CDN for product images
- WebP format with fallbacks
- Responsive image sizes (srcset)

**Caching Strategy:**
- Product catalog: Server-side cache, revalidate every 5 minutes
- Static pages (landing): Generated at build time (SSG)
- Dynamic pages (checkout): Server-rendered (SSR)
- Admin dashboard: Client-side rendering (no SEO needed)

**Bundle Size:**
- Tree-shaking enabled (Tailwind purge, ES modules)
- Minimize dependencies (avoid large libraries)
- Monitor bundle size with Next.js build output

## Backend Optimization

**Database Queries:**
- Indexes on frequently queried columns (`created_at`, `customer_phone`)
- Limit result sets with pagination (future enhancement)
- Aggregate queries for analytics (SUM, COUNT)
- Avoid N+1 queries with Supabase nested selects

**Connection Management:**
- Supabase handles connection pooling automatically
- PostgREST connection pool configured for serverless

**Caching:**
- Next.js App Router automatic caching for Server Components
- `revalidatePath()` for cache invalidation after mutations

## Performance Targets

**Customer Store:**
- First Contentful Paint (FCP): < 1.5s on mobile 4G
- Time to Interactive (TTI): < 3s
- Lighthouse Performance Score: > 85
- Core Web Vitals: Pass all metrics

**Admin Dashboard:**
- Dashboard load: < 2s on good connection
- Chart rendering: < 500ms
- Real-time data sync: < 1s latency (future feature)
