export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || 'China Lanka Motors';
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'chinalankamotors.com';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94XXXXXXXXX';

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/models', label: 'Models' },
  { href: '/ev-lifestyle', label: 'EV Lifestyle' },
  { href: '/updates', label: 'Updates' }
];

export const HERO_IMAGE = '/photos/hero/hero_section_new.png';
export const HERO_VIDEO = '/videos/hero/honri_hero.mp4';

export const MODEL_IMAGE_FALLBACKS = [
  '/photos/models/model_1.png',
  '/photos/models/model_2.png'
];

/** Multiple images per model for gallery (exterior, interior, etc.). Reuse same asset until more photos exist. */
export const MODEL_GALLERY_FALLBACKS: [string[], string[]] = [
  ['/photos/models/model_1.png', '/photos/models/model_1.png', '/photos/models/model_1.png'],
  ['/photos/models/model_2.png', '/photos/models/model_2.png', '/photos/models/model_2.png']
];

export const UPDATE_IMAGE_FALLBACKS = [
  '/photos/updates/car_inside_1.png',
  '/photos/updates/car_inside_2.png'
];

