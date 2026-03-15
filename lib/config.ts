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

/** Primary image per model (blue series = model 1, black = model 2). */
export const MODEL_IMAGE_FALLBACKS = [
  '/photos/models/blue_01.JPG',
  '/photos/models/carblack_1.JPG'
];

/** Gallery: model 1 = full blue set, model 2 = black + blue for variety. */
export const MODEL_GALLERY_FALLBACKS: [string[], string[]] = [
  [
    '/photos/models/blue_01.JPG',
    '/photos/models/blue_02.JPG',
    '/photos/models/blue_03.JPG',
    '/photos/models/blue_04.JPG',
    '/photos/models/blue_05.JPG',
    '/photos/models/blue_06.JPG'
  ],
  [
    '/photos/models/carblack_1.JPG',
    '/photos/models/blue_02.JPG',
    '/photos/models/blue_03.JPG',
    '/photos/models/blue_04.JPG'
  ]
];

export const UPDATE_IMAGE_FALLBACKS = [
  '/photos/updates/car_inside_1.png',
  '/photos/updates/car_inside_2.png'
];

