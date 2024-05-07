/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      transitionDuration: {
        '300': '300ms'
      },
      fontFamily: {
        impact: ['Impact', 'sans']
      },
      screens: {
        md: '1200px',
        sc: '1250px',
        min_oculy: '800px',
        cell: '552px'
      },
      colors: {
        firstColor: '#400E32',
        secondColor: '#F8DE22'
      },
      height: {
        'h-90-h': '90%'
      }
    },
  },
  plugins: [],
}

