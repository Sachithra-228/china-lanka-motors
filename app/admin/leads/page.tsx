import { AdminLayout } from '@/components/admin/AdminLayout';
import { connectDb } from '@/lib/db';
import { TestDriveLead } from '@/lib/models/TestDriveLead';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

async function getLeads() {
  try {
    await connectDb();
    const leads = await TestDriveLead.find({}).sort({ createdAt: -1 }).lean();
    return { leads: JSON.parse(JSON.stringify(leads)), dbReady: true };
  } catch {
    return { leads: [], dbReady: false };
  }
}

async function markContacted(formData: FormData) {
  'use server';
  const id = String(formData.get('id') || '');
  if (!id) return;
  try {
    await connectDb();
    await TestDriveLead.findByIdAndUpdate(id, { status: 'contacted' });
  } catch {
    return;
  }
  revalidatePath('/admin/leads');
}

export default async function AdminLeadsPage() {
  const { leads, dbReady } = await getLeads();

  return (
    <AdminLayout>
      <h1 className="text-base font-semibold text-brand-blueDeep">Test drive leads</h1>
      <p className="mt-1 text-xs text-brand-black/70">
        View and manage incoming test drive requests.
      </p>
      {!dbReady && (
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
          Database is not connected. Add <code>MONGODB_URI</code> in Vercel project environment variables.
        </div>
      )}

      <div className="mt-5 overflow-hidden rounded-2xl border border-black/5 bg-[#F6F3EA]">
        <table className="min-w-full border-collapse text-xs">
          <thead className="bg-black/5 text-[11px] uppercase tracking-[0.14em] text-brand-black/70">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Contact</th>
              <th className="px-3 py-2 text-left">Model</th>
              <th className="px-3 py-2 text-left">Preferred slot</th>
              <th className="px-3 py-2 text-left">Location</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left" />
            </tr>
          </thead>
          <tbody>
            {leads.map((lead: any) => (
              <tr key={lead._id} className="border-t border-black/5">
                <td className="px-3 py-2 align-top">
                  <div className="font-medium text-brand-black/85">{lead.name}</div>
                  {lead.message && (
                    <div className="mt-1 max-w-xs text-[11px] text-brand-black/70">
                      {lead.message}
                    </div>
                  )}
                </td>
                <td className="px-3 py-2 align-top text-brand-black/75">
                  <div>{lead.phone}</div>
                  <div className="text-[11px] text-brand-black/60">{lead.email}</div>
                </td>
                <td className="px-3 py-2 align-top text-brand-black/75">
                  {lead.preferredModelSlug}
                </td>
                <td className="px-3 py-2 align-top text-brand-black/75">
                  <div>{lead.preferredDate}</div>
                  <div className="text-[11px] text-brand-black/60">{lead.preferredTime}</div>
                </td>
                <td className="px-3 py-2 align-top text-brand-black/75">{lead.location}</td>
                <td className="px-3 py-2 align-top">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                      lead.status === 'new'
                        ? 'bg-brand-blueLight/20 text-brand-blueDeep'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-3 py-2 align-top">
                  {lead.status === 'new' && (
                    <form action={markContacted}>
                      <input type="hidden" name="id" value={lead._id} />
                      <button
                        type="submit"
                        className="rounded-full bg-brand-blueDeep px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-blueDeep/95"
                      >
                        Mark contacted
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-[11px] text-brand-black/60">
                  No leads yet. Once visitors submit the test drive form, they&apos;ll appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

