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
          100: '#313338',
          200: '#2B2D31',
          300: '#232428',
          400: '#1E1F22',
          500: '#111214'
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
