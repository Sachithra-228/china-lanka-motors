'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type ProcessItem = {
  step: string;
  title: string;
  body: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(t: number) {
  const p = clamp(t, 0, 1);
  return 1 - Math.pow(1 - p, 3);
}

function segmentProgress(progress: number, start: number, duration: number) {
  return clamp((progress - start) / duration, 0, 1);
}

export function HowItWorksScrollSection({ items }: { items: ProcessItem[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const maxScroll = Math.max(rect.height - window.innerHeight, 1);
      const raw = -rect.top / maxScroll;
      setProgress(clamp(raw, 0, 1));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const carApproach = easeOutCubic(segmentProgress(progress, 0.06, 0.2));
  const carHoldDrift = segmentProgress(progress, 0.28, 0.46);
  const carExitRaw = segmentProgress(progress, 0.8, 0.2);
  const carExit = Math.pow(carExitRaw, 1.65);
  const carXvw = 112 - carApproach * 90 - carHoldDrift * 34 - carExit * 150;
  const carFadeIn = segmentProgress(progress, 0.03, 0.08);
  const carFadeOut = 1 - segmentProgress(progress, 0.95, 0.05);
  const carOpacity = clamp(Math.min(carFadeIn, carFadeOut), 0, 1);
  const sloganShift = 20 - easeOutCubic(segmentProgress(progress, 0.04, 0.9)) * 36;

  return (
    <section
      ref={sectionRef}
      className="relative h-[440vh] overflow-clip bg-[linear-gradient(135deg,#ececec_0%,#f7f7f7_42%,#ececec_100%)] text-brand-blueDeep"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />

        <div className="relative h-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="relative h-full">
            <div
              className="pointer-events-none absolute left-0 top-[6%] z-10 whitespace-nowrap text-[clamp(4rem,12.5vw,10.5rem)] font-semibold uppercase leading-[0.78] tracking-[0.03em] text-black/[0.11]"
              style={{ transform: `translateX(${sloganShift}vw)` }}
            >
              <span className="block">Choose The Color</span>
              <span className="block">Of Your Dreams</span>
            </div>

            {items.map((item, index) => {
              const segmentStart = 0.08 + index * 0.18;
              const local = segmentProgress(progress, segmentStart, 0.17);
              const travel = easeOutCubic(local);
              const x = -58 + travel * 122;
              const y = 24;

              let opacity = 0;
              if (local > 0 && local < 1) {
                if (local < 0.1) {
                  opacity = local / 0.1;
                } else if (local > 0.8) {
                  opacity = (1 - local) / 0.2;
                } else {
                  opacity = 1;
                }
              }

              const scale = 0.96 + Math.min(local, 0.35) * 0.08;

              return (
                <div
                  key={item.step}
                  className="absolute z-20 w-[min(92vw,740px)]"
                  style={{
                    left: `${x}vw`,
                    top: `${y}%`,
                    opacity,
                    transform: `translate3d(0,0,0) scale(${scale})`
                  }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-black/45">
                    Step {item.step}
                  </p>
                  <h3 className="mt-2 text-[clamp(2rem,4.7vw,4.3rem)] font-semibold tracking-[-0.03em] text-black/90">
                    {item.title}
                  </h3>
                </div>
              );
            })}

            <div
              className="pointer-events-none absolute bottom-[-8%] z-30 w-[clamp(340px,55vw,980px)] transition-opacity duration-200"
              style={{
                left: `${carXvw}vw`,
                opacity: carOpacity
              }}
            >
              <Image
                src="/photos/models/honri_side.png"
                alt="HONRI side profile"
                width={1400}
                height={620}
                className="h-auto w-full object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.26)]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
