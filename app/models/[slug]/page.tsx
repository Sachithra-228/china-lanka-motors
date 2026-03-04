import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { connectDb } from '@/lib/db';
import { VehicleModel } from '@/lib/models/Model';
import { TestDriveForm } from '@/components/common/TestDriveForm';
import { BRAND_NAME, MODEL_IMAGE_FALLBACKS } from '@/lib/config';

interface PageProps {
  params: { slug: string };
}

function getFallbackModelImages(slug: string) {
  if (slug === 'city-hatch-ev') {
    return [MODEL_IMAGE_FALLBACKS[1], MODEL_IMAGE_FALLBACKS[0]];
  }

  return [MODEL_IMAGE_FALLBACKS[0], MODEL_IMAGE_FALLBACKS[1]];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await connectDb();
  const model = await VehicleModel.findOne({ slug: params.slug }).lean();
  const name = model?.name || 'Model';

  return {
    title: `${BRAND_NAME} | ${name}`,
    description:
      'Detailed specifications, key features, and ownership guidance for this China Lanka Motors EV model.'
  };
}

async function getModel(slug: string) {
  await connectDb();
  const model = await VehicleModel.findOne({ slug }).lean();
  if (!model) return null;
  return JSON.parse(JSON.stringify(model));
}

export default async function ModelDetailPage({ params }: PageProps) {
  const model = await getModel(params.slug);

  if (!model) {
    notFound();
  }

  const specsEntries = Object.entries((model as any).specs || {});
  const displayImages =
    (model as any).images?.length > 0 ? (model as any).images : getFallbackModelImages((model as any).slug);

  return (
    <div className="container-padded py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blueDeep/80">
            Model overview
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-brand-blueDeep sm:text-3xl">
            {(model as any).name}
          </h1>
          <p className="mt-1 text-sm text-brand-black/75">{(model as any).priceLabel}</p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {(model as any).rangeKm && (
              <div className="card p-3 text-xs">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blueDeep/80">
                  Range
                </div>
                <div className="mt-1 text-sm font-semibold text-brand-blueDeep">
                  {(model as any).rangeKm} km
                </div>
                <p className="mt-1 text-[11px] text-brand-black/70">
                  Typical mixed driving estimate; we&apos;ll walk you through real-world scenarios.
                </p>
              </div>
            )}
            {(model as any).chargeTime && (
              <div className="card p-3 text-xs">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blueDeep/80">
                  Charging
                </div>
                <div className="mt-1 text-sm font-semibold text-brand-blueDeep">
                  {(model as any).chargeTime}
                </div>
                <p className="mt-1 text-[11px] text-brand-black/70">
                  Support for home AC plus compatible DC fast chargers where available.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.2fr),minmax(0,0.9fr)]">
            <div className="card overflow-hidden">
              <div className="relative aspect-[4/3] bg-[#DFD9CB]">
                <Image src={displayImages[0]} alt={(model as any).name} fill className="object-cover" />
              </div>
              {displayImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-4 py-3">
                  {displayImages.slice(1).map((img: string) => (
                    <div key={img} className="relative h-16 w-24 flex-shrink-0 rounded-xl bg-[#E4DED1]">
                      <Image src={img} alt={(model as any).name} fill className="rounded-xl object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card p-4 text-sm">
              <h2 className="text-sm font-semibold text-brand-blueDeep">Highlights</h2>
              <ul className="mt-2 space-y-1 text-xs text-brand-black/80">
                {(model as any).highlights?.map((highlight: string) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-brand-blueLight" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-2xl bg-brand-blueLight/12 p-3 text-[11px] text-brand-black/75">
                <strong className="font-semibold text-brand-blueDeep">Warranty & support</strong>
                <p className="mt-1">
                  Each vehicle is supported with clear guidance on battery health, recommended
                  service partners, and documentation for future resale. We&apos;ll walk you through
                  ownership expectations during your visit.
                </p>
              </div>
            </div>
          </div>

          {specsEntries.length > 0 && (
            <section className="mt-8 text-sm">
              <h2 className="text-sm font-semibold text-brand-blueDeep">Specifications</h2>
              <div className="mt-3 overflow-hidden rounded-2xl border border-black/5 bg-[#F6F3EA]">
                <dl className="divide-y divide-black/5">
                  {specsEntries.map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[1.2fr,2fr] px-4 py-2 text-xs">
                      <dt className="font-medium text-brand-black/75">{key}</dt>
                      <dd className="text-brand-black/80">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          )}
        </section>

        <aside className="space-y-4">
          <TestDriveForm
            initialModelSlug={(model as any).slug}
            models={[{ slug: (model as any).slug, name: (model as any).name }]}
          />

          <div className="card p-4 text-xs text-brand-black/75">
            <h3 className="text-sm font-semibold text-brand-blueDeep">General ownership notes</h3>
            <p className="mt-2">
              During your visit we&apos;ll walk you through charging options at your home or
              apartment, realistic range expectations with Sri Lankan traffic and climate, and
              paperwork required for registration and insurance.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
