import { AdminLayout } from '@/components/admin/AdminLayout';
import { connectDb } from '@/lib/db';
import { VehicleModel } from '@/lib/models/Model';
import { revalidatePath } from 'next/cache';

async function getModels() {
  await connectDb();
  const models = await VehicleModel.find({}).sort({ createdAt: 1 }).lean();
  return JSON.parse(JSON.stringify(models));
}

async function saveModel(formData: FormData) {
  'use server';
  const id = String(formData.get('id') || '');
  const name = String(formData.get('name') || '');
  const slug = String(formData.get('slug') || '');
  const priceLabel = String(formData.get('priceLabel') || '');
  const rangeKm = Number(formData.get('rangeKm') || 0) || undefined;
  const chargeTime = String(formData.get('chargeTime') || '');
  const highlightsRaw = String(formData.get('highlights') || '');

  await connectDb();

  const highlights = highlightsRaw
    .split('\n')
    .map((h) => h.trim())
    .filter(Boolean);

  if (id && id !== 'new') {
    await VehicleModel.findByIdAndUpdate(id, {
      name,
      slug,
      priceLabel,
      rangeKm,
      chargeTime,
      highlights
    });
  } else {
    await VehicleModel.create({
      name,
      slug,
      priceLabel,
      rangeKm,
      chargeTime,
      highlights,
      specs: {},
      images: [],
      isPublished: true
    });
  }

  revalidatePath('/models');
  revalidatePath('/admin/models');
}

export default async function AdminModelsPage() {
  const models = await getModels();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-semibold text-brand-blueDeep">Models</h1>
          <p className="mt-1 text-xs text-brand-black/70">
            Edit your two core models. You can update names, pricing labels, range, and key
            highlights.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4 text-xs">
        {[...models, { _id: 'new', name: '', slug: '', priceLabel: '', rangeKm: '', chargeTime: '', highlights: [] }].map(
          (model: any) => (
            <form
              key={model._id}
              action={saveModel}
              className="card p-4"
            >
              <input type="hidden" name="id" defaultValue={model._id} />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blueDeep/80">
                    {model._id === 'new' ? 'Add model' : 'Edit model'}
                  </p>
                  {model.name && (
                    <p className="mt-1 text-sm font-semibold text-brand-blueDeep">{model.name}</p>
                  )}
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`name-${model._id}`}>
                    Name
                  </label>
                  <input
                    id={`name-${model._id}`}
                    name="name"
                    defaultValue={model.name}
                    required={model._id === 'new'}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`slug-${model._id}`}>
                    Slug
                  </label>
                  <input
                    id={`slug-${model._id}`}
                    name="slug"
                    defaultValue={model.slug}
                    required={model._id === 'new'}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`priceLabel-${model._id}`}>
                    Price label
                  </label>
                  <input
                    id={`priceLabel-${model._id}`}
                    name="priceLabel"
                    defaultValue={model.priceLabel}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`rangeKm-${model._id}`}>
                    Range (km)
                  </label>
                  <input
                    id={`rangeKm-${model._id}`}
                    name="rangeKm"
                    type="number"
                    defaultValue={model.rangeKm}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`chargeTime-${model._id}`}>
                    Charging time
                  </label>
                  <input
                    id={`chargeTime-${model._id}`}
                    name="chargeTime"
                    defaultValue={model.chargeTime}
                    className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
                  />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-[11px] font-medium text-brand-black/80" htmlFor={`highlights-${model._id}`}>
                    Highlights (one per line)
                  </label>
                  <textarea
                    id={`highlights-${model._id}`}
                    name="highlights"
                    rows={4}
                    defaultValue={(model.highlights || []).join('\n')}
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

