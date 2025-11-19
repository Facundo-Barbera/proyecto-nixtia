export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <main className="flex max-w-4xl flex-col items-center gap-8 text-center">
        {/* Logo/Brand Section */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl font-bold text-primary md:text-8xl">Nixtia</h1>
          <p className="text-xl text-text-body md:text-2xl">
            Artisan Corn Products E-Commerce
          </p>
        </div>

        {/* Welcome Message */}
        <div className="rounded-lg border border-border bg-card-bg p-8 shadow-sm">
          <h2 className="mb-4 text-3xl font-semibold text-text-heading">
            Hello Nixtia! 👋
          </h2>
          <p className="mb-6 text-lg text-text-body">
            Welcome to your new Next.js application with Tailwind CSS and shadcn/ui
            components.
          </p>

          {/* Tech Stack */}
          <div className="grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded border border-border bg-background p-4">
              <h3 className="mb-2 font-semibold text-primary">Frontend</h3>
              <ul className="space-y-1 text-sm text-text-body">
                <li>✓ Next.js 16 (App Router)</li>
                <li>✓ React 19</li>
                <li>✓ TypeScript 5</li>
                <li>✓ Tailwind CSS 4</li>
              </ul>
            </div>
            <div className="rounded border border-border bg-background p-4">
              <h3 className="mb-2 font-semibold text-primary">Components</h3>
              <ul className="space-y-1 text-sm text-text-body">
                <li>✓ shadcn/ui</li>
                <li>✓ Radix UI primitives</li>
                <li>✓ WCAG AA accessible</li>
                <li>✓ Mobile-first design</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover active:bg-primary-active"
          >
            Next.js Docs
          </a>
          <a
            href="/docs/solutioning/architecture.md"
            className="rounded-md border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Architecture
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-sm text-text-body">
          <p>Built with ❤️ using modern web technologies</p>
        </footer>
      </main>
    </div>
  )
}
