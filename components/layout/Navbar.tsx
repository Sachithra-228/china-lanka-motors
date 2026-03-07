'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, BRAND_NAME } from '@/lib/config';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const isModelsPage = pathname === '/models';
  const isDarkBluePage = ['/models', '/ev-lifestyle', '/updates'].includes(pathname ?? '');
  const headerTone = isModelsPage ? 'bg-[#4d73ab]' : isDarkBluePage ? 'bg-brand-blueDeep' : '';
  const shellTone = isModelsPage
    ? isScrolled
      ? 'border-white/22 bg-[#446aa1]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.11)] backdrop-blur-md'
      : 'border-white/18 bg-[#5077b0]/52 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm'
    : isScrolled
      ? 'border-white/15 bg-[#112f5f]/70 shadow-soft backdrop-blur-xl'
      : 'border-white/10 bg-[#071a3b]/28 shadow-soft backdrop-blur-md';
  const ctaTone = isModelsPage
    ? 'bg-white text-[#3f66a0] shadow-[0_8px_24px_rgba(22,44,79,0.16)]'
    : isScrolled
      ? 'bg-white/92 text-brand-blueDeep shadow-soft'
      : 'bg-white text-brand-blueDeep shadow-soft';
  const menuButtonTone = isModelsPage
    ? 'border-white/20 bg-white/8 text-white'
    : isScrolled
      ? 'border-white/20 bg-white/10 text-white'
      : 'border-white/10 bg-white/5 text-white';

  return (
    <header
      className={`sticky top-0 z-30 ${headerTone}`}
    >
      <div className="mx-auto w-full max-w-[110rem] px-3 py-1.5 sm:px-4 md:px-6">
        <div
          className={`relative rounded-[1.95rem] border px-3 py-2.5 text-sm text-white transition-all duration-300 md:px-5 ${shellTone}`}
        >
          <nav className="flex min-h-[3.35rem] items-center justify-between gap-3 md:min-h-[3.55rem]">
            <Link href="/" className="min-w-0 flex-1 lg:flex-none">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blueLight text-sm font-semibold text-brand-black shadow-soft">
                  CL
                </span>
                <span className="truncate text-sm font-semibold tracking-wide md:text-base">{BRAND_NAME}</span>
              </span>
            </Link>

            <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-200 hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link
                href="/test-drive"
                className={`relative hidden overflow-hidden rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition sm:inline-flex lg:hidden ${ctaTone} before:absolute before:inset-0 before:origin-left before:scale-x-0 before:rounded-full before:bg-brand-blueLight before:transition-transform before:duration-300 before:content-[""] hover:before:scale-x-100`}
              >
                <span className="relative z-10 transition-colors duration-300 hover:text-brand-black">
                  Book Test Drive
                </span>
              </Link>
              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-site-nav"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden ${menuButtonTone}`}
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <Link
                href="/test-drive"
                className={`relative hidden overflow-hidden rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition lg:inline-flex ${ctaTone} before:absolute before:inset-0 before:origin-left before:scale-x-0 before:rounded-full before:bg-brand-blueLight before:transition-transform before:duration-300 before:content-[""] hover:before:scale-x-100`}
              >
                <span className="relative z-10 transition-colors duration-300 hover:text-brand-black">
                  Book Test Drive
                </span>
              </Link>
            </div>
          </nav>

          <div
            id="mobile-site-nav"
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              isMenuOpen ? 'max-h-[28rem] pt-3 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div
              className={`space-y-2 rounded-[1.5rem] border p-3 ${
                isScrolled
                  ? 'border-white/15 bg-white/10 backdrop-blur-md'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="grid gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/test-drive"
                className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blueDeep shadow-soft transition before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-brand-blueLight before:transition-transform before:duration-300 before:content-[''] hover:before:scale-x-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10 transition-colors duration-300 hover:text-brand-black">
                  Book Test Drive
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
