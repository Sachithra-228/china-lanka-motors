import type { Metadata } from 'next';
import Link from 'next/link';
import { CuratedVisualsSection } from '@/components/common/CuratedVisualsSection';
import { Hero } from '@/components/common/Hero';
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

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f5f8fe_42%,#eef4fc_100%)] text-brand-blueDeep">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(74,112,169,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(74,112,169,0.06)_1px,transparent_1px)] [background-size:30px_30px]" />
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-brand-blueLight/18 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-200/18 blur-3xl" />

        <div className="relative grid gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.1fr)] lg:px-10 xl:px-14">
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyItems.map((item) => (
              <article
                key={item.title}
                className="relative overflow-hidden border border-brand-blueDeep/8 bg-white/78 p-5 shadow-[0_18px_40px_rgba(74,112,169,0.08)] transition hover:border-brand-blueLight/30 hover:-translate-y-1"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-brand-blueLight to-transparent" />
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blueDeep/45">
                  {item.index}
                </div>
                <h3 className="mt-4 text-base font-semibold text-brand-blueDeep">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-black/70">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CuratedVisualsSection />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#eef6ff_0%,#ffffff_38%,#edf5ff_100%)] text-brand-blueDeep">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(74,112,169,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(74,112,169,0.07)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="how-bubble-a absolute left-[8%] top-12 h-28 w-28 rounded-full bg-brand-blueLight/16 blur-2xl" />
        <div className="how-bubble-b absolute right-[12%] top-20 h-24 w-24 rounded-full bg-cyan-200/20 blur-2xl" />
        <div className="how-bubble-c absolute bottom-10 left-1/3 h-20 w-20 rounded-full bg-brand-blueLight/14 blur-2xl" />

        <div className="relative px-4 py-16 sm:px-6 lg:px-10 xl:px-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-blueDeep/70">
              How It Works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-5xl">
              A simple import-to-delivery journey.
            </h2>
            <p className="mt-5 text-sm leading-7 text-brand-blueDeep/75 sm:text-base md:text-lg">
              We keep the process structured, transparent, and calm from your first enquiry to
              handover and after-sales support.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {processItems.map((item) => (
              <article
                key={item.step}
                className="relative overflow-hidden border border-white/10 bg-[linear-gradient(160deg,#123b74_0%,#1a4d8b_55%,#0f3366_100%)] p-6 text-white shadow-[0_18px_38px_rgba(24,63,121,0.2)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-white/80 to-brand-blueLight" />
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100/60">
                  Step {item.step}
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100/78">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#edf6ff_0%,#dceafb_35%,#f8fbff_100%)] text-brand-blueDeep">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(74,112,169,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(74,112,169,0.07)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-[8%] top-8 h-48 w-48 rounded-full bg-brand-blueLight/18 blur-3xl" />
        <div className="absolute right-[10%] top-12 h-44 w-44 rounded-full bg-cyan-200/22 blur-3xl" />
        <div className="absolute bottom-8 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-brand-blueLight/14 blur-3xl" />

        <div className="relative px-4 py-16 text-center sm:px-6 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-blueDeep/70">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-5xl">
              Common questions from first-time EV buyers.
            </h2>
            <p className="mt-5 text-sm leading-7 text-brand-blueDeep/75 sm:text-base md:text-lg">
              The right answers early on make EV ownership much easier. Open a question to see the
              details.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl overflow-hidden border border-white/12 bg-[#0d2c5a]/55 shadow-[0_18px_38px_rgba(15,49,95,0.2)] backdrop-blur-xl">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="group border-b border-white/10 last:border-b-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                  <div className="flex-1 text-center">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-100/55">
                      Q0{index + 1}
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-white">{item.question}</h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.08] text-xl font-light text-cyan-200 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-white/10 bg-[#0a2348]/28 px-5 py-5 text-center text-sm leading-7 text-blue-50">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#0b234a_0%,#103562_45%,#1b4a85_100%)] text-white">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="relative flex flex-col items-start gap-5 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10 xl:px-14">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Want to experience EV driving?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100/78 sm:text-base">
              Book a calm, one-on-one test drive with our team. We will walk you through range,
              charging options, and day-to-day ownership in Sri Lanka.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/test-drive"
              className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blueDeep transition hover:bg-blue-50"
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
