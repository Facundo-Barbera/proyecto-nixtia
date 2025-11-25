import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/landing/HeroSection';
import ValueProposition from '@/components/landing/ValueProposition';
import FeaturedProducts from '@/components/landing/FeaturedProducts';
import EducationalContent from '@/components/landing/EducationalContent';
import LandingFooter from '@/components/landing/LandingFooter';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Nixtia - Artisan Nixtamalized Corn Products',
  description: 'Discover authentic artisan nixtamalized corn products made with traditional methods. Premium quality masa, tortillas, and more.',
  openGraph: {
    title: 'Nixtia - Artisan Nixtamalized Corn Products',
    description: 'Discover authentic artisan nixtamalized corn products made with traditional methods.',
    type: 'website',
  },
};

export default async function LandingPage() {
  // Fetch featured products (active products only)
  const products = await prisma.products.findMany({
    where: { active: true },
    take: 6,
    orderBy: { created_at: 'desc' },
  });

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ValueProposition />
      <FeaturedProducts products={products} />
      <EducationalContent />
      <LandingFooter />
    </main>
  );
}
