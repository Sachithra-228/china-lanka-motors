'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export interface ModelCardProps {
  slug: string;
  name: string;
  priceLabel: string;
  rangeKm?: number;
  chargeTime?: string;
  highlights: string[];
  image?: string | null;
  images?: string[];
  specs?: Record<string, string>;
  onViewDetails?: () => void;
}

export function ModelCard(props: ModelCardProps) {
  const {
    slug,
    name,
    priceLabel,
    rangeKm,
    chargeTime,
    highlights,
    image,
    images: imagesProp,
    onViewDetails
  } = props;

  const images = imagesProp?.length
    ? imagesProp
    : image
      ? [image]
      : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const mainImage = images[activeIndex] ?? image;

  return (
    <article className="group card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E0DACE]">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={`${name} - view ${activeIndex + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-xs text-brand-black/60">
            <div className="mb-2 h-10 w-24 rounded-2xl border border-dashed border-brand-blueLight/60" />
            Vehicle gallery coming soon
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-brand-blueDeep shadow-sm">
          New Arrival
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2 py-1.5 backdrop-blur-sm">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`View image ${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(i);
                }}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  i === activeIndex ? 'scale-125 bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 border-t border-black/5 px-4 py-2">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(i);
              }}
              className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === activeIndex
                  ? 'border-brand-blueDeep ring-2 ring-brand-blueLight/50'
                  : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
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
              <span className="mt-[6px] h-1 w-1 flex-shrink-0 rounded-full bg-brand-blueLight" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2 text-xs">
          {onViewDetails ? (
            <button
              type="button"
              onClick={onViewDetails}
              className="flex-1 rounded-full bg-brand-blueDeep px-3 py-2.5 text-center font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-brand-blueDeep/90 hover:-translate-y-0.5"
            >
              View Details
            </button>
          ) : (
            <Link
              href={`/models/${slug}`}
              className="flex-1 rounded-full bg-brand-blueDeep px-3 py-2.5 text-center font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-brand-blueDeep/90 hover:-translate-y-0.5"
            >
              View Details
            </Link>
          )}
          <Link
            href="/test-drive"
            className="flex-1 rounded-full border border-brand-blueDeep/30 bg-white px-3 py-2.5 text-center font-semibold uppercase tracking-[0.14em] text-brand-blueDeep transition hover:border-brand-blueDeep/60 hover:-translate-y-0.5"
          >
            Test Drive
          </Link>
        </div>
      </div>
    </article>
  );
}
