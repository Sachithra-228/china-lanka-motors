import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloatingButton } from '@/components/common/WhatsAppFloatingButton';

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || 'China Lanka Motors';
const domain = process.env.NEXT_PUBLIC_DOMAIN || 'chinalankamotors.com';

export const metadata: Metadata = {
  title: `${brandName} | Modern EVs in Sri Lanka`,
  description:
    'China Lanka Motors imports modern electric vehicles to Sri Lanka – clean design, smart tech, and practical range for daily driving.',
  metadataBase: new URL(`https://${domain}`),
  openGraph: {
    title: `${brandName} | Modern EVs in Sri Lanka`,
    description:
      'Drive electric, live smarter. Explore EV models, EV lifestyle guides, and updates from China Lanka Motors.',
    url: `https://${domain}`,
    siteName: brandName,
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="page-shell">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

