'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const LINES = ['Built for Sri Lanka.', 'Practical range.', 'Calm cabins.', 'Real support.'];

export function ModelsHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LINES.length);
    }, 2200);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  const nextLine = LINES[(activeIndex + 1) % LINES.length];

  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-8 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 right-12 h-96 w-96 rounded-full bg-white/8 blur-3xl" />
      </div>

      <div className="container-padded relative z-10 grid min-h-[calc(100vh-5rem)] items-center gap-10 py-10 md:grid-cols-[1.2fr_0.8fr] md:gap-10 md:py-16">
        <div className="relative mx-auto w-full max-w-2xl md:max-w-[66rem]">
          <div className="hero-image-float relative transition-transform duration-700 ease-out hover:scale-[1.05]">
            <Image
              src="/photos/hero/hero_section_new.png"
              alt="China Lanka Motors model"
              width={1200}
              height={720}
              priority
              className="h-auto w-full scale-[1.08] origin-center transform-gpu object-contain saturate-[1.05] contrast-[1.04] drop-shadow-[0_34px_52px_rgba(0,0,0,0.5)] motion-safe:animate-[floatSlow_7s_ease-in-out_infinite]"
              sizes="(max-width: 768px) 96vw, 60vw"
            />
          </div>
        </div>

        <div className="justify-self-end text-right md:pr-6">
          <p className="text-[clamp(2.6rem,4.8vw,4.9rem)] font-semibold leading-tight tracking-tight text-white motion-safe:animate-[fadeSlideIn_900ms_ease-out_forwards]">
            {LINES[activeIndex]}
          </p>
          <p className="mt-8 text-[clamp(2.1rem,3.9vw,4.1rem)] font-semibold leading-tight tracking-tight text-white/70 motion-safe:animate-[fadeSlideInDelayed_1100ms_ease-out_forwards]">
            {nextLine}
          </p>
        </div>
      </div>
    </section>
  );
}
