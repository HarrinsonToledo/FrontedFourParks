const { keyframes } = require('@angular/animations');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        impact: ['Impact', 'sans']
      },
      screens: {
        md: '1200px',
        sc: '1250px',
        min_oculy: '800px'
      },
      colors: {
        firstColor: '#400E32',
        secondColor: '#F8DE22'
      }
    },
  },
  plugins: [],
}

