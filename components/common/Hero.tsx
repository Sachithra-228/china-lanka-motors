'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HERO_IMAGE, HERO_VIDEO } from '@/lib/config';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function segmentProgress(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

export function Hero() {
  const videoSrc = encodeURI(HERO_VIDEO);
  const sceneRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const element = sceneRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollable = Math.max(element.offsetHeight - window.innerHeight, 1);
      const travelled = clamp(-rect.top, 0, scrollable);

      setProgress(travelled / scrollable);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const headingProgress = segmentProgress(progress, 0.06, 0.34);
  const carProgress = segmentProgress(progress, 0.3, 0.62);
  const bodyProgress = segmentProgress(progress, 0.58, 0.84);
  const ctaProgress = segmentProgress(progress, 0.72, 0.94);

  return (
    <>
      <section className="relative -mt-24 min-h-[108svh] overflow-hidden bg-black pt-24 text-white md:-mt-28 md:min-h-[116svh] md:pt-28">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_IMAGE}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:38px_38px]" />
      </section>

      <section ref={sceneRef} className="relative z-10 -mt-24 min-h-[220svh] bg-[#0a0a0a] text-white md:-mt-28">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(163,163,163,0.15),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.06),transparent_22%),linear-gradient(135deg,#0a0a0a_0%,#141414_48%,#0c0c0c_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:38px_38px]" />
          <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-white/10 via-white/5 to-transparent blur-2xl" />

          <div className="relative mx-auto grid h-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:px-8 md:py-14 lg:grid-cols-[minmax(0,0.95fr),minmax(0,1.05fr)] lg:items-center lg:px-10 xl:px-12">
            <div className="min-w-0">
              <div
                style={{
                  opacity: headingProgress,
                  transform: `translate3d(${(1 - headingProgress) * -110}px, 0, 0) scale(${0.88 + headingProgress * 0.12})`
                }}
                className="will-change-transform"
              >
                <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl xl:text-7xl">
                  Drive Electric.
                  <br />
                  <span className="hero-electric-text text-white">Live Smarter.</span>
                </h2>
              </div>

              <div
                style={{
                  opacity: bodyProgress,
                  transform: `translate3d(0, ${(1 - bodyProgress) * 42}px, 0)`
                }}
                className="will-change-transform"
              >
                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/78 sm:text-base md:text-lg">
                  China Lanka Motors delivers a modern EV experience built for Sri Lanka with quiet
                  cabins, efficient charging, smart connectivity, and practical everyday range.
                </p>
              </div>

              <div
                style={{
                  opacity: ctaProgress,
                  transform: `translate3d(0, ${(1 - ctaProgress) * 28}px, 0)`
                }}
                className="mt-8 flex flex-wrap items-center gap-3 will-change-transform"
              >
                <Link
                  href="/models"
                  className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blueDeep transition hover:bg-neutral-100"
                >
                  Browse Models
                </Link>
                <Link
                  href="/test-drive"
                  className="rounded-full border border-white/20 bg-white/[0.08] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/40 hover:bg-white/[0.12]"
                >
                  Book Test Drive
                </Link>
              </div>
            </div>

            <div className="relative min-h-[18rem] sm:min-h-[24rem] md:min-h-[30rem] lg:min-h-[36rem]">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent blur-3xl" />
              <div
                style={{
                  opacity: carProgress,
                  transform: `translate3d(${(1 - carProgress) * 160}px, 0, 0)`
                }}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={HERO_IMAGE}
                  alt="Featured China Lanka Motors vehicle"
                  fill
                  className="hero-image-float object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
