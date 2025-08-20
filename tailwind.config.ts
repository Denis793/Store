import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg))',
        surface: 'rgb(var(--color-surface))',
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        border: 'rgb(var(--color-border))',
        ring: 'rgb(var(--color-ring))',
        accent: 'rgb(var(--color-accent))',
        redToken: 'rgb(var(--color-red))',
        blueToken: 'rgb(var(--color-blue))',
        emeraldToken: 'rgb(var(--color-emerald))',
        amberToken: 'rgb(var(--color-amber))',
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    },
  },
  plugins: [],
};

export default config;
