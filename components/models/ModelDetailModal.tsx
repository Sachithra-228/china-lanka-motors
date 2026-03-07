'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModelDetailModalProps {
  name: string;
  slug: string;
  priceLabel: string;
  rangeKm?: number;
  chargeTime?: string;
  highlights: string[];
  images: string[];
  specs?: Record<string, string>;
  onClose: () => void;
}

export function ModelDetailModal({
  name,
  slug,
  priceLabel,
  rangeKm,
  chargeTime,
  highlights,
  images,
  specs = {},
  onClose
}: ModelDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const specsEntries = Object.entries(specs);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-[#F6F3EA] shadow-2xl">
        <div className="overflow-y-auto max-h-[90vh]">
          <div className="sticky top-0 z-10 flex justify-end border-b border-black/5 bg-[#F6F3EA] p-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brand-blueDeep transition hover:bg-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <h2 id="modal-title" className="text-xl font-semibold text-brand-blueDeep sm:text-2xl">
              {name}
            </h2>
            <p className="mt-1 text-sm text-brand-black/70">{priceLabel}</p>

            <div className="mt-4 overflow-hidden rounded-2xl bg-[#E4DED1]">
              <div className="relative aspect-[4/3] w-full">
                {images[0] ? (
                  <Image
                    src={images[0]}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 48rem"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-brand-black/60">
                    Vehicle image coming soon
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3">
                  {images.slice(1, 6).map((img, i) => (
                    <div
                      key={i}
                      className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl"
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="96px" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {typeof rangeKm === 'number' && (
                <div className="rounded-2xl border border-black/5 bg-white/60 p-3 text-xs">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-blueDeep/80">
                    Range
                  </div>
                  <div className="mt-1 font-semibold text-brand-blueDeep">{rangeKm} km</div>
                </div>
              )}
              {chargeTime && (
                <div className="rounded-2xl border border-black/5 bg-white/60 p-3 text-xs">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-blueDeep/80">
                    Charging
                  </div>
                  <div className="mt-1 font-semibold text-brand-blueDeep">{chargeTime}</div>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-black/5 bg-white/60 p-4">
              <h3 className="text-sm font-semibold text-brand-blueDeep">Highlights</h3>
              <ul className="mt-2 space-y-1.5 text-xs text-brand-black/80">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-blueLight" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {specsEntries.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-brand-blueDeep">Specifications</h3>
                <dl className="mt-2 divide-y divide-black/5 rounded-2xl border border-black/5 bg-white/60 text-xs">
                  {specsEntries.map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[1.2fr,2fr] gap-2 px-4 py-2">
                      <dt className="font-medium text-brand-black/70">{key}</dt>
                      <dd className="text-brand-black/80">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-4 rounded-2xl bg-brand-blueLight/15 p-3 text-[11px] text-brand-black/75">
              <strong className="font-semibold text-brand-blueDeep">Warranty & support</strong>
              <p className="mt-1">
                Each vehicle is supported with clear guidance on battery health, recommended service
                partners, and documentation for future resale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
