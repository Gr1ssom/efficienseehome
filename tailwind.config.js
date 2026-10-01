/*
 * Tailwind is used only inside the HarvestHub demo window, so the modals can be
 * recreated from HarvestHub's own markup. Every utility is scoped to `.hh-app`
 * and preflight is off, so the rest of the marketing site is untouched.
 * Theme values mirror HarvestHub's tailwind.config.js.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/demo/**/*.{ts,tsx}'],
  important: '.hh-app',
  darkMode: 'class',
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      colors: {
        primary: '#2E7D1A',
        accent: { gold: '#F5A800', cream: '#EEF4EB', dark: '#1A2535' },
        gray: { 750: '#2b3544' },
      },
      minHeight: { touch: '44px' },
      minWidth: { touch: '44px' },
    },
  },
  plugins: [],
}
