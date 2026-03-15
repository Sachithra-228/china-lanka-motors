'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type WheelEvent } from 'react';
import { HERO_IMAGE, MODEL_IMAGE_FALLBACKS, UPDATE_IMAGE_FALLBACKS } from '@/lib/config';

const GALLERY_IMAGES = [
  HERO_IMAGE,
  MODEL_IMAGE_FALLBACKS[0],
  MODEL_IMAGE_FALLBACKS[1],
  UPDATE_IMAGE_FALLBACKS[0],
  UPDATE_IMAGE_FALLBACKS[1],
  MODEL_IMAGE_FALLBACKS[0],
  HERO_IMAGE
];

export function CuratedVisualsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelCooldownRef = useRef(0);
  const dragStartXRef = useRef<number | null>(null);
  const dragDeltaRef = useRef(0);

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

  const total = GALLERY_IMAGES.length;

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const getOffset = (index: number) => {
    const raw = index - activeIndex;
    if (raw > total / 2) return raw - total;
    if (raw < -total / 2) return raw + total;
    return raw;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    const now = Date.now();
    if (now < wheelCooldownRef.current) return;

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 16) return;

    if (delta > 0) {
      goNext();
    } else {
      goPrev();
    }

    wheelCooldownRef.current = now + 220;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(135deg,#f0f0f0_0%,#ffffff_42%,#f4f4f4_100%)] text-brand-blueDeep"
    >
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="curated-orb-a absolute left-[-4rem] top-8 h-72 w-72 rounded-full bg-brand-blueLight/16 blur-3xl" />
      <div className="curated-orb-b absolute right-[-3rem] bottom-0 h-80 w-80 rounded-full bg-neutral-300/28 blur-3xl" />

      <div className="relative px-4 py-20 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex flex-col items-center justify-center">
          <div
            className="relative mt-2 h-[clamp(240px,42vw,390px)] w-full max-w-6xl overflow-visible [perspective:1400px]"
            onWheel={handleWheel}
            onPointerDown={(e) => {
              dragStartXRef.current = e.clientX;
              dragDeltaRef.current = 0;
            }}
            onPointerMove={(e) => {
              if (dragStartXRef.current == null) return;
              dragDeltaRef.current = e.clientX - dragStartXRef.current;
            }}
            onPointerUp={() => {
              if (dragStartXRef.current == null) return;
              const delta = dragDeltaRef.current;
              dragStartXRef.current = null;
              dragDeltaRef.current = 0;
              const threshold = 60;
              if (delta > threshold) {
                goPrev();
              } else if (delta < -threshold) {
                goNext();
              }
            }}
          >
            <div
              className={`relative h-full transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {GALLERY_IMAGES.map((src, index) => {
                const offset = getOffset(index);
                const isActive = offset === 0;
                const absOffset = Math.abs(offset);

                const baseScale = isActive ? 1 : absOffset === 1 ? 0.83 : 0.66;
                const translateX = offset * 238;
                const rotateY = isActive ? 0 : offset > 0 ? -26 : 26;
                const blurClass = !isActive && absOffset > 1 ? 'blur-[1.2px]' : '';

                return (
                  <div
                    key={`${src}-card-${index}`}
                    className={`absolute left-1/2 top-1/2 h-[clamp(210px,36vw,360px)] w-[clamp(320px,64vw,560px)] cursor-pointer overflow-hidden rounded-[2.1rem] bg-black/70 ring-1 ring-white/12 transition-[transform,filter,opacity,box-shadow] duration-500 ${blurClass}`}
                    style={{
                      transform: `translateX(calc(-50% + ${translateX}px)) translateY(-50%) scale(${baseScale}) rotateY(${rotateY}deg)`,
                      zIndex: isActive ? 20 : 20 - absOffset,
                      opacity: absOffset > 2 ? 0 : 1,
                      boxShadow: isActive
                        ? '0 40px 88px rgba(0,0,0,0.82)'
                        : '0 22px 54px rgba(0,0,0,0.58)'
                    }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <Image src={src} alt={`Vehicle slide ${index + 1}`} fill className="object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.26),transparent_52%),linear-gradient(to_top,rgba(0,0,0,0.45),transparent_48%)]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
