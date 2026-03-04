import { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-cream">
      <div className="container-padded py-6">
        <div className="grid gap-6 md:grid-cols-[220px,1fr]">
          <AdminSidebar />
          <div className="card p-4 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

