'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils/formatPrice';
import { useCartContext } from '@/contexts/CartContext';
import { Decimal } from '@prisma/client/runtime/library';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: Decimal;
    image_url: string | null;
  };
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCartContext();

  const handleAddToCart = () => {
    // Story 2.3: AC-2.3.4 - Add to Cart Functionality
    addItem({
      product_id: product.id,
      name: product.name,
      price: Number(product.price),
      image_url: product.image_url,
    });
    toast.success('Added to cart');
  };

  // Truncate name if longer than 50 characters
  const displayName =
    product.name.length > 50
      ? `${product.name.substring(0, 47)}...`
      : product.name;

  return (
    <article>
      <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative h-64 bg-gray-100 overflow-hidden rounded-t-lg">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              quality={85}
              loading={priority ? undefined : 'lazy'}
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <svg
                className="w-20 h-20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <CardContent className="p-6 flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2" title={product.name}>
            {displayName}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {product.description}
            </p>
          )}
        </CardContent>

        {/* Price and CTA */}
        <CardFooter className="p-6 pt-0 flex flex-col gap-4">
          <p className="text-2xl font-bold text-purple-600">
            {formatPrice(product.price)}
          </p>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white min-h-[44px]"
            size="lg"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
