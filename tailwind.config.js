/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2563EB',
          DEFAULT: '#2563EB',
          dark: '#3B82F6',
        },
        secondary: {
          light: '#14B8A6',
          DEFAULT: '#14B8A6',
          dark: '#2DD4BF',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        slate: {
          950: '#0B0F19', // Premium deep slate for dark theme backgrounds
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
