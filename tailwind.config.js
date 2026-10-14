/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f3',
          100: '#faf0e6',
          200: '#f5e0d1',
          300: '#ebc9b3',
          400: '#dfa88a',
          500: '#d08360',
          600: '#c06645',
          700: '#a04d35',
          800: '#833f30',
          900: '#6d362b',
        },
        accent: {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#fad9ac',
          300: '#f7c07a',
          400: '#f3a146',
          500: '#ef8319',
          600: '#e0650f',
          700: '#bc4b0f',
          800: '#973e14',
          900: '#7a3515',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}