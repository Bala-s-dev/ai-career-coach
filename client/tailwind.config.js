/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        purple: { DEFAULT: '#534AB7', lt: '#7c6fee' },
        teal:   { DEFAULT: '#1D9E75', lt: '#4fd4a8' },
        amber:  { DEFAULT: '#EF9F27', lt: '#f5bc5c' },
      },
      backdropBlur: { xs: '4px' },
    },
  },
  plugins: [],
};
