import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#b3c5d7',
          300: '#8da0b3',
          400: '#677b8f',
          500: '#41566b',
          600: '#2b3a4a',
          700: '#1f2c3b',
          800: '#152030',
          900: '#0d1621',
        },
        clay: {
          50: '#fdf3ea',
          100: '#f7e2cd',
          200: '#eddcc7',
          500: '#c47a3a',
          600: '#b5651d',
          700: '#8f4f16',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config; 