'use client';

import { useMemo, useState } from 'react';
import { submitTestDriveLead } from '@/lib/actions/testDriveActions';
import { WHATSAPP_NUMBER } from '@/lib/config';

const LOCATIONS = ['Colombo', 'Gampaha', 'Kalutara', 'Other'] as const;
const MODEL_OPTIONS = [
  { value: 'Honri Boma 200', label: 'Honri Boma 200' },
  { value: 'Honri Boma 300', label: 'Honri Boma 300' }
] as const;
const TIME_SLOT_OPTIONS = (() => {
  const slots: string[] = [];
  let startMinutes = 8 * 60; // 08:00
  const endMinutes = 18 * 60; // 18:00
  while (startMinutes + 20 <= endMinutes) {
    const end = startMinutes + 20;
    const h1 = String(Math.floor(startMinutes / 60)).padStart(2, '0');
    const m1 = String(startMinutes % 60).padStart(2, '0');
    const h2 = String(Math.floor(end / 60)).padStart(2, '0');
    const m2 = String(end % 60).padStart(2, '0');
    slots.push(`${h1}:${m1} - ${h2}:${m2}`);
    startMinutes += 20;
  }
  return slots;
})();

interface TestDriveFormProps {
  initialModelSlug?: string;
  models?: { slug: string; name: string }[];
}

export function TestDriveForm({ initialModelSlug }: TestDriveFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const modelDefault = useMemo(() => {
    return MODEL_OPTIONS.some((m) => m.value === initialModelSlug) ? initialModelSlug : '';
  }, [initialModelSlug]);

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    setMessage(null);

    const payload = {
      name: String(formData.get('name') || ''),
      phone: String(formData.get('phone') || ''),
      email: String(formData.get('email') || ''),
      preferredModel: String(formData.get('preferredModelSlug') || ''),
      preferredDate: String(formData.get('preferredDate') || ''),
      preferredTime: String(formData.get('preferredTime') || ''),
      location: String(formData.get('location') || ''),
      notes: String(formData.get('message') || '')
    };

    const result = await submitTestDriveLead(formData);
    if (result.ok) {
      setStatus('success');
      setMessage('Thank you - request submitted. Opening WhatsApp...');

      const number = WHATSAPP_NUMBER.replace(/\D/g, '');
      if (number.length >= 10) {
        const textLines = [
          '*New Test Drive Request*',
          '',
          `Name: ${payload.name}`,
          `Phone: ${payload.phone}`,
          `Email: ${payload.email}`,
          `Preferred Model: ${payload.preferredModel}`,
          `Preferred Date: ${payload.preferredDate}`,
          `Preferred Time: ${payload.preferredTime}`,
          `Location: ${payload.location}`,
          `Message: ${payload.notes || '-'}`,
          '',
          'Sent from China Lanka Motors website'
        ];
        const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(textLines.join('\n'))}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
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
            defaultValue={modelDefault}
            required
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          >
            <option value="" disabled>
              Select model
            </option>
            {MODEL_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
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
          <select
            id="preferredTime"
            name="preferredTime"
            required
            defaultValue=""
            className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-brand-blueLight/50 focus:ring-2"
          >
            <option value="" disabled>
              Select time slot
            </option>
            {TIME_SLOT_OPTIONS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
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
            status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
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
