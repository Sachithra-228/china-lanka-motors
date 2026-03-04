import Image from 'next/image';

export interface ArrivalItem {
  id: string;
  title: string;
  status: 'Available' | 'Reserved' | 'Sold';
  image?: string | null;
}

interface ArrivalGridProps {
  items: ArrivalItem[];
}

export function ArrivalGrid({ items }: ArrivalGridProps) {
  return (
    <section className="container-padded mt-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blueDeep">
            Featured Arrivals
          </h2>
          <p className="mt-2 max-w-xl text-sm text-brand-black/75">
            Our first eight imported vehicles are already in Sri Lanka. Browse the current arrivals,
            check availability, and reserve a test drive slot.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article key={item.id} className="card card-hover overflow-hidden text-xs">
            <div className="relative aspect-[4/3] bg-[#DFD9CB]">
              {item.image ? (
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[11px] text-brand-black/65">
                  <div className="mb-2 h-8 w-20 rounded-2xl border border-dashed border-brand-blueLight/60" />
                  Vehicle photo will be added here
                </div>
              )}
              <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blueDeep">
                {item.status}
              </div>
            </div>
            <div className="px-4 py-3">
              <h3 className="text-sm font-semibold text-brand-blueDeep">{item.title}</h3>
              <p className="mt-1 text-[11px] text-brand-black/70">
                Detailed specs and availability are ready for your review.
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
