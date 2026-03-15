import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | EV Lifestyle`,
  description:
    'Guides to EV basics, charging, range, maintenance, and total cost of ownership in Sri Lanka.'
};

const highlights = [
  {
    title: 'Fast Charging',
    body: 'Deliver up to 150 kW of power with practical charging sessions under 30 minutes.'
  },
  {
    title: 'Digital Monitoring',
    body: 'Track charge status and route energy usage through simple app-based controls.'
  },
  {
    title: 'Daily Convenience',
    body: 'Charge at home overnight and use public top-ups only when your route needs it.'
  }
];

const lifestyleFlow = [
  {
    title: 'Overnight Home Charge',
    body: 'Start each day with a full battery using reliable home charging.'
  },
  {
    title: 'Smart Route Planning',
    body: 'Use regenerative driving and route-aware planning for smoother range control.'
  },
  {
    title: 'Midday Top-Up Only If Needed',
    body: 'Public charging becomes optional support, not a daily requirement.'
  },
  {
    title: 'Simple Monthly Running Cost',
    body: 'Lower fuel and service overheads keep EV ownership predictable.'
  }
];

export default function EvLifestylePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[linear-gradient(140deg,#edf0f6_0%,#f8faff_44%,#eef1f8_100%)] text-brand-blueDeep">
      <section className="relative min-h-[74vh] overflow-hidden border-b border-black/8">
        <Image
          src="/photos/models/ev_lifestyle.png"
          alt="EV lifestyle hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,248,255,0.93)_0%,rgba(245,248,255,0.78)_34%,rgba(245,248,255,0.15)_66%,rgba(245,248,255,0.05)_100%)]" />
        <div className="container-padded relative flex min-h-[74vh] items-end pb-12 pt-24 sm:pb-14 sm:pt-28 lg:pb-16 lg:pt-32">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blueDeep/62">
              EV Lifestyle
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-brand-blueDeep sm:text-5xl lg:text-6xl">
              Fueling the Next Electric Era.
            </h1>
            <p className="mt-5 text-sm leading-7 text-brand-blueDeep/78 sm:text-base">
              Charging that fits seamlessly into your life, with reliable EV support for daily
              driving in Sri Lanka.
            </p>
            <Link
              href="/test-drive"
              className="mt-7 inline-flex rounded-full bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black/85"
            >
              Book Test Drive
            </Link>
          </div>
        </div>
      </section>

      <div className="container-padded py-10 sm:py-12">
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr),minmax(0,0.85fr)]">
          <article className="relative overflow-hidden rounded-[1.6rem] border border-black/10 bg-[linear-gradient(145deg,#ffffff_0%,#f2f6ff_58%,#ffffff_100%)] p-6 shadow-[0_18px_34px_rgba(0,0,0,0.08)] sm:p-8">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blueDeep/55">
                EV Lifestyle Rhythm
              </p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.03em] text-brand-blueDeep sm:text-3xl">
                A cleaner day-to-day routine around your EV.
              </h2>
              <div className="mt-7 space-y-3">
                {lifestyleFlow.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-black/8 bg-white/70 p-4 backdrop-blur-sm"
                    style={{
                      animation: 'fadeSlideIn 700ms ease-out both',
                      animationDelay: `${index * 120}ms`
                    }}
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blueDeep text-[11px] font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-brand-blueDeep">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-brand-blueDeep/74">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {highlights.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[1.2rem] border border-black/10 bg-white/72 p-5 shadow-[0_14px_26px_rgba(0,0,0,0.06)] backdrop-blur-sm"
                style={{
                  animation: `floatSlow ${6 + index * 0.7}s ease-in-out infinite`,
                  animationDelay: `${index * 220}ms`
                }}
              >
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-brand-blueDeep">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-brand-blueDeep/80">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
