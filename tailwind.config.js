/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './client/src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'Source Sans Pro',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      title: [
        'Source Sans Pro',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      black: {
        base: '#121212',
        pure: '#000',
      },
      blue: '#0d72ea',
      green: {
        DEFAULT: 'hsl(140, 63%, 44%)',
        light: 'hsl(140, 63%, 54%)',
      },
      offwhite: '#b3b3b3',
      surface: {
        DEFAULT: '#282828',
      },
      transparent: 'transparent',
      white: '#fff',
    }),
    data: {
      active: 'state="active"',
      open: 'state="open"',
      closed: 'state="closed"',
      'side-right': 'side="right"',
      'side-bottom': 'side="bottom"',
      'side-left': 'side="left"',
      'side-top': 'side="top"',
    },
    extend: {
      animation: {
        'fade-in': 'fade-in var(--animate-duration, 400ms) ease-out',
        'fade-out': 'fade-out var(--animate-duration, 400ms) ease-out',
        shimmer: 'shimmer 1.5s ease infinite',
        'slide-up-fade': 'slide-up-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade':
          'slide-down-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade':
          'slide-left-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade':
          'slide-right-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'sound-wave': 'sound-wave 0ms -800ms linear infinite alternate',
      },
      fontSize: {
        xxs: ['0.625rem', '0.875rem'],
      },
      borderColor: {
        primary: 'hsla(0, 0%, 100%, 0.1)',
      },
      backgroundColor: ({ theme }) => ({
        code: 'rgba(99, 110, 123, 0.4)',
        'surface-active': 'hsla(0, 0%, 100%, 0.1)',
        'surface-low-contrast': '#181818',
        'surface-low-contrast-hover': '#282828',
        theme: theme('colors.green'),
        'theme-light': theme('colors.green.light'),
      }),
      textColor: ({ theme }) => ({
        disabled: '#5e5e5e',
        primary: theme('colors.white'),
        theme: theme('colors.green'),
        'theme-light': theme('colors.green.light'),
        muted: theme('colors.offwhite'),
      }),
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'slide-up-fade': {
          from: {
            opacity: 0,
            transform: 'translateY(var(--animate-slide-distance, 2px))',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-down-fade': {
          from: {
            opacity: 0,
            transform:
              'translateY(calc(var(--animate-slide-distance, 2px) * -1))',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-left-fade': {
          from: {
            opacity: 0,
            transform: 'translateX(var(--animate-slide-distance, 2px))',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        'slide-right-fade': {
          from: {
            opacity: 0,
            transform:
              'translateX(calc(var(--animate-slide-distance, 2px) * -1))',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        'sound-wave': {
          from: {
            transform: 'translateY(90%)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
      },
      scale: {
        105: 1.05,
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
