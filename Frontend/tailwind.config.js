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
        firtsColor: '#400E32',
        secondColor: '#F8DE22'
         
        // firtsColor: '#41644A',
        // secondColor: '#ABC4AA'

        // firtsColor: '#3E3232',
        // secondColor: '#ABC4aA'
        
      }
    },
  },
  plugins: [],
}

