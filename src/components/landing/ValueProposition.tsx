import { Leaf, Award, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

const benefits = [
  {
    icon: Leaf,
    title: 'Traditional Nixtamalization',
    description:
      'Our corn is prepared using the ancient Mesoamerican process of nixtamalization, which enhances nutrition, flavor, and aroma. This traditional method has been perfected over thousands of years.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description:
      'We source only the finest non-GMO corn and use time-honored techniques to create products of exceptional quality. Every batch is crafted with attention to detail and care.',
  },
  {
    icon: Heart,
    title: 'Artisan Craftsmanship',
    description:
      'Each product is handcrafted in small batches by skilled artisans who are passionate about preserving Mexican culinary traditions and delivering authentic flavors to your table.',
  },
];

export default function ValueProposition() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Why Choose Nixtia?
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto text-lg">
          Discover what makes our nixtamalized corn products exceptional
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                className="p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
