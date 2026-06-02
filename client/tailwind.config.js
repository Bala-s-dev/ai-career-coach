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
        teal: { DEFAULT: '#1D9E75', lt: '#4fd4a8' },
        amber: { DEFAULT: '#EF9F27', lt: '#f5bc5c' },
        // ADDED: Mapped CSS Variables to Tailwind Colors
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface2)',
        border: 'var(--border)',
        border2: 'var(--border2)',
        text: {
          1: 'var(--text-1)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          h: 'var(--accent-h)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      backdropBlur: { xs: '4px' },
    },
  },
  plugins: [],
};