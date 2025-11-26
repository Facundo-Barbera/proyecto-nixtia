import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
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
  // Fetch featured products from Supabase (active products only)
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, description, price, image_url')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6);

  // Error handling for Supabase response
  if (error) {
    console.error('Failed to fetch featured products:', error.message);
  }

  // Default to empty array if error or null data
  const productList = products ?? [];

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ValueProposition />
      <FeaturedProducts products={productList} />
      <EducationalContent />
      <LandingFooter />
    </main>
  );
}
