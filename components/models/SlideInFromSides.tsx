'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Side = 'left' | 'right';

interface SlideInFromSidesProps {
  children: ReactNode;
  side: Side;
  className?: string;
  delay?: number;
}

export function SlideInFromSides({ children, side, className = '', delay = 0 }: SlideInFromSidesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => setVisible(true), delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [delay]);

  const fromLeft = side === 'left';
  const translateStart = fromLeft ? '-translate-x-[80%]' : 'translate-x-[80%]';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? 'translate-x-0 opacity-100' : `${translateStart} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}
