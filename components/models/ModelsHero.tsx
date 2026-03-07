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
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#4d73ab]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-8 h-72 w-72 rounded-full bg-[#6f95cf]/25 blur-3xl" />
        <div className="absolute -bottom-24 right-12 h-96 w-96 rounded-full bg-[#365d97]/35 blur-3xl" />
      </div>

      <div className="container-padded relative z-10 grid min-h-[calc(100vh-5rem)] items-center gap-10 py-10 md:grid-cols-[1.12fr_0.88fr] md:gap-8 md:py-14">
        <div className="relative mx-auto w-full max-w-xl md:max-w-[58rem]">
          <div className="hero-image-float relative">
            <Image
              src="/photos/hero/hero_section_new.png"
              alt="China Lanka Motors model"
              width={960}
              height={600}
              priority
              className="h-auto w-full scale-[1.04] object-contain saturate-[1.05] contrast-[1.04] drop-shadow-[0_28px_40px_rgba(12,31,64,0.42)]"
              sizes="(max-width: 768px) 92vw, 55vw"
            />
          </div>
        </div>

        <div className="justify-self-end text-right md:pr-4">
          <p className="text-[clamp(2.1rem,4.2vw,4.35rem)] font-semibold leading-tight tracking-tight text-white">
            {LINES[activeIndex]}
          </p>
          <p className="mt-8 text-[clamp(1.8rem,3.5vw,3.55rem)] font-semibold leading-tight tracking-tight text-[#88a7d5]">
            {nextLine}
          </p>
        </div>
      </div>
    </section>
  );
}
