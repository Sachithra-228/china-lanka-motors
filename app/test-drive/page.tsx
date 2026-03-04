import type { Metadata } from 'next';
import Link from 'next/link';
import { TestDriveForm } from '@/components/common/TestDriveForm';
import { BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/config';
import { connectDb } from '@/lib/db';
import { VehicleModel } from '@/lib/models/Model';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Book Test Drive`,
  description:
    'Book a focused, one-on-one test drive with China Lanka Motors to experience EV driving in Sri Lanka.'
};

async function getModels() {
  try {
    await connectDb();
    const models = await VehicleModel.find({ isPublished: true }).sort({ createdAt: 1 }).lean();
    return JSON.parse(JSON.stringify(models));
  } catch {
    return [];
  }
}

export default async function TestDrivePage() {
  const models = await getModels();
  const fallbackModels =
    models.length > 0
      ? models
      : [
          { slug: 'urban-crossover-ev', name: 'Urban Crossover EV' },
          { slug: 'city-hatch-ev', name: 'City Hatch EV' }
        ];

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;

  return (
    <div className="container-padded py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blueDeep/80">
            Test Drive
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-brand-blueDeep sm:text-3xl">
            Experience quiet, electric driving — without the rush.
          </h1>
          <p className="mt-3 text-sm text-brand-black/75">
            We keep test drives focused and calm. No pressure, just time to understand how an EV
            feels on real Sri Lankan roads, how charging fits into your life, and what ownership
            actually looks like.
          </p>

          <div className="mt-5 grid gap-3 text-xs text-brand-black/80 md:grid-cols-3">
            <div className="card p-3">
              <p className="font-semibold text-brand-blueDeep">One-on-one sessions</p>
              <p className="mt-1">
                Dedicated slots for you or your family — we walk through questions at your pace.
              </p>
            </div>
            <div className="card p-3">
              <p className="font-semibold text-brand-blueDeep">Charging walkthrough</p>
              <p className="mt-1">
                Practical demos of home charging setups and how to plan longer trips.
              </p>
            </div>
            <div className="card p-3">
              <p className="font-semibold text-brand-blueDeep">Paperwork guidance</p>
              <p className="mt-1">
                Support on registration, insurance, and what to expect with future policy shifts.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-brand-blueLight/16 p-4 text-xs text-brand-black/80">
            <p>
              Prefer to coordinate on WhatsApp?{' '}
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-blueDeep underline underline-offset-4"
              >
                Start a chat
              </Link>{' '}
              and we&apos;ll help you pick a timing and location.
            </p>
          </div>
        </section>

        <aside>
          <TestDriveForm models={fallbackModels} />
        </aside>
      </div>
    </div>
  );
}

