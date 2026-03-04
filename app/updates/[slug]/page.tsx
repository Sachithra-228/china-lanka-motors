import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { connectDb } from '@/lib/db';
import { UpdatePost } from '@/lib/models/UpdatePost';
import { BRAND_NAME, UPDATE_IMAGE_FALLBACKS } from '@/lib/config';

interface PageProps {
  params: { slug: string };
}

function getFallbackCoverImage(slug: string) {
  if (slug === 'upcoming-test-drive-weekend') {
    return UPDATE_IMAGE_FALLBACKS[1];
  }

  return UPDATE_IMAGE_FALLBACKS[0];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await connectDb();
  const post = await UpdatePost.findOne({ slug: params.slug }).lean();
  if (!post) {
    return {
      title: `${BRAND_NAME} | Update`,
      description: 'News and updates from China Lanka Motors.'
    };
  }
  return {
    title: `${BRAND_NAME} | ${post.title}`,
    description: post.excerpt
  };
}

async function getPost(slug: string) {
  await connectDb();
  const post = await UpdatePost.findOne({ slug }).lean();
  if (!post) return null;
  return JSON.parse(JSON.stringify(post));
}

export default async function UpdateDetailPage({ params }: PageProps) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const publishedDate =
    post.publishedAt &&
    new Date(post.publishedAt).toLocaleDateString('en-LK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  const coverImage = post.coverImage || getFallbackCoverImage(post.slug);

  return (
    <div className="container-padded py-10">
      <article className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blueDeep/80">
          {post.category}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-brand-blueDeep sm:text-3xl">
          {post.title}
        </h1>
        {publishedDate && (
          <p className="mt-1 text-xs text-brand-black/60">Published {publishedDate}</p>
        )}
        <p className="mt-3 text-sm text-brand-black/80">{post.excerpt}</p>
        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl bg-[#E0DACE]">
          <Image src={coverImage} alt={post.title} fill className="object-cover" />
        </div>
        <div className="prose mt-6 max-w-none text-sm leading-relaxed text-brand-black/85 prose-p:mb-3">
          {post.content.split('\n').map((line: string, idx: number) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
