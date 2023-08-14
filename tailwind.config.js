/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using  `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        standard: '#00D1FF',
        evaluation: '#097969',
        diagnostic: '#ea580c',
        therapeutic: '#FF66BE',
      },
    },
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
