import Link from 'next/link';
import { BRAND_NAME } from '@/lib/config';
import { Phone, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-black/5 bg-brand-blueDeep text-sm text-white">
      <div className="container-padded grid gap-10 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            {BRAND_NAME}
          </div>
          <p className="max-w-sm text-sm text-white/80">
            Bringing thoughtfully selected electric vehicles from China to Sri Lanka — clean lines,
            quiet cabins, and smart tech made practical.
          </p>
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Contact
          </div>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+94 77 738 4257</span>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Quick Links
          </div>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href="/models" className="hover:text-white">
                Models
              </Link>
            </li>
            <li>
              <Link href="/ev-lifestyle" className="hover:text-white">
                EV Lifestyle
              </Link>
            </li>
            <li>
              <Link href="/updates" className="hover:text-white">
                Updates
              </Link>
            </li>
            <li>
              <Link href="/test-drive" className="hover:text-white">
                Book Test Drive
              </Link>
            </li>
          </ul>
          <div className="mt-4 flex gap-3 text-white/70">
            <button
              type="button"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10"
            >
              <Facebook className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10"
            >
              <Instagram className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {year} {BRAND_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
