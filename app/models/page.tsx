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
            name: 'Honri Boma 300',
            slug: 'honri-boma-300',
            priceLabel: 'Contact for price',
            rangeKm: 300,
            chargeTime: '30–40 mins DC fast charge (20–80%) · 6–8 hrs AC home charging',
            highlights: [
              'Urban electric crossover tuned for Sri Lankan city and suburban roads',
              '31.9 kWh lithium battery paired with a 35 kW electric motor',
              'Digital dashboard with smart connectivity and calm cabin feel',
              'Comfortable suspension and higher ground clearance for local road conditions',
              'Ideal for daily commuting, small families, and eco-conscious drivers'
            ],
            images: MODEL_GALLERY_FALLBACKS[0]
          },
          {
            _id: '2',
            name: 'Honri Boma 200',
            slug: 'honri-boma-200',
            priceLabel: 'Contact for price',
            rangeKm: 200,
            chargeTime: '6–7 hrs AC home charging',
            highlights: [
              'Compact city electric hatch that is easy to park and maneuver',
              '18.5 kWh lithium battery with a 25 kW electric motor',
              'Energy efficient setup optimised for short daily commutes',
              'Minimalist interior with a digital display and quiet driving experience',
              'Low running cost compared to petrol vehicles; ideal for first-time EV drivers'
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
              Two smart EVs designed for Sri Lankan roads.
            </h1>
            <p className="mt-2 text-base leading-relaxed text-white/85 sm:text-lg">
              Rather than overwhelming drivers with dozens of variants, Honri focuses on two practical
              electric vehicles designed for everyday driving in Sri Lanka — efficient, quiet, and easy
              to charge.
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
              Side-by-side specs for quick comparison.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs text-white/90">
                  <thead>
                    <tr className="bg-brand-blueDeep/60 text-[11px] font-semibold uppercase tracking-wider">
                      <th className="px-4 py-3 bg-brand-blueDeep/50">Feature</th>
                      <th className="px-4 py-3">{(modelA as any).name}</th>
                      <th className="px-4 py-3">{(modelB as any).name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr className="bg-white/5">
                      <td className="px-4 py-3 text-white/80">Range</td>
                      <td className="px-4 py-3">300 km (NEDC)</td>
                      <td className="px-4 py-3">200 km (NEDC)</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-4 py-3 text-white/80">Battery</td>
                      <td className="px-4 py-3">31.9 kWh lithium battery</td>
                      <td className="px-4 py-3">18.5 kWh lithium battery</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-4 py-3 text-white/80">Motor power</td>
                      <td className="px-4 py-3">35 kW electric motor</td>
                      <td className="px-4 py-3">25 kW electric motor</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-4 py-3 text-white/80">Top speed</td>
                      <td className="px-4 py-3">100 km/h</td>
                      <td className="px-4 py-3">90 km/h</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-4 py-3 text-white/80">Charging</td>
                      <td className="px-4 py-3">30–40 min DC fast charge (20–80%) · 6–8 hrs AC</td>
                      <td className="px-4 py-3">AC home charging (6–7 hrs)</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-4 py-3 text-white/80">Best use</td>
                      <td className="px-4 py-3">Mixed city and suburban driving</td>
                      <td className="px-4 py-3">Short city trips and daily errands</td>
                    </tr>
                  </tbody>
                </table>
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
