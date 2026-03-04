import Link from 'next/link';
import { LayoutDashboard, Car, Newspaper, Users } from 'lucide-react';

export function AdminSidebar() {
  const items = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/models', label: 'Models', icon: Car },
    { href: '/admin/updates', label: 'Updates', icon: Newspaper },
    { href: '/admin/leads', label: 'Leads', icon: Users }
  ];

  return (
    <aside className="card p-3 text-sm">
      <h2 className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blueDeep">
        Admin
      </h2>
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-2xl px-2 py-2 text-xs font-medium text-brand-black/80 hover:bg-brand-blueLight/15"
            >
              <Icon className="h-4 w-4 text-brand-blueDeep" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

