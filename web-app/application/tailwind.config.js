/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This is critical - enables class-based dark mode
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}