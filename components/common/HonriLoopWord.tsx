'use client';

import { useEffect, useState } from 'react';

const LETTERS = ['H', 'O', 'N', 'R', 'I'] as const;

const LETTER_STAGGER_MS = 700;
const LETTER_IN_MS = 700;
const HOLD_FULL_MS = 1600;
const FADE_OUT_MS = 900;
const RESET_GAP_MS = 260;

const APPEAR_TOTAL_MS = (LETTERS.length - 1) * LETTER_STAGGER_MS + LETTER_IN_MS;
const FADE_START_MS = APPEAR_TOTAL_MS + HOLD_FULL_MS;
const CYCLE_MS = FADE_START_MS + FADE_OUT_MS + RESET_GAP_MS;

export function HonriLoopWord() {
  const [cycle, setCycle] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setFading(false);

    const fadeTimer = window.setTimeout(() => {
      setFading(true);
    }, FADE_START_MS);

    const cycleTimer = window.setTimeout(() => {
      setCycle((prev) => prev + 1);
    }, CYCLE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(cycleTimer);
    };
  }, [cycle]);

  return (
    <div className={`honri-loop ${fading ? 'honri-loop-fading' : ''}`} aria-label="HONRI">
      {LETTERS.map((letter, index) => (
        <span
          key={`${cycle}-${letter}-${index}`}
          className="honri-char"
          style={{
            animationDelay: `${index * LETTER_STAGGER_MS}ms`,
            animationDuration: `${LETTER_IN_MS}ms`
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
