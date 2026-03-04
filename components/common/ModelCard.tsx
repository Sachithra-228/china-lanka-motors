import Image from 'next/image';
import Link from 'next/link';

export interface ModelCardProps {
  slug: string;
  name: string;
  priceLabel: string;
  rangeKm?: number;
  chargeTime?: string;
  highlights: string[];
  image?: string | null;
}

export function ModelCard(props: ModelCardProps) {
  const { slug, name, priceLabel, rangeKm, chargeTime, highlights, image } = props;

  return (
    <article className="card card-hover flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] w-full bg-[#E0DACE]">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-xs text-brand-black/60">
            <div className="mb-2 h-10 w-24 rounded-2xl border border-dashed border-brand-blueLight/60" />
            Vehicle gallery coming soon
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-brand-blueDeep">
          New Arrival
        </div>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h3 className="text-sm font-semibold text-brand-blueDeep">{name}</h3>
        <p className="mt-1 text-xs text-brand-black/70">{priceLabel}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-brand-black/60">
          {typeof rangeKm === 'number' && (
            <div>
              <div className="font-semibold text-brand-blueDeep/90">Range</div>
              <div>{rangeKm} km (NEDC est.)</div>
            </div>
          )}
          {chargeTime && (
            <div>
              <div className="font-semibold text-brand-blueDeep/90">Charging</div>
              <div>{chargeTime}</div>
            </div>
          )}
        </div>
        <ul className="mt-3 space-y-1 text-[11px] text-brand-black/70">
          {highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-[6px] h-1 w-1 rounded-full bg-brand-blueLight" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2 text-xs">
          <Link
            href={`/models/${slug}`}
            className="flex-1 rounded-full bg-brand-blueDeep px-3 py-2 text-center font-semibold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-brand-blueDeep/95"
          >
            View Details
          </Link>
          <Link
            href="/test-drive"
            className="flex-1 rounded-full border border-brand-blueDeep/30 bg-white px-3 py-2 text-center font-semibold uppercase tracking-[0.14em] text-brand-blueDeep transition hover:-translate-y-0.5 hover:border-brand-blueDeep/60"
          >
            Test Drive
          </Link>
        </div>
      </div>
    </article>
  );
}

