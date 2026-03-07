import type { Metadata } from 'next';
import { ArticleCard } from '@/components/common/ArticleCard';
import { BRAND_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | EV Lifestyle`,
  description:
    'Guides to EV basics, charging, range, maintenance, and total cost of ownership in Sri Lanka.'
};

const articles = [
  {
    slug: 'ev-basics',
    title: 'EV Basics in Sri Lanka',
    excerpt:
      'What to know before moving to an electric vehicle locally — from registration and duties to everyday use.',
    tags: ['Basics', 'Policy', 'Ownership']
  },
  {
    slug: 'charging-guide',
    title: 'Charging Guide',
    excerpt:
      'How home charging works, what you really need installed, and how to use public chargers with confidence.',
    tags: ['Charging', 'Home', 'Public']
  },
  {
    slug: 'range-tips',
    title: 'Range Tips',
    excerpt:
      'Simple habits that help you get the most realistic range on Sri Lankan roads and in our climate.',
    tags: ['Range', 'Driving']
  },
  {
    slug: 'maintenance',
    title: 'Maintenance',
    excerpt:
      'What EV maintenance actually looks like compared to petrol vehicles, and how to think about long-term care.',
    tags: ['Maintenance']
  },
  {
    slug: 'cost-vs-petrol',
    title: 'Cost breakdown vs petrol',
    excerpt:
      'A clear view of electricity vs petrol costs, with example commuting profiles in Sri Lanka.',
    tags: ['Costs', 'Comparison']
  }
];

export default function EvLifestylePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-blueDeep">
      <div className="container-padded py-10">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            EV Lifestyle
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Living with an EV in Sri Lanka.
          </h1>
          <p className="mt-3 text-sm text-white/85">
            Short, practical guides on how electric vehicles fit into Sri Lankan life — from home
            charging and range to cost and maintenance.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            tags={article.tags}
          />
        ))}
        </section>

        <section className="mt-12 space-y-8 text-sm leading-relaxed text-white/90">
          <article id="ev-basics" className="card p-5">
            <h2 className="text-base font-semibold text-brand-blueDeep">EV Basics in Sri Lanka</h2>
          <p className="mt-2 text-xs">
            EV adoption in Sri Lanka is still early, but growing. When you look beyond the jargon,
            it comes down to three things: how you charge, how far you drive, and how policy affects
            pricing. We stay on top of regulations and duty structures so you can focus on choosing
            the right car.
          </p>
        </article>

          <article id="charging-guide" className="card p-5">
            <h2 className="text-base font-semibold text-brand-blueDeep">Charging Guide</h2>
            <p className="mt-2 text-xs">
              Most owners rely on overnight AC charging at home. We&apos;ll help you understand
              what&apos;s realistic with your wiring, what a safe setup looks like, and how to plan
              occasional top-ups at public DC chargers.
            </p>
          </article>

          <article id="range-tips" className="card p-5">
            <h2 className="text-base font-semibold text-brand-blueDeep">Range Tips</h2>
            <p className="mt-2 text-xs">
              Range varies with speed, traffic, elevation, and air conditioning. We share real-world
              patterns from urban, suburban, and outstation driving to help you plan comfortably.
            </p>
          </article>

          <article id="maintenance" className="card p-5">
            <h2 className="text-base font-semibold text-brand-blueDeep">Maintenance</h2>
            <p className="mt-2 text-xs">
              EVs have far fewer moving parts than petrol vehicles. You&apos;ll still need tyres,
              brakes, and cabin filters — but oil changes disappear. We connect you to workshops
              familiar with EV systems where needed.
            </p>
          </article>

          <article id="cost-vs-petrol" className="card p-5">
            <h2 className="text-base font-semibold text-brand-blueDeep">Cost breakdown vs petrol</h2>
            <p className="mt-2 text-xs">
              We can walk you through example monthly running costs that factor in local electricity
              tariffs, typical daily distance, and occasional fast charging, compared to an equivalent
              petrol vehicle.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

