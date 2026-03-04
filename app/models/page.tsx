import type { Metadata } from 'next';
import { connectDb } from '@/lib/db';
import { VehicleModel } from '@/lib/models/Model';
import { ModelCard } from '@/components/common/ModelCard';
import { BRAND_NAME, MODEL_IMAGE_FALLBACKS } from '@/lib/config';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Models`,
  description: 'Explore China Lanka Motors core EV models, curated for Sri Lankan roads and usage.'
};

async function getModels() {
  try {
    await connectDb();
    const models = await VehicleModel.find({ isPublished: true }).sort({ createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(models));
  } catch {
    return [];
  }
}

export default async function ModelsPage() {
  const models = await getModels();

  const fallbackModels =
    models.length > 0
      ? models
      : [
          {
            _id: '1',
            name: 'Urban Crossover EV',
            slug: 'urban-crossover-ev',
            priceLabel: 'Contact for price',
            rangeKm: 420,
            chargeTime: '30-40 mins DC fast charge (10-80%)',
            highlights: [
              'Compact crossover footprint ideal for Sri Lankan cities',
              'Digital cockpit with smartphone integration',
              'Comfort-oriented suspension tuned for mixed roads',
              'Regenerative braking with adjustable levels',
              'Comprehensive active safety features'
            ],
            images: [MODEL_IMAGE_FALLBACKS[0]]
          },
          {
            _id: '2',
            name: 'City Hatch EV',
            slug: 'city-hatch-ev',
            priceLabel: 'Contact for price',
            rangeKm: 320,
            chargeTime: 'Overnight AC home charging',
            highlights: [
              'Easy-to-park footprint with high seating position',
              'Efficient battery ideal for short commutes',
              'Quiet cabin designed for city use',
              'Simple, intuitive interior with practical storage',
              'Ideal second car for families moving to EVs'
            ],
            images: [MODEL_IMAGE_FALLBACKS[1]]
          }
        ];

  return (
    <div className="container-padded py-10">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blueDeep/80">
          Models
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-brand-blueDeep sm:text-3xl">
          Two core EVs, chosen for Sri Lankan roads.
        </h1>
        <p className="mt-3 text-sm text-brand-black/75">
          Rather than dozens of variants, we focus on a small set of models that make day-to-day
          driving easier - with practical range, calm cabins, and support you can reach.
        </p>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {fallbackModels.map((model: any, index: number) => (
          <ModelCard
            key={model._id}
            slug={model.slug}
            name={model.name}
            priceLabel={model.priceLabel}
            rangeKm={model.rangeKm}
            chargeTime={model.chargeTime}
            highlights={model.highlights}
            image={model.images?.[0] || MODEL_IMAGE_FALLBACKS[index % MODEL_IMAGE_FALLBACKS.length]}
          />
        ))}
      </section>
    </div>
  );
}
