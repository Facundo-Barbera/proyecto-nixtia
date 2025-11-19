# Story 1.1: Project Setup & Core Dependencies

Status: ready-for-dev

## Story

As a **developer**,
I want the project repository initialized with all core dependencies and build configuration,
so that I can begin implementing features on a solid foundation.

## Acceptance Criteria

1. **Next.js Project Structure**: Next.js 14+ app directory structure initialized with TypeScript and src/ directory
2. **Tailwind CSS Configuration**: Tailwind CSS configured with Nixtia purple brand palette (#7c3aed as primary color)
3. **shadcn/ui Setup**: shadcn/ui installed and configured with customized theme matching brand colors
4. **Code Quality Tools**: ESLint and Prettier configured with agreed code style and auto-formatting
5. **Git Repository**: Git repository initialized with proper .gitignore for Next.js projects
6. **Environment Template**: .env.example file created with placeholder values for future integrations
7. **Documentation**: README.md with setup instructions and project overview
8. **Development Server**: Development server runs successfully with `npm run dev` command
9. **Basic Page Render**: Root route (/) renders a basic "Hello Nixtia" page confirming setup works

## Tasks / Subtasks

- [ ] Task 1: Initialize Next.js project with TypeScript and Tailwind (AC: #1)
  - [ ] Run `npx create-next-app@latest nixtia --typescript --tailwind --app --src-dir --import-alias "@/*"`
  - [ ] Verify Next.js 15.x, TypeScript 5.3+, Tailwind 3.4+ versions installed
  - [ ] Test development server starts without errors

- [ ] Task 2: Configure Tailwind with Nixtia brand palette (AC: #2)
  - [ ] Update tailwind.config.ts with purple-600 (#7c3aed) as primary color
  - [ ] Configure slate colors for neutral palette
  - [ ] Set base spacing system to 4px units
  - [ ] Add custom font configuration for TAN Headline font
  - [ ] Verify Tailwind classes compile correctly

- [ ] Task 3: Install and configure shadcn/ui (AC: #3)
  - [ ] Run `npx shadcn@latest init` with customized theme
  - [ ] Configure components.json with Nixtia color tokens
  - [ ] Install initial base components (button, card, input)
  - [ ] Verify components render with correct styling

- [ ] Task 4: Setup code quality tooling (AC: #4)
  - [ ] Configure ESLint with Next.js recommended rules
  - [ ] Setup Prettier with consistent formatting rules
  - [ ] Add VSCode settings.json for format-on-save
  - [ ] Create npm scripts for linting and formatting
  - [ ] Test linting and formatting commands work

- [ ] Task 5: Initialize Git repository (AC: #5)
  - [ ] Run `git init` if not already initialized
  - [ ] Verify .gitignore includes node_modules, .next, .env.local
  - [ ] Create initial commit with base project structure

- [ ] Task 6: Create environment variable template (AC: #6)
  - [ ] Create .env.example with placeholders for:
    - NEXT_PUBLIC_SUPABASE_URL
    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    - SUPABASE_SERVICE_ROLE_KEY
    - STRIPE_SECRET_KEY
    - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  - [ ] Add comments explaining each variable's purpose
  - [ ] Document environment setup in README

- [ ] Task 7: Write comprehensive README (AC: #7)
  - [ ] Document project overview and tech stack
  - [ ] Add prerequisites (Node.js 20.x, npm 10.x)
  - [ ] Write step-by-step setup instructions
  - [ ] Include development server start commands
  - [ ] Add link to architecture documentation

- [ ] Task 8: Create basic "Hello Nixtia" page (AC: #9)
  - [ ] Update src/app/page.tsx with branded welcome message
  - [ ] Apply Tailwind classes using configured purple palette
  - [ ] Add Next.js Image component with placeholder
  - [ ] Verify responsive styling works on mobile viewport

- [ ] Task 9: Testing and verification (AC: #8, #9)
  - [ ] Run `npm run dev` and verify server starts on port 3000
  - [ ] Open localhost:3000 and confirm page renders
  - [ ] Run `npm run lint` and verify no errors
  - [ ] Run `npm run build` and verify production build succeeds
  - [ ] Test hot reload by making a change to page.tsx

## Dev Notes

### Architecture Patterns and Constraints

**Project Initialization Commands** (per Architecture doc):

```bash
npx create-next-app@latest nixtia --typescript --tailwind --app --src-dir --import-alias "@/*"
cd nixtia
npx shadcn@latest init
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install zod react-hook-form @hookform/resolvers
npm install recharts date-fns react-phone-number-input
npm install stripe @stripe/stripe-js
```

**Key Architectural Decisions:**

- **Next.js App Router** (not Pages Router): ADR-001 specifies App Router for Server Components, better SEO, and future-proofing
- **shadcn/ui over MUI/Chakra**: ADR-003 - Full code control, Tailwind integration, WCAG AA accessibility
- **TypeScript mandatory**: Type safety across frontend and backend per architecture standards
- **Tailwind utility-first**: Required by shadcn/ui and optimized for mobile-first responsive design

**Color System** (from UX Design Spec):

- Primary: purple-600 (#7c3aed) - Brand identity color
- Neutral: slate scale - Professional, modern aesthetic
- Base spacing: 4px increments (Tailwind default)
- Typography: TAN Headline font for headings (to be installed)

**File Structure Standards** (from Architecture):

```
nixtia/
├── src/
│   ├── app/              # Next.js 15 App Router
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   ├── lib/              # Utilities and configurations
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript definitions
│   └── styles/
│       └── globals.css   # Global styles, Tailwind imports
├── .env.local            # Local environment (gitignored)
├── .env.example          # Template for environment variables
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Development Environment Standards:**

- Node.js: 20.x LTS
- npm: 10.x (default package manager per Architecture)
- Git: 2.x for version control
- VSCode recommended with ESLint, Prettier, Tailwind CSS IntelliSense extensions

**Performance Considerations:**

- Next.js built-in optimizations for images, fonts
- Tailwind CSS purges unused styles in production
- Tree-shaking enabled for ES modules
- Bundle size targets: Initial load < 200KB gzipped

**Security Baseline:**

- Environment variables for sensitive data (never in code)
- HTTPS enforced (Vercel default in production)
- TypeScript strict mode enabled
- ESLint security rules configured

### Project Structure Notes

This is a **greenfield project** - no existing codebase to align with. The structure established in this story becomes the foundation for all subsequent development.

**Key Structure Decisions:**

- `src/` directory used for clean separation of source code
- `@/*` import alias configured for simplified imports (e.g., `@/components/ui/button`)
- App Router file conventions: `page.tsx` for pages, `layout.tsx` for layouts
- Component organization: `components/ui/` for shadcn components, `components/store/` and `components/admin/` for feature-specific components (future stories)

**Expected Initial File Tree After Setup:**

```
nixtia/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with global metadata
│   │   ├── page.tsx         # "Hello Nixtia" landing page
│   │   └── favicon.ico
│   ├── components/
│   │   └── ui/              # shadcn/ui base components
│   │       ├── button.tsx   # Installed during shadcn init
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── lib/
│   │   └── utils.ts         # cn() helper from shadcn
│   └── styles/
│       └── globals.css      # Tailwind directives + custom styles
├── public/
│   └── images/              # Future product images
├── .env.example
├── .gitignore
├── components.json          # shadcn/ui configuration
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### References

**Architecture Document:**

- [Project Initialization](../solutioning/architecture.md#project-initialization) - Complete setup command sequence
- [Technology Stack Details](../solutioning/architecture.md#technology-stack-details) - Next.js, React, Tailwind configurations
- [Project Structure](../solutioning/architecture.md#project-structure) - Detailed file tree specifications
- [Naming Conventions](../solutioning/architecture.md#naming-conventions) - File, component, variable naming standards
- [Development Environment](../solutioning/architecture.md#development-environment) - Prerequisites and local setup

**Epic Document:**

- [Epic 1, Story 1.1](../planning/epics/epic-1-foundation-infrastructure.md#story-11-project-setup-core-dependencies) - Acceptance criteria and technical notes

**UX Design Specification:**

- [Design System Foundation](../planning/ux-design-specification/1-design-system-foundation.md) - shadcn/ui rationale and component strategy
- [Visual Foundation](../planning/ux-design-specification/3-visual-foundation.md) - Color system and brand palette
- [Implementation Guidance](../planning/ux-design-specification/9-implementation-guidance.md) - Setup checklist and development best practices

**PRD:**

- [Non-Functional Requirements](../planning/PRD/non-functional-requirements.md#performance) - Performance targets and security baseline
- [Web App Specific Requirements](../planning/PRD/web-app-specific-requirements.md) - Browser support and accessibility level

**ADRs (from Architecture doc):**

- ADR-001: Choose Next.js App Router over Pages Router
- ADR-003: Use shadcn/ui instead of pre-built component library

## Dev Agent Record

### Context Reference

- [Story Context XML](1-1-project-setup-core-dependencies.context.xml)

### Agent Model Used

**Model:** claude-sonnet-4-5-20250929 (Sonnet 4.5)
**Implementation Started:** 2025-11-18 19:45 UTC
**Implementation Completed:** 2025-11-18 20:05 UTC
**Implementation Duration:** ~20 minutes

### Debug Log References

<!-- Will be populated during development -->

### Completion Notes List

**Deviations from Architecture:**
- None - followed architecture document exactly

**New Patterns Established:**
- Tailwind CSS v4 uses CSS variables in globals.css instead of tailwind.config.ts (new v4 pattern)
- shadcn/ui configured with "slate" base color to match UX design specification

**Configuration Choices:**
- Prettier: semicolons off, single quotes, 100-char print width
- ESLint: Next.js recommended config with Next.js 16 flat config format
- VSCode: format-on-save enabled with explicit Prettier formatter

**Dependencies Added:**
- Core: next@16.0.3, react@19.2.0, typescript@^5, tailwindcss@^4
- shadcn/ui: @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge
- Code quality: prettier@^3.6.2, eslint-config-prettier, eslint-plugin-prettier

**Setup Challenges and Solutions:**
- Challenge: create-next-app wouldn't initialize in existing directory (.bmad, .claude folders present)
- Solution: Created project in temp subdirectory, moved all files to root, deleted temp folder
- Challenge: Tailwind v4 uses completely different config approach (CSS variables)
- Solution: Updated globals.css with Nixtia color palette using @theme inline directive

### File List

**NEW: Files created**
- package.json - Next.js 16.0.3, React 19.2.0, TypeScript 5.x, Tailwind 4.x dependencies
- tsconfig.json - TypeScript configuration with strict mode
- next.config.ts - Next.js 16 configuration
- postcss.config.mjs - PostCSS configuration for Tailwind v4
- eslint.config.mjs - ESLint flat config with Next.js rules
- src/app/layout.tsx - Root layout with Geist fonts and metadata
- src/app/page.tsx - "Hello Nixtia" welcome page showcasing brand colors and tech stack
- src/app/globals.css - Tailwind v4 CSS with Nixtia purple (#7c3aed) color palette
- src/components/ui/button.tsx - shadcn/ui button component
- src/components/ui/card.tsx - shadcn/ui card component
- src/components/ui/input.tsx - shadcn/ui input component
- src/lib/utils.ts - cn() utility function for Tailwind class merging
- components.json - shadcn/ui configuration (slate base color, new-york style)
- .prettierrc - Prettier config (semi: false, singleQuote: true, printWidth: 100)
- .prettierignore - Ignores .bmad, .claude, docs folders
- .vscode/settings.json - VSCode format-on-save, ESLint auto-fix, Tailwind IntelliSense config
- .env.example - Environment variable template (Supabase, Stripe placeholders)
- README.md - Comprehensive project documentation with setup instructions
- .gitignore - Next.js standard ignores (node_modules, .next, .env*)

**MODIFIED: Files changed**
- None (greenfield project)

**DELETED: Files removed**
- None

## Change Log

| Date       | Author                           | Change Description                                   |
| ---------- | -------------------------------- | ---------------------------------------------------- |
| 2025-11-18 | SM Agent (create-story workflow) | Initial story draft created from Epic 1 requirements |
