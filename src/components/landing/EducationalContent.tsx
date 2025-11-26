import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function EducationalContent() {
  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              What is Nixtamalization?
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Nixtamalization is an ancient Mesoamerican process dating back over 3,500
                years, where corn kernels are soaked and cooked in an alkaline solution,
                traditionally limewater (calcium hydroxide). This transformative technique
                not only makes the corn easier to grind but also unlocks essential nutrients
                like niacin and calcium, making them bioavailable for human absorption.
              </p>
              <p>
                The process dramatically enhances the flavor, aroma, and nutritional profile
                of corn, creating the distinctive taste and texture of authentic masa. This
                traditional method is at the heart of every product we create at Nixtia,
                connecting you to centuries of culinary heritage with every bite.
              </p>
            </div>
            <div className="mt-8">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                disabled
              >
                Learn More (Coming Soon)
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2 relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/nixtamalization-process.svg"
              alt="Traditional nixtamalization process"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
