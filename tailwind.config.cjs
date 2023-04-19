/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        play: ['Play', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        trispace: ['Trispace', 'sans-serif'],
      },
      backgroundImage: {
        'blue-dots': "url('/img/loc-bg.jpg')",
        'black-dots': "url('/img/black-tc.jpg')",
        'color-stars': "url('/img/color-stars.jpg')",
        'white-stars': "url('/img/white-stars.jpg')",
      },
      container: {
        center: true,
        padding: '2.5rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '1600px',
        },
      },
      colors: {
        primary: {
          red: '#F8333C',
          yellow: '#FDCA40',
          green: '#44AF69',
          blue: '#2B9EB3',
          navy: '#1B2845',
        },
        soft: {
          white: '#F3F7F8',
          black: '#202222',
        },
      },
    },
  },
  plugins: [],
};
