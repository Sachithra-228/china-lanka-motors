'use client';

import { useCallback, useState } from 'react';

export type WhyItem = {
  index: string;
  title: string;
  body: string;
};

export function WhyCards({ items }: { items: WhyItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const isExpanded = useCallback((i: number) => hovered === i, [hovered]);

  const [first, ...rest] = items;
  const last = rest.pop();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {first && (
        <article
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
          className={`relative flex h-[18rem] flex-col overflow-hidden border p-6 shadow-[0_18px_40px_rgba(0,0,0,0.2)] transition-all duration-500 sm:row-span-2 sm:h-[22rem] sm:p-6 md:h-[24rem] md:p-8 ${
            isExpanded(0) ? 'border-neutral-200 bg-white shadow-[0_22px_48px_rgba(0,0,0,0.1)]' : 'border-white/10 bg-black hover:border-neutral-200 hover:bg-white hover:shadow-[0_22px_48px_rgba(0,0,0,0.1)]'
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-white/20 via-white/40 to-transparent" />
          <div
            className={`mt-2 flex min-h-0 flex-1 flex-col items-center justify-center transition-all duration-500 sm:mt-4 ${
              isExpanded(0) ? 'justify-start' : ''
            }`}
          >
            <div
              className={`font-unbounded text-[11px] font-extrabold uppercase tracking-[0.32em] transition-all duration-500 ${
                isExpanded(0) ? 'text-black' : 'absolute h-0 overflow-hidden opacity-0 pointer-events-none'
              }`}
            >
              {first.index}
            </div>
            <h3
              className={`font-unbounded text-center font-semibold transition-all duration-500 ${
                isExpanded(0)
                  ? 'mt-2 text-lg text-black sm:text-xl'
                  : 'flex h-full w-full items-center justify-center text-center text-xl text-white sm:text-2xl md:text-3xl'
              }`}
            >
              {first.title}
            </h3>
            <div
              className={`max-w-md text-center transition-all duration-500 ${
                isExpanded(0)
                  ? 'mt-3 translate-y-0 opacity-100'
                  : 'pointer-events-none absolute h-0 translate-y-3 overflow-hidden opacity-0'
              }`}
              aria-hidden={!isExpanded(0)}
            >
              <p className="text-sm leading-6 text-brand-black/70 sm:text-base sm:leading-7">
                {first.body}
              </p>
            </div>
          </div>
        </article>
      )}
      {rest.map((item, idx) => (
        <article
          key={item.title}
          onMouseEnter={() => setHovered(idx + 1)}
          onMouseLeave={() => setHovered(null)}
          className={`relative flex h-[11rem] flex-col overflow-hidden border p-4 shadow-[0_18px_40px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-0.5 sm:h-[12rem] sm:p-5 ${
            isExpanded(idx + 1) ? 'border-neutral-200 bg-white shadow-[0_20px_44px_rgba(0,0,0,0.08)]' : 'border-white/10 bg-black hover:border-neutral-200 hover:bg-white hover:shadow-[0_20px_44px_rgba(0,0,0,0.08)]'
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/20 via-white/40 to-transparent" />
          <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center transition-all duration-500">
            <div
              className={`font-unbounded text-[11px] font-extrabold uppercase tracking-[0.32em] transition-all duration-500 ${
                isExpanded(idx + 1) ? 'text-center text-black' : 'absolute h-0 overflow-hidden opacity-0 pointer-events-none'
              }`}
            >
              {item.index}
            </div>
            <h3
              className={`font-unbounded text-center font-semibold transition-all duration-500 ${
                isExpanded(idx + 1)
                  ? 'mt-2 text-sm text-black opacity-100'
                  : 'flex h-full w-full items-center justify-center text-center text-base text-white sm:text-lg'
              }`}
            >
              {item.title}
            </h3>
            <div
              className={`max-w-xs text-center transition-all duration-500 ${
                isExpanded(idx + 1)
                  ? 'mt-2 translate-y-0 opacity-100'
                  : 'pointer-events-none absolute h-0 translate-y-3 overflow-hidden opacity-0'
              }`}
              aria-hidden={!isExpanded(idx + 1)}
            >
              <p className="text-sm leading-6 text-brand-black/70">{item.body}</p>
            </div>
          </div>
        </article>
      ))}
      {last && (
        <article
          onMouseEnter={() => setHovered(items.length - 1)}
          onMouseLeave={() => setHovered(null)}
          className={`relative flex h-[11rem] flex-col overflow-hidden border p-4 shadow-[0_18px_40px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-0.5 sm:col-span-2 sm:h-[12rem] sm:p-5 ${
            isExpanded(items.length - 1) ? 'border-neutral-200 bg-white shadow-[0_20px_44px_rgba(0,0,0,0.08)]' : 'border-white/10 bg-black hover:border-neutral-200 hover:bg-white hover:shadow-[0_20px_44px_rgba(0,0,0,0.08)]'
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/20 via-white/40 to-transparent" />
          <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center transition-all duration-500">
            <div
              className={`font-unbounded text-[11px] font-extrabold uppercase tracking-[0.32em] transition-all duration-500 ${
                isExpanded(items.length - 1) ? 'text-center text-black' : 'absolute h-0 overflow-hidden opacity-0 pointer-events-none'
              }`}
            >
              {last.index}
            </div>
            <h3
              className={`font-unbounded text-center font-semibold transition-all duration-500 ${
                isExpanded(items.length - 1)
                  ? 'mt-2 text-sm text-black opacity-100'
                  : 'flex h-full w-full items-center justify-center text-center text-base text-white sm:text-lg'
              }`}
            >
              {last.title}
            </h3>
            <div
              className={`max-w-2xl text-center transition-all duration-500 ${
                isExpanded(items.length - 1)
                  ? 'mt-2 translate-y-0 opacity-100'
                  : 'pointer-events-none absolute h-0 translate-y-3 overflow-hidden opacity-0'
              }`}
              aria-hidden={!isExpanded(items.length - 1)}
            >
              <p className="text-sm leading-6 text-brand-black/70 sm:max-w-2xl">{last.body}</p>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
