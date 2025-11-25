# Project Initialization

**Status:** ✅ Already Established (Pseudo-Brownfield)

The project foundation has been bootstrapped with the following stack:

```bash
# Project was initialized with:
# npx create-next-app@latest nixtia --typescript --tailwind --app --src-dir --eslint
#
# Additional setup already completed:
# - shadcn/ui initialized (New York style, slate base color)
# - Supabase clients configured (client + server with SSR)
# - Prisma schema defined and migrations created
# - Testing frameworks configured (Vitest + Playwright)
# - Docker deployment setup
```

**Current Project State:**
- All dependencies installed and configured
- Database schema defined (Product, Order, OrderItem, AdminUser)
- Basic route structure established (/landing, /store, /admin)
- Component organization by feature (admin/, store/, landing/, shared/, ui/)
- Supabase RLS policies in place
