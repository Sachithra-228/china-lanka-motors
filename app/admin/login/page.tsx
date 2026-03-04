'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

async function loginAction(password: string) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Login failed');
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await loginAction(password);
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setStatus('idle');
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-brand-cream">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-sm p-5 text-sm"
      >
        <h1 className="text-base font-semibold text-brand-blueDeep">Admin Login</h1>
        <p className="mt-1 text-xs text-brand-black/70">
          Protected area for managing models, updates, and test drive leads.
        </p>
        <div className="mt-4 flex flex-col gap-1">
          <label htmlFor="password" className="text-xs font-medium text-brand-black/80">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          />
        </div>
        {error && (
          <div className="mt-3 rounded-2xl bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-4 w-full rounded-full bg-brand-blueDeep px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-blueDeep/95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

