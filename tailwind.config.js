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
        standard: '#0A054C',
        evaluation: '#0A054C',
        diagnostic: '#870000',
        therapeutic: '#C97215',
        orange: '#C97215',
      },
    },
  },
  safelist: [
    {
      pattern:
        /(bg|text|border)-(standard|evaluation|diagnostic|therapeutic|orange)/,
    },
  ],
  daisyui: {
    themes: [
      {
        scriptvoz: {
          primary: '#C97215',
          secondary: '#3fa517',
          accent: '#a9f722',
          neutral: '#232028',
          'base-100': '#ffffff',
          info: '#73ddf2',
          success: '#22a586',
          warning: '#f18d13',
          error: '#e83f21',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
