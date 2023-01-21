/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'CircularSp',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'Hiragino Kaku Gothic Pro',
        'Meiryo',
        'MS Gothic',
        'sans-serif',
      ],
    },
    colors: {
      black: {
        base: '#121212',
        pure: '#000',
      },
      green: {
        DEFAULT: 'hsl(140, 63%, 44%)',
        light: 'hsl(140, 63%, 54%)',
      },
      offwhite: '#b3b3b3',
      surface: {
        DEFAULT: '#282828',
        lowContrast: '#181818',
      },
      transparent: 'transparent',
      white: '#fff',
    },
    data: {
      open: 'state="open"',
      closed: 'state="closed"',
      selected: 'state="selected"',
      'side-right': 'side="right"',
      'side-bottom': 'side="bottom"',
      'side-left': 'side="left"',
      'side-top': 'side="top"',
    },
    extend: {
      animation: {
        'slide-up-fade': 'slide-up-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade':
          'slide-down-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade':
          'slide-left-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade':
          'slide-right-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontSize: {
        xxs: ['0.625rem', '0.875rem'],
      },
      keyframes: {
        'slide-up-fade': {
          from: {
            opacity: 0,
            transform: 'translateY(2px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-down-fade': {
          from: {
            opacity: 0,
            transform: 'translateY(-2px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-left-fade': {
          from: {
            opacity: 0,
            transform: 'translateX(2px)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        'slide-right-fade': {
          from: {
            opacity: 0,
            transform: 'translateX(-2px)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      },
      scale: {
        105: 1.05,
      },
    },
  },
  plugins: [],
};
