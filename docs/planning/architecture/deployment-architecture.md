# Deployment Architecture

## Docker Containerization

**Development (docker-compose.yml):**
```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    env_file:
      - .env.local
```

**Production (Dockerfile):**
```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

## Infrastructure

**Hosting Options:**
- Docker container on VPS (DigitalOcean, AWS EC2, etc.)
- Next.js standalone output for optimal container size
- Reverse proxy with Nginx (SSL termination, load balancing)

**Environment Management:**
- Local: `.env.local` with local Supabase
- Staging: Separate Supabase project, test mode Stripe
- Production: Production Supabase, live mode Stripe

**Continuous Deployment:**
- Git push triggers build
- Docker image built and pushed to registry
- Container updated with zero-downtime deployment
