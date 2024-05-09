/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        evaluation: '#f77f00',
        diagnostic: '#588157',
        therapeutic: '#3a0ca3',
      },
    },
  },
  safelist: [
    {
      pattern:
        /(bg|text|border)-(evaluation|diagnostic|therapeutic)/,
    },
  ],
  daisyui: {
    themes: ['bumblebee'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
