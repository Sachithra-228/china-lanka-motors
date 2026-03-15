import { AdminLayout } from '@/components/admin/AdminLayout';
import { connectDb } from '@/lib/db';
import { VehicleModel } from '@/lib/models/Model';
import { TestDriveLead } from '@/lib/models/TestDriveLead';

export const dynamic = 'force-dynamic';

async function getOverview() {
  try {
    await connectDb();
    const [modelsCount, leadsCount, newLeads] = await Promise.all([
      VehicleModel.countDocuments(),
      TestDriveLead.countDocuments(),
      TestDriveLead.countDocuments({ status: 'new' })
    ]);
    return { modelsCount, leadsCount, newLeads, dbReady: true };
  } catch {
    return { modelsCount: 0, leadsCount: 0, newLeads: 0, dbReady: false };
  }
}

export default async function AdminDashboardPage() {
  const overview = await getOverview();

  return (
    <AdminLayout>
      <h1 className="text-base font-semibold text-brand-blueDeep">Overview</h1>
      <p className="mt-1 text-xs text-brand-black/70">
        Quick snapshot of your core models and test drive pipeline.
      </p>
      {!overview.dbReady && (
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
          Database is not connected. Add <code>MONGODB_URI</code> in Vercel project environment variables.
        </div>
      )}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="card p-3 text-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blueDeep/80">
            Models
          </p>
          <p className="mt-1 text-2xl font-semibold text-brand-blueDeep">{overview.modelsCount}</p>
          <p className="mt-1 text-brand-black/65">Total models in your catalogue.</p>
        </div>
        <div className="card p-3 text-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blueDeep/80">
            Test drive leads
          </p>
          <p className="mt-1 text-2xl font-semibold text-brand-blueDeep">{overview.leadsCount}</p>
          <p className="mt-1 text-brand-black/65">All-time form submissions.</p>
        </div>
        <div className="card p-3 text-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-blueDeep/80">
            New leads
          </p>
          <p className="mt-1 text-2xl font-semibold text-brand-blueDeep">{overview.newLeads}</p>
          <p className="mt-1 text-brand-black/65">Marked as &ldquo;new&rdquo;.</p>
        </div>
      </div>
    </AdminLayout>
  );
}

