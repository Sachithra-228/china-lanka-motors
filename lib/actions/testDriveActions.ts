'use server';

import { z } from 'zod';
import { connectDb } from '@/lib/db';
import { TestDriveLead } from '@/lib/models/TestDriveLead';

const testDriveSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  phone: z.string().min(7, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  preferredModelSlug: z.string().min(1, 'Select a model.'),
  preferredDate: z.string().min(4, 'Select a date.'),
  preferredTime: z.string().min(2, 'Enter a time slot.'),
  location: z.string().min(2, 'Select a location.'),
  message: z.string().optional()
});

export async function submitTestDriveLead(formData: FormData) {
  const raw = {
    name: String(formData.get('name') || ''),
    phone: String(formData.get('phone') || ''),
    email: String(formData.get('email') || ''),
    preferredModelSlug: String(formData.get('preferredModelSlug') || ''),
    preferredDate: String(formData.get('preferredDate') || ''),
    preferredTime: String(formData.get('preferredTime') || ''),
    location: String(formData.get('location') || ''),
    message: String(formData.get('message') || '')
  };

  const parsed = testDriveSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { ok: false as const, error: firstError || 'Please check the form and try again.' };
  }

  await connectDb();

  await TestDriveLead.create({
    ...parsed.data,
    status: 'new'
  });

  return { ok: true as const };
}

