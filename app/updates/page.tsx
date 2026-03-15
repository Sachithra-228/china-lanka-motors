import type { Metadata } from 'next';
import { connectDb } from '@/lib/db';
import { UpdatesShowcase, type UpdatesShowcaseItem } from '@/components/home/UpdatesShowcase';
import { UpdatePost } from '@/lib/models/UpdatePost';
import { BRAND_NAME, UPDATE_IMAGE_FALLBACKS } from '@/lib/config';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Updates`,
  description:
    'Announcements, new arrivals, test drive events, and EV news relevant to Sri Lankan drivers.'
};

const fallbackUpdates: UpdatesShowcaseItem[] = [
  {
    id: 'fallback-1',
    slug: 'first-arrivals',
    title: 'Our first eight EVs have landed',
    category: 'News',
    excerpt:
      'We have brought in a curated batch of eight modern EVs, ideal for urban and peri-urban Sri Lankan use. Detailed specs are now available.',
    content:
      'We have brought in a curated batch of eight modern EVs, ideal for urban and peri-urban Sri Lankan use. Detailed specs are now available.',
    coverImage: UPDATE_IMAGE_FALLBACKS[0],
    publishedAt: new Date().toISOString()
  },
  {
    id: 'fallback-2',
    slug: 'upcoming-test-drive-weekend',
    title: 'Upcoming test drive weekend',
    category: 'Event',
    excerpt:
      'We are planning a focused weekend for test drives in and around Colombo, with staggered slots and charging demonstrations.',
    content:
      'We are planning a focused weekend for test drives in and around Colombo, with staggered slots and charging demonstrations.',
    coverImage: UPDATE_IMAGE_FALLBACKS[1],
    publishedAt: new Date().toISOString()
  },
  {
    id: 'fallback-3',
    slug: 'policy-watch',
    title: 'EV policy watch in Sri Lanka',
    category: 'Update',
    excerpt:
      'We track key policy and duty changes that impact EV ownership locally, and summarise what it means for you.',
    content:
      'We track key policy and duty changes that impact EV ownership locally, and summarise what it means for you.',
    coverImage: UPDATE_IMAGE_FALLBACKS[0],
    publishedAt: new Date().toISOString()
  }
];

async function getUpdates() {
  try {
    await connectDb();
    const posts = await UpdatePost.find({}).sort({ publishedAt: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}

export default async function UpdatesPage() {
  const updatesRaw = await getUpdates();

  const updates: UpdatesShowcaseItem[] =
    updatesRaw.length > 0
      ? updatesRaw.map((update: any, index: number) => ({
          id: String(update._id || update.slug || index),
          slug: update.slug,
          title: update.title,
          category: update.category,
          excerpt: update.excerpt,
          content: update.content || update.excerpt,
          coverImage: update.coverImage || UPDATE_IMAGE_FALLBACKS[index % UPDATE_IMAGE_FALLBACKS.length],
          publishedAt: update.publishedAt
            ? new Date(update.publishedAt).toISOString()
            : update.createdAt
              ? new Date(update.createdAt).toISOString()
              : null
        }))
      : fallbackUpdates;

  return <UpdatesShowcase updates={updates} />;
}
