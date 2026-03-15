'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { HERO_IMAGE, MODEL_IMAGE_FALLBACKS, UPDATE_IMAGE_FALLBACKS } from '@/lib/config';

const visualTags = ['Exterior detail', 'Cabin quality', 'Daily usability'];

export function CuratedVisualsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(135deg,#0a0a0a_0%,#141414_36%,#1a1a1a_100%)] text-white"
    >
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="curated-orb-a absolute left-[-4rem] top-8 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="curated-orb-b absolute right-[-3rem] bottom-0 h-80 w-80 rounded-full bg-brand-blueLight/20 blur-3xl" />

      <div className="relative px-4 py-16 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)]">
          <div
            className={`grid gap-4 sm:grid-cols-2 transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <div className="relative min-h-[18rem] overflow-hidden sm:row-span-2 sm:min-h-[30rem]">
              <Image src={HERO_IMAGE} alt="Featured EV detail" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071f44]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Curated Visuals
                </p>
                <p className="mt-2 text-lg font-semibold">Modern EVs with a sharper urban presence.</p>
              </div>
            </div>
            <div className="relative min-h-[14rem] overflow-hidden">
              <Image
                src={MODEL_IMAGE_FALLBACKS[0]}
                alt="Imported EV exterior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
            <div className="relative min-h-[14rem] overflow-hidden">
              <Image
                src={MODEL_IMAGE_FALLBACKS[1]}
                alt="Second model exterior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
            <div className="relative min-h-[14rem] overflow-hidden sm:col-span-2">
              <Image
                src={UPDATE_IMAGE_FALLBACKS[0]}
                alt="EV interior detail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
          </div>

          <div
            className={`flex flex-col justify-center transition-all duration-1000 delay-150 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
              Curated Visuals
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
              Let the vehicles do more of the talking.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/76 sm:text-base md:text-lg">
              A stronger landing page needs visual rhythm. This image-led band breaks up the copy,
              shows product quality faster, and makes the page easier to scan before users read the
              deeper details.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {visualTags.map((label, index) => (
                <div
                  key={label}
                  className={`border border-white/10 bg-white/[0.08] px-4 py-4 text-sm font-medium text-white/88 shadow-[0_12px_26px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${250 + index * 120}ms` }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
