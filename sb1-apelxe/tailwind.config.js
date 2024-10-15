/** @type {import('tailwindcss').Config} 

Primary: #14a800 (green)
Secondary: #1d4354 (dark blue)
Accent: #6fda44 (light green)
Background: #f2f7f2 (light gray-green)
Text: #001e00 (dark green)
Text-light: #5e6d55 (medium gray-green)
*/
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#14a800',
        secondary: '#1d4354',
        accent: '#6fda44',
        background: '#f2f7f2',
        text: '#001e00',
        'text-light': '#5e6d55',
      },
      fontFamily: {
        sans: ['Neue Plak', 'sans-serif'],
      },
    },
  },
  plugins: [],
};