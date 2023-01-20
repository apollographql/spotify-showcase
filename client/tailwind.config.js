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
    extend: {
      fontSize: {
        xxs: ['0.625rem', '0.875rem'],
      },
      scale: {
        105: 1.05,
      },
    },
  },
  plugins: [],
};
