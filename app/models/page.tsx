import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { connectDb } from '@/lib/db';
import { VehicleModel } from '@/lib/models/Model';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { ModelsHero } from '@/components/models/ModelsHero';
import { ModelsGridWithModal } from '@/components/models/ModelsGridWithModal';
import { BRAND_NAME, MODEL_IMAGE_FALLBACKS, MODEL_GALLERY_FALLBACKS } from '@/lib/config';

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
            images: MODEL_GALLERY_FALLBACKS[0]
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
            images: MODEL_GALLERY_FALLBACKS[1]
          }
        ];

  const [modelA, modelB] = fallbackModels;
  const maxRange = Math.max(
    (modelA as any).rangeKm ?? 0,
    (modelB as any).rangeKm ?? 0
  ) || 500;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-blueDeep">
      <ModelsHero />

      <div className="container-padded py-10">
        <ScrollReveal delay={0}>
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Models
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Two core EVs, chosen for Sri Lankan roads.
            </h1>
            <p className="mt-2 text-base leading-relaxed text-white/85 sm:text-lg">
              Rather than dozens of variants, we focus on a small set of models that make day-to-day
              driving easier — with practical range, calm cabins, and support you can reach.
            </p>
          </header>
        </ScrollReveal>

        <ModelsGridWithModal
          models={fallbackModels as any}
          imageFallbacks={MODEL_IMAGE_FALLBACKS as [string, string]}
          galleryFallbacks={MODEL_GALLERY_FALLBACKS}
        />

        {/* Compare section */}
        <ScrollReveal delay={200}>
          <section className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              Compare
            </h2>
            <p className="mt-1 text-xs text-white/60">
              Quick glance at range and charging.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-px bg-white/10">
                <div className="bg-brand-blueDeep/50 p-4 text-center text-[11px] font-semibold uppercase tracking-wider text-white/90">
                  —
                </div>
                <div className="bg-brand-blueDeep/60 p-4 text-center text-[11px] font-semibold uppercase tracking-wider text-white">
                  {(modelA as any).name}
                </div>
                <div className="bg-brand-blueDeep/60 p-4 text-center text-[11px] font-semibold uppercase tracking-wider text-white">
                  {(modelB as any).name}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-px bg-white/10">
                <div className="bg-brand-blueDeep/30 p-3 text-xs text-white/80">
                  Range
                </div>
                <div className="bg-white/5 p-3 text-xs text-white">
                  {(modelA as any).rangeKm ?? '—'} km
                </div>
                <div className="bg-white/5 p-3 text-xs text-white">
                  {(modelB as any).rangeKm ?? '—'} km
                </div>
              </div>
              <div className="grid grid-cols-3 gap-px bg-white/10">
                <div className="bg-brand-blueDeep/30 p-3 text-xs text-white/80">
                  Charging
                </div>
                <div className="bg-white/5 p-3 text-xs text-white/95">
                  {(modelA as any).chargeTime ?? '—'}
                </div>
                <div className="bg-white/5 p-3 text-xs text-white/95">
                  {(modelB as any).chargeTime ?? '—'}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-px bg-white/10">
                <div className="bg-brand-blueDeep/30 p-3 text-xs text-white/80">
                  Range bar
                </div>
                <div className="bg-white/5 p-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-brand-blueLight transition-all duration-500"
                      style={{
                        width: `${maxRange ? (((modelA as any).rangeKm ?? 0) / maxRange) * 100 : 0}%`
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white/5 p-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-brand-blueLight transition-all duration-500"
                      style={{
                        width: `${maxRange ? (((modelB as any).rangeKm ?? 0) / maxRange) * 100 : 0}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* More views / gallery row */}
        <ScrollReveal delay={300}>
          <section className="mt-14">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              More views
            </h2>
            <p className="mt-1 text-xs text-white/60">
              Exterior, interior, and details — explore each model.
            </p>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {fallbackModels.map((model: any, index: number) => (
                <div key={(model as any)._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-xs font-semibold text-white">
                    {(model as any).name}
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {(model.images || MODEL_GALLERY_FALLBACKS[index]).slice(0, 4).map((img: string, i: number) => (
                      <Link
                        key={i}
                        href={`/models/${(model as any).slug}`}
                        className="relative h-28 w-40 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 transition hover:border-white/30"
                      >
                        <Image
                          src={img}
                          alt={`${(model as any).name} view ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
