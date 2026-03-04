import Link from 'next/link';

export interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

export function ArticleCard({ slug, title, excerpt, tags }: ArticleCardProps) {
  return (
    <article className="card card-hover flex flex-col p-4">
      <div className="mb-2 flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="badge bg-brand-blueLight/15 text-[10px] font-medium text-brand-blueDeep/90"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-sm font-semibold text-brand-blueDeep">{title}</h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-brand-black/75">{excerpt}</p>
      <Link
        href={`/ev-lifestyle#${slug}`}
        className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blueDeep hover:text-brand-blueDeep/80"
      >
        Read article
      </Link>
    </article>
  );
}

