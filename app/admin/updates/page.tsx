import { AdminLayout } from '@/components/admin/AdminLayout';
import { connectDb } from '@/lib/db';
import { UpdatePost } from '@/lib/models/UpdatePost';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

async function getUpdates() {
  try {
    await connectDb();
    const posts = await UpdatePost.find({}).sort({ createdAt: -1 }).lean();
    return { posts: JSON.parse(JSON.stringify(posts)), dbReady: true };
  } catch {
    return { posts: [], dbReady: false };
  }
}

async function saveUpdate(formData: FormData) {
  'use server';
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '');
  const slug = String(formData.get('slug') || '');
  const category = String(formData.get('category') || 'News') as any;
  const excerpt = String(formData.get('excerpt') || '');
  const content = String(formData.get('content') || '');

  try {
    await connectDb();
  } catch {
    return;
  }

  if (id && id !== 'new') {
    await UpdatePost.findByIdAndUpdate(id, {
      title,
      slug,
      category,
      excerpt,
      content,
      publishedAt: new Date()
    });
  } else {
    await UpdatePost.create({
      title,
      slug,
      category,
      excerpt,
      content,
      publishedAt: new Date()
    });
  }

  revalidatePath('/updates');
  revalidatePath('/admin/updates');
}

export default async function AdminUpdatesPage() {
  const { posts: updates, dbReady } = await getUpdates();

  return (
    <AdminLayout>
      <h1 className="text-base font-semibold text-brand-blueDeep">Updates</h1>
      <p className="mt-1 text-xs text-brand-black/70">
        Create and edit news, events, and policy updates that appear on the public site.
      </p>
      {!dbReady && (
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
          Database is not connected. Add <code>MONGODB_URI</code> in Vercel project environment variables.
        </div>
      )}

      <div className="mt-5 space-y-4 text-xs">
        {[{ _id: 'new', title: '', slug: '', category: 'News', excerpt: '', content: '' }, ...updates].map(
          (post: any) => (
            <form key={post._id} action={saveUpdate} className="card p-4">
              <input type="hidden" name="id" defaultValue={post._id} />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blueDeep/80">
                    {post._id === 'new' ? 'Create update' : 'Edit update'}
                  </p>
                  {post.title && (
                    <p className="mt-1 text-sm font-semibold text-brand-blueDeep">{post.title}</p>
                  )}
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`title-${post._id}`}>
                    Title
                  </label>
                  <input
                    id={`title-${post._id}`}
                    name="title"
                    defaultValue={post.title}
                    required={post._id === 'new'}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`slug-${post._id}`}>
                    Slug
                  </label>
                  <input
                    id={`slug-${post._id}`}
                    name="slug"
                    defaultValue={post.slug}
                    required={post._id === 'new'}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`category-${post._id}`}>
                    Category
                  </label>
                  <select
                    id={`category-${post._id}`}
                    name="category"
                    defaultValue={post.category}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  >
                    <option value="News">News</option>
                    <option value="Event">Event</option>
                    <option value="Update">Update</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`excerpt-${post._id}`}>
                    Excerpt
                  </label>
                  <textarea
                    id={`excerpt-${post._id}`}
                    name="excerpt"
                    rows={2}
                    defaultValue={post.excerpt}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`content-${post._id}`}>
                    Content (basic text or markdown)
                  </label>
                  <textarea
                    id={`content-${post._id}`}
                    name="content"
                    rows={5}
                    defaultValue={post.content}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 rounded-full bg-brand-blueDeep px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-blueDeep/95"
              >
                Save
              </button>
            </form>
          )
        )}
      </div>
    </AdminLayout>
  );
}

