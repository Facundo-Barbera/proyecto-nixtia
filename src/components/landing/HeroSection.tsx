import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <header className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white min-h-screen flex items-center">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/hero-corn.svg"
          alt="Artisan nixtamalized corn products"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 text-center max-w-5xl">
        {/* Logo and Brand */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Nixtia
          </h1>
          <div className="w-24 h-1 bg-white mx-auto rounded-full" />
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Authentic Artisan Nixtamalized Corn Products
        </h2>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-10 text-purple-100 max-w-3xl mx-auto">
          Experience the traditional taste of Mexico with our premium masa, tortillas,
          and corn products made using centuries-old nixtamalization techniques.
        </p>

        {/* Primary CTA */}
        <Link href="/store">
          <Button
            size="lg"
            className="bg-white text-purple-700 hover:bg-purple-50 text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all touch-target"
          >
            Shop Now
          </Button>
        </Link>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </header>
  );
}
