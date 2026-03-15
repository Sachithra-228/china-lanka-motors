import type { Metadata } from 'next';
import Image from 'next/image';
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
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr),minmax(0,0.92fr)]">
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-[1.7rem] border border-black/10 bg-[linear-gradient(145deg,#f4f6fb_0%,#eef2f9_58%,#f8faff_100%)] p-5 shadow-[0_18px_38px_rgba(0,0,0,0.08)] sm:p-6">
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute right-[-4rem] top-[-4rem] h-52 w-52 rounded-full bg-brand-blueLight/16 blur-3xl" />

            <div className="relative">
              <div className="relative h-[260px] sm:h-[320px] lg:h-[360px]">
                <Image
                  src="/photos/hero/hero_section_new.png"
                  alt="Test drive hero vehicle"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-brand-blueDeep sm:text-4xl">
                Experience quiet, electric driving - without the rush.
              </h1>
            </div>
          </div>

          <div className="grid gap-3 text-xs text-brand-black/82 md:grid-cols-3">
            <article className="rounded-3xl border border-black/10 bg-white/78 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
              <p className="font-semibold text-brand-blueDeep">One-on-one sessions</p>
              <p className="mt-1.5 leading-6">
                Dedicated slots for you or your family - we walk through questions at your pace.
              </p>
            </article>
            <article className="rounded-3xl border border-black/10 bg-white/78 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
              <p className="font-semibold text-brand-blueDeep">Charging walkthrough</p>
              <p className="mt-1.5 leading-6">
                Practical demos of home charging setups and how to plan longer trips.
              </p>
            </article>
            <article className="rounded-3xl border border-black/10 bg-white/78 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
              <p className="font-semibold text-brand-blueDeep">Paperwork guidance</p>
              <p className="mt-1.5 leading-6">
                Support on registration, insurance, and what to expect with future policy shifts.
              </p>
            </article>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/76 p-4 text-xs text-brand-black/80 shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
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
              and we'll help you pick a timing and location.
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
