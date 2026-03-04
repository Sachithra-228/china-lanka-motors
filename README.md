## China Lanka Motors Website

Modern, premium-but-minimal marketing site for **China Lanka Motors**, a Sri Lankan EV importer, built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **MongoDB (Mongoose)**, **Zod**, and **Server Actions**.

### Tech Stack

- **Framework**: Next.js 14 (App Router, `app/` directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, custom tokens for brand colours
- **Database**: MongoDB with Mongoose models
- **Validation**: Zod for forms
- **Forms**: Server Actions + `FormData` (no client state libraries)
- **Icons**: `lucide-react`

### Routes

- `/` – Homepage (hero, featured arrivals, why section, EV lifestyle tiles, latest updates, CTA banner)
- `/models` – Overview of the 2 core models
- `/models/[slug]` – Model details + specs + highlights + test drive form
- `/ev-lifestyle` – EV lifestyle content hub
- `/updates` – News & events listing
- `/updates/[slug]` – Update detail page
- `/test-drive` – Dedicated test drive lead form + WhatsApp CTA
- `/admin/login` – Simple password-based admin login (via `ADMIN_PASSWORD`)
- `/admin` – Overview dashboard
- `/admin/models` – Edit/add models (range, pricing label, highlights)
- `/admin/updates` – Create/edit updates
- `/admin/leads` – View and manage test drive leads

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
MONGODB_URI=...
ADMIN_PASSWORD=...
NEXT_PUBLIC_BRAND_NAME="China Lanka Motors"
NEXT_PUBLIC_DOMAIN="chinalankamotors.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="94XXXXXXXXX"
```

### Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Notes

- All images use `next/image`. Hero and vehicle/gallery images are placeholders; swap in real photography later.
- Featured arrivals grid and models page are wired to Mongoose models but include sensible placeholder data if the database is empty.
- Test drive leads are stored in MongoDB and visible in `/admin/leads`, with a simple status workflow (`new` → `contacted`).

