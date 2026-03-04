'use client';

import { WHATSAPP_NUMBER } from '@/lib/config';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloatingButton() {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '');
  const href = `https://wa.me/${number}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open WhatsApp chat"
      title="Open WhatsApp chat"
      className="fixed bottom-6 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl sm:right-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}


