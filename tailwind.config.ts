import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#EFECE3',
          blueLight: '#8FABD4',
          blueDeep: '#4A70A9',
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

