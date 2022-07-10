/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily:{
        lato: 'Lato, sans-serif',
        minecraft: 'Minecraftia, sans-serif',
        sans: 'Lato, sans-serif'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
