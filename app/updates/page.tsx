import type { Metadata } from 'next';
import { connectDb } from '@/lib/db';
import { UpdatePost } from '@/lib/models/UpdatePost';
import { UpdateCard } from '@/components/common/UpdateCard';
import { BRAND_NAME, UPDATE_IMAGE_FALLBACKS } from '@/lib/config';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Updates`,
  description:
    'Announcements, new arrivals, test drive events, and EV news relevant to Sri Lankan drivers.'
};

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
  const updates = await getUpdates();

  return (
    <div className="container-padded py-10">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blueDeep/80">
            Updates
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-brand-blueDeep sm:text-3xl">
            News and events from China Lanka Motors.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-brand-black/75">
            New arrivals, test drive days, and policy news that affects EV ownership in Sri Lanka.
          </p>
        </div>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {updates.length > 0 ? (
          updates.map((update: any, index: number) => (
            <UpdateCard
              key={update._id}
              slug={update.slug}
              title={update.title}
              category={update.category}
              excerpt={update.excerpt}
              image={update.coverImage || UPDATE_IMAGE_FALLBACKS[index % UPDATE_IMAGE_FALLBACKS.length]}
              publishedAt={update.publishedAt}
            />
          ))
        ) : (
          <>
            <UpdateCard
              slug="first-arrivals"
              title="Our first eight EVs have landed"
              category="News"
              excerpt="We have brought in a curated batch of eight modern EVs, ideal for urban and peri-urban Sri Lankan use. Detailed specs are now available."
              image={UPDATE_IMAGE_FALLBACKS[0]}
              publishedAt={new Date()}
            />
            <UpdateCard
              slug="upcoming-test-drive-weekend"
              title="Upcoming test drive weekend"
              category="Event"
              excerpt="We are planning a focused weekend for test drives in and around Colombo, with staggered slots and charging demonstrations."
              image={UPDATE_IMAGE_FALLBACKS[1]}
              publishedAt={new Date()}
            />
            <UpdateCard
              slug="policy-watch"
              title="EV policy watch in Sri Lanka"
              category="Update"
              excerpt="We track key policy and duty changes that impact EV ownership locally, and summarise what it means for you."
              image={UPDATE_IMAGE_FALLBACKS[0]}
              publishedAt={new Date()}
            />
          </>
        )}
      </section>

      <div className="mt-10 text-xs text-brand-black/55">
        For press or partnership enquiries, please reach out via the contact details in our footer.
      </div>
    </div>
  );
}
