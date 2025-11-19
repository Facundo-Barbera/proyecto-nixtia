# Nixtia - Artisan Corn Products E-Commerce Platform

A modern, mobile-first e-commerce web application for selling artisan corn products, built with Next.js 16, React 19, and Supabase.

## Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Components**: shadcn/ui with Radix UI primitives
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **ORM**: Prisma 6.x
- **Deployment**: Vercel
- **Code Quality**: ESLint, Prettier

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 20.x LTS or higher
- **npm**: 10.x or higher
- **Git**: 2.x or higher

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/your-org/nixtia.git
cd nixtia
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables

Create a \`.env.local\` file in the root directory:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Then edit \`.env.local\` and fill in your credentials:

- **Supabase**: Get your project URL and keys from [Supabase Dashboard](https://app.supabase.com)
- **Stripe**: Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys) (use test mode keys for development)

### 4. Run the development server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- \`npm run dev\` - Start development server with hot reload
- \`npm run build\` - Create production build
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint to check code quality
- \`npm run lint:fix\` - Fix auto-fixable ESLint errors
- \`npm run format\` - Format code with Prettier
- \`npm run format:check\` - Check if code is formatted correctly
- \`npm run type-check\` - Run TypeScript compiler checks

## Project Structure

\`\`\`
nixtia/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   ├── lib/              # Utilities and configurations
│   │   └── utils.ts      # Helper functions (cn)
│   └── styles/
│       └── globals.css   # Global styles and Tailwind config
├── public/               # Static assets
├── .env.example          # Environment variables template
├── .env.local            # Local environment (gitignored)
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
\`\`\`

## Design System

**Brand Colors:**

- Primary: Purple 600 (\`#7c3aed\`) - Main brand color
- Hover: Purple 500 (\`#8b5cf6\`)
- Active: Purple 700 (\`#6d28d9\`)

**Typography:**

- Headings: Inter (TAN Headline to be added)
- Body: Inter
- Monospace: JetBrains Mono

**Spacing:** 4px base unit (Tailwind default)

## Architecture

This project follows architectural decisions documented in:

- [Architecture Document](docs/solutioning/architecture.md) - Complete system architecture and ADRs
- [UX Design Specification](docs/planning/ux-design-specification/) - Design system and component guidelines
- [Epic Documentation](docs/planning/epics/) - Feature breakdown and requirements

**Key Architectural Decisions:**

- **ADR-001**: Next.js App Router (not Pages Router) for Server Components and better performance
- **ADR-003**: shadcn/ui for full component control and WCAG AA accessibility

## Development Guidelines

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Prettier for consistent formatting
- Auto-format on save (VSCode)

### Component Naming

- React components: PascalCase (\`ProductCard.tsx\`)
- Utility files: camelCase (\`utils.ts\`)
- API routes: lowercase (\`route.ts\`)

### Import Alias

Use the \`@/\` alias for cleaner imports:

\`\`\`typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
\`\`\`

## Contributing

1. Create a feature branch: \`git checkout -b feature/your-feature\`
2. Make your changes
3. Run tests and linting: \`npm run lint && npm run type-check\`
4. Format code: \`npm run format\`
5. Commit your changes
6. Push and create a pull request

## License

[Your License Here]

## Support

For issues and questions, please open an issue on GitHub or contact the development team.
