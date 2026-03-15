'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export type UpdatesShowcaseItem = {
  id: string;
  slug: string;
  title: string;
  category: 'News' | 'Event' | 'Update';
  excerpt: string;
  content: string;
  coverImage?: string | null;
  publishedAt?: string | null;
};

type UpdatesShowcaseProps = {
  updates: UpdatesShowcaseItem[];
};

const PAGE_SIZE = 6;

function formatDate(value?: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-LK', { year: 'numeric', month: 'short', day: 'numeric' });
}

function estimateReadMinutes(content: string, excerpt: string) {
  const source = (content || excerpt || '').trim();
  if (!source) return 2;
  const words = source.split(/\s+/).length;
  return Math.max(2, Math.round(words / 180));
}

export function UpdatesShowcase({ updates }: UpdatesShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'News' | 'Event' | 'Update'>('All');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(() => ['All', 'News', 'Event', 'Update'] as const, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return updates.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      if (!categoryMatch) return false;
      if (!search) return true;
      const haystack = `${item.title} ${item.excerpt} ${item.content}`.toLowerCase();
      return haystack.includes(search);
    });
  }, [updates, activeCategory, query]);

  const featured = filtered[0];
  const remaining = filtered.slice(1);
  const visible = remaining.slice(0, visibleCount);
  const hasMore = visibleCount < remaining.length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[linear-gradient(145deg,#eff2f8_0%,#f9fbff_44%,#edf1f8_100%)] text-brand-blueDeep">
      <div className="container-padded py-10 sm:py-12">
        <header className="max-w-3xl">
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Newsroom and events from China Lanka Motors.
          </h1>
          <p className="mt-4 text-sm leading-7 text-brand-blueDeep/76 sm:text-base">
            Track new arrivals, test-drive weekends, and EV policy changes in one place.
          </p>
        </header>

        <section className="mt-8 space-y-5">
          {featured && (
            <article className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/80 shadow-[0_18px_34px_rgba(0,0,0,0.08)]">
              {featured.coverImage && (
                <div className="relative aspect-[16/8] w-full bg-white">
                  <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="rounded-full bg-brand-blueDeep px-3 py-1 font-semibold uppercase tracking-[0.15em] text-white">
                    Featured
                  </span>
                  <span className="rounded-full bg-brand-blueLight/22 px-3 py-1 font-semibold uppercase tracking-[0.15em] text-brand-blueDeep">
                    {featured.category}
                  </span>
                  <span className="text-brand-blueDeep/60">{formatDate(featured.publishedAt)}</span>
                  <span className="text-brand-blueDeep/60">
                    {estimateReadMinutes(featured.content, featured.excerpt)} min read
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-brand-blueDeep/78 sm:text-base">
                  {featured.excerpt}
                </p>
                <Link
                  href={`/updates/${featured.slug}`}
                  className="mt-5 inline-flex rounded-full border border-brand-blueDeep/18 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blueDeep transition hover:bg-brand-blueDeep hover:text-white"
                >
                  Read Featured Update
                </Link>
              </div>
            </article>
          )}

          <div className="rounded-[1.2rem] border border-black/10 bg-white/76 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition ${
                    activeCategory === category
                      ? 'bg-brand-blueDeep text-white'
                      : 'bg-white text-brand-blueDeep/75 hover:bg-brand-blueLight/25'
                  }`}
                >
                  {category}
                </button>
              ))}
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Search updates..."
                className="ml-auto min-w-[170px] flex-1 rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-brand-blueDeep outline-none placeholder:text-brand-blueDeep/45 focus:border-brand-blueDeep/35"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[1.15rem] border border-black/10 bg-white/76 shadow-[0_12px_24px_rgba(0,0,0,0.06)]"
              >
                {item.coverImage && (
                  <div className="relative aspect-[16/10] w-full bg-white">
                    <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between text-[11px] text-brand-blueDeep/62">
                    <span className="rounded-full bg-brand-blueLight/24 px-3 py-1 font-semibold uppercase tracking-[0.14em] text-brand-blueDeep">
                      {item.category}
                    </span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-brand-blueDeep">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-blueDeep/77">{item.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-brand-blueDeep/56">
                      {estimateReadMinutes(item.content, item.excerpt)} min read
                    </span>
                    <Link
                      href={`/updates/${item.slug}`}
                      className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-blueDeep hover:text-brand-blueDeep/80"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="inline-flex rounded-full border border-brand-blueDeep/18 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blueDeep transition hover:bg-brand-blueDeep hover:text-white"
            >
              Load More
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
