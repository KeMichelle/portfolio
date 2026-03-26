import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './content/**/*.{md,yml,json}',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        blush: '#ffd8e6',
        mint: '#d6f0d5',
        peach: '#ffd6c2',
        lavender: '#e6ddff',
        butter: '#fff1b8',
        cream: '#fffaf6',
        ink: '#473954',
        rose: '#f5a4c6',
        sage: '#9ec8aa',
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        display: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        dreamy: '0 28px 90px rgba(71, 57, 84, 0.20)',
        float: '0 14px 44px rgba(71, 57, 84, 0.16)',
      },
      borderRadius: {
        organic: '36px',
        bubble: '48px',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '50%': {
            transform: 'translate3d(0, -12px, 0)',
          },
        },
        drift: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0) rotate(0deg)',
          },
          '50%': {
            transform: 'translate3d(10px, -8px, 0) rotate(2deg)',
          },
        },
        pulseSoft: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.9',
          },
          '50%': {
            transform: 'scale(1.04)',
            opacity: '1',
          },
        },
        sway: {
          '0%, 100%': {
            transform: 'rotate(-2deg) translate3d(0, 0, 0)',
          },
          '50%': {
            transform: 'rotate(2deg) translate3d(4px, -8px, 0)',
          },
        },
      },
      animation: {
        float: 'float 6.5s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 7s ease-in-out infinite',
        sway: 'sway 9s ease-in-out infinite',
      },
    },
  },
};
