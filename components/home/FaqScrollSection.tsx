'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
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

function phaseOpacity(local: number) {
  if (local <= 0 || local >= 1) return 0;
  if (local < 0.14) return local / 0.14;
  if (local > 0.82) return (1 - local) / 0.18;
  return 1;
}

export function FaqScrollSection({ items }: { items: FAQItem[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const maxScroll = Math.max(rect.height - window.innerHeight, 1);
      setProgress(clamp(-rect.top / maxScroll, 0, 1));
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

  const carTrackMain = segmentProgress(progress, 0.04, 0.82);
  const carTrackFinal = easeOutCubic(segmentProgress(progress, 0.9, 0.08));
  const carY = -26 + carTrackMain * 88 + carTrackFinal * 22;
  const carFadeIn = segmentProgress(progress, 0.02, 0.08);
  const carFadeOut = 1 - segmentProgress(progress, 0.95, 0.05);
  const carOpacity = clamp(Math.min(carFadeIn, carFadeOut), 0, 1);

  return (
    <section
      ref={sectionRef}
      className="relative h-[430vh] overflow-clip bg-[linear-gradient(135deg,#f0f0f0_0%,#ffffff_40%,#f5f5f5_100%)] text-brand-blueDeep"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-[8%] top-8 h-48 w-48 rounded-full bg-brand-blueLight/16 blur-3xl" />
        <div className="absolute right-[8%] bottom-8 h-40 w-40 rounded-full bg-neutral-300/22 blur-3xl" />

        <div className="relative h-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid h-full items-center lg:grid-cols-2">
            <div className="relative h-[54vh] overflow-hidden border-r border-black/10 pr-5 sm:pr-8">
              {items.map((item, index) => {
                const start = 0.07 + index * 0.2;
                const local = segmentProgress(progress, start, 0.2);
                const move = -96 + easeOutCubic(local) * 96;
                const opacity = phaseOpacity(local);

                return (
                  <div
                    key={`q-${index}`}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity,
                      transform: `translate3d(${move}px,0,0)`
                    }}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-black/48">
                      Q0{index + 1}
                    </p>
                    <h3 className="mt-4 max-w-[22ch] text-[clamp(2rem,4.4vw,4.3rem)] font-semibold tracking-[-0.03em] leading-[1.04] text-black/92">
                      {item.question}
                    </h3>
                  </div>
                );
              })}
            </div>

            <div className="relative h-[54vh] overflow-hidden pl-5 sm:pl-8">
              {items.map((item, index) => {
                const start = 0.09 + index * 0.2;
                const local = segmentProgress(progress, start, 0.2);
                const move = 88 - easeOutCubic(local) * 88;
                const opacity = phaseOpacity(local);
                const scale = 0.96 + Math.min(local, 0.35) * 0.06;

                return (
                  <div
                    key={`a-${index}`}
                    className="absolute inset-0 flex items-center"
                    style={{
                      opacity,
                      transform: `translate3d(${move}px,0,0) scale(${scale})`
                    }}
                  >
                    <article className="relative max-w-[36rem] overflow-hidden rounded-2xl border border-black/12 bg-white/72 p-6 shadow-[0_16px_34px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-8">
                      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-brand-blueDeep/45 via-brand-blueDeep/20 to-transparent" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-blueDeep/55">
                        Answer
                      </p>
                      <p className="mt-3 text-[clamp(1rem,1.6vw,1.55rem)] leading-[1.7] text-brand-blueDeep/88">
                        {item.answer}
                      </p>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-1/2 z-30 w-[clamp(220px,24vw,430px)] -translate-x-1/2 transition-opacity duration-200"
            style={{
              top: `${carY}vh`,
              opacity: carOpacity
            }}
          >
            <Image
              src="/photos/models/honri_down.png"
              alt="HONRI top-down profile"
              width={520}
              height={1180}
              className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.24)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
