import type { Metadata } from 'next';
import Link from 'next/link';
import { CuratedVisualsSection } from '@/components/common/CuratedVisualsSection';
import { FaqScrollSection } from '@/components/home/FaqScrollSection';
import { Hero } from '@/components/common/Hero';
import { HowItWorksScrollSection } from '@/components/home/HowItWorksScrollSection';
import { WhyCards } from '@/components/home/WhyCards';
import { BRAND_NAME } from '@/lib/config';

const whyItems = [
  {
    index: '01',
    title: 'Direct Import',
    body: 'We source directly from trusted partners in China, with full visibility on history, specs, and battery health.'
  },
  {
    index: '02',
    title: 'Transparent Pricing',
    body: 'Clear, upfront pricing with a simple breakdown of import duties, registration costs, and optional extras.'
  },
  {
    index: '03',
    title: 'After Sales Support',
    body: 'Guidance on service partners, parts, and software updates to keep your EV running smoothly.'
  },
  {
    index: '04',
    title: 'EV Guidance',
    body: 'Help with charging setups, realistic range expectations, and day-to-day EV ownership in Sri Lanka.'
  }
];

const processItems = [
  {
    step: '01',
    title: 'Choose Your EV',
    body: 'Compare the right model for your usage, range needs, charging access, and daily routes.'
  },
  {
    step: '02',
    title: 'Import & Paperwork',
    body: 'We guide the sourcing process, documentation, duties, and local registration requirements.'
  },
  {
    step: '03',
    title: 'Delivery & Setup',
    body: 'Before handover, we walk you through charging basics, controls, and practical ownership tips.'
  },
  {
    step: '04',
    title: 'After-Sales Guidance',
    body: 'You stay supported with battery health guidance, software advice, and service direction.'
  }
];

const faqItems = [
  {
    question: 'How long does charging usually take?',
    answer:
      'It depends on the vehicle and charger type, but we explain both overnight home charging and practical fast-charging expectations before you buy.'
  },
  {
    question: 'Can you help with registration and import paperwork?',
    answer:
      'Yes. We help you understand duties, documentation, and the local registration process so there are no major surprises later.'
  },
  {
    question: 'What is the real-world range I can expect?',
    answer:
      'We focus on realistic daily driving conditions in Sri Lanka, including traffic, air conditioning use, and your typical route patterns.'
  },
  {
    question: 'What happens after I take delivery?',
    answer:
      'You still get guidance on charging, battery care, software updates, and where to go for routine support and service.'
  }
];

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Drive Electric. Live Smarter.`,
  description:
    'China Lanka Motors brings modern electric vehicles to Sri Lanka - clean design, smart tech, and practical range for everyday life.'
};

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f5f5f5_42%,#eeeeee_100%)] text-brand-blueDeep">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-brand-blueLight/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-neutral-300/25 blur-3xl" />

        <div className="relative grid gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.85fr),minmax(0,1.15fr)] lg:px-10 xl:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-blueDeep/60">
              Why China Lanka Motors
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-brand-blueDeep sm:text-4xl md:text-5xl">
              A cleaner, smarter path into EV ownership.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-brand-blueDeep/74 sm:text-base md:text-lg">
              A boutique importer focused on vehicles that genuinely work for Sri Lankan drivers -
              from paperwork and policy to home charging and aftercare.
            </p>
            <div className="mt-24 sm:mt-28">
              <p className="honri-static" aria-label="HONRI">
                HONRI
              </p>
            </div>
          </div>

          <WhyCards items={whyItems} />
        </div>
      </section>

      <CuratedVisualsSection />

      <HowItWorksScrollSection items={processItems} />

      <FaqScrollSection items={faqItems} />

      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#0a0a0a_0%,#171717_45%,#1a1a1a_100%)] text-white">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="relative flex flex-col items-start gap-5 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10 xl:px-14">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Want to experience EV driving?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78 sm:text-base">
              Book a calm, one-on-one test drive with our team. We will walk you through range,
              charging options, and day-to-day ownership in Sri Lanka.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/test-drive"
              className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blueDeep transition hover:bg-neutral-100"
            >
              Book Test Drive
            </Link>
            <Link
              href="/models"
              className="rounded-full border border-white/20 bg-white/[0.08] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.12]"
            >
              View Models
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
