'use client';

import { useState } from 'react';
import { submitTestDriveLead } from '@/lib/actions/testDriveActions';

const LOCATIONS = ['Colombo', 'Gampaha', 'Kalutara', 'Other'] as const;

interface TestDriveFormProps {
  initialModelSlug?: string;
  models: { slug: string; name: string }[];
}

export function TestDriveForm({ initialModelSlug, models }: TestDriveFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    setMessage(null);
    const result = await submitTestDriveLead(formData);
    if (result.ok) {
      setStatus('success');
      setMessage('Thank you — we have your details and will contact you shortly.');
    } else {
      setStatus('error');
      setMessage(result.error || 'Something went wrong. Please try again.');
    }
  }

  return (
    <form action={handleSubmit} className="card p-5 text-sm">
      <h2 className="text-base font-semibold text-brand-blueDeep">Book a Test Drive</h2>
      <p className="mt-1 text-xs text-brand-black/70">
        Share a few details and our team will coordinate timings, location, and documentation with
        you.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-brand-black/80" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-brand-black/80" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-brand-black/80" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-brand-black/80" htmlFor="preferredModelSlug">
            Preferred Model
          </label>
          <select
            id="preferredModelSlug"
            name="preferredModelSlug"
            defaultValue={initialModelSlug || ''}
            required
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          >
            <option value="" disabled>
              Select model
            </option>
            {models.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-brand-black/80" htmlFor="preferredDate">
            Preferred Date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-brand-black/80" htmlFor="preferredTime">
            Preferred Time slot
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            placeholder="e.g. 10.00–12.00"
            required
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-brand-black/80" htmlFor="location">
            Location
          </label>
          <select
            id="location"
            name="location"
            required
            defaultValue=""
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          >
            <option value="" disabled>
              Select location
            </option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <label className="text-xs font-medium text-brand-black/80" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Share any notes about timing, previous EV experience, or questions."
          className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
        />
      </div>

      {message && (
        <div
          className={`mt-3 rounded-2xl px-3 py-2 text-xs ${
            status === 'success'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-4 w-full rounded-full bg-brand-blueDeep px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-blueDeep/95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending...' : 'Submit Request'}
      </button>
    </form>
  );
}

