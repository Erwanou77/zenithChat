const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blurple: '#7289DA',
        greyple: '#99aab5',
        black: {
          100: '#2c2f33',
          200: '#23272a'
        },
        blurple: {
          DEFAULT: '#7289DA',
          dark: '#5f73bc'  // le hover
        }
      }
    },
  },
  plugins: [],
}
