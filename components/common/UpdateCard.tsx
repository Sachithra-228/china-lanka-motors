import Image from 'next/image';
import Link from 'next/link';

export interface UpdateCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image?: string | null;
  publishedAt?: Date | string | null;
}

export function UpdateCard({
  slug,
  title,
  category,
  excerpt,
  image,
  publishedAt
}: UpdateCardProps) {
  const dateLabel =
    publishedAt instanceof Date
      ? publishedAt.toLocaleDateString('en-LK', { year: 'numeric', month: 'short', day: 'numeric' })
      : publishedAt || '';

  return (
    <article className="card card-hover flex flex-col overflow-hidden">
      {image && (
        <div className="relative aspect-[16/10] w-full bg-[#E0DACE]">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-[11px] text-brand-black/65">
          <span className="rounded-full bg-brand-blueLight/20 px-3 py-1 font-medium text-brand-blueDeep">
            {category}
          </span>
          {dateLabel && <span>{dateLabel}</span>}
        </div>
        <h3 className="mt-3 text-sm font-semibold text-brand-blueDeep">{title}</h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-brand-black/75">{excerpt}</p>
        <Link
          href={`/updates/${slug}`}
          className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blueDeep hover:text-brand-blueDeep/80"
        >
          Read update
        </Link>
      </div>
    </article>
  );
}
