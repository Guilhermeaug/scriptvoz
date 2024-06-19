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
        diagnostic: '#6B7280',
        therapeutic: '#0A054C',
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|border|step)-(evaluation|diagnostic|therapeutic)/,
    },
  ],
  daisyui: {
    themes: [
      {
        bumblebee: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#DC4D01',
          secondary: '#0A054C',
          'primary-content': 'white',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
