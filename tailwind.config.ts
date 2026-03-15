import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ['var(--font-unbounded)', 'cursive']
      },
      colors: {
        brand: {
          cream: '#EFECE3',
          blueLight: '#a3a3a3',
          blueDeep: '#0a0a0a',
          black: '#000000'
        }
      },
      borderRadius: {
        '2xl': '1.25rem'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
};

export default config;

