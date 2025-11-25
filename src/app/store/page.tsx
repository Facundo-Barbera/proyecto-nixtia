import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/store/ProductCard';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Shop - Nixtia',
  description: 'Browse our selection of authentic artisan nixtamalized corn products',
};

export default async function StorePage() {
  // Fetch active products from database
  const products = await prisma.products.findMany({
    where: { active: true },
    orderBy: { created_at: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image_url: true,
    },
  });

  // Empty state handling
  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl text-gray-600">
            No products available at the moment
          </p>
          <p className="text-gray-500 mt-2">Please check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Our Products
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Discover our selection of authentic artisan nixtamalized corn products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
