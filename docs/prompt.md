# Nixtia's Project

## Some pointers

- Landing Page
- WebApp (My client)
  - Dashboard
    - Income data
    - Transaction data
    - Data tables
  - Virtual store editor
    - Product CRUD
- Virtual store (their clients)
  - Products
  - Selections and cart
  - Payment methods
    - Mehotd 1: Bank transfer
    - Method 2: On delivery (in person)
      - Card
      - Cash
    - Method 3: Stripe integration (using stripe connect, client has their own portal)

Note: Client provided some assets which will be included in `docs/nixtia-assets`

## Some tech stack pointers

- Supabase as our database and API handler
- Python-based API in case we need a stronger backend than supabase.
  - FastAPI
- Frontend using some of these options:
  - NextJS
  - React
  - Astro(?)
  - Vue
  - Svelte
- Stripe as payment provider
- Hosting options:
  - Vercel
  - Lovable
  - Self-hosted on a VPS (would simplify ci/cd and deployment) 