/** @type {import('tailwindcss').Config} */
export default {
  // Scan all files in the app directory
  content: ['./app/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        primary: '#6699A1',
        secondary: '#C17C74',
        background: '#FAF9F7',
        'background-dark': '#E8E6E1',
        text: '#3B3A30',
        'text-secondary': '#7C7C72',
        positive: '#9EB89D',
        warning: '#D97C7C',
        neutral: '#D9CBB2',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        base: '16px',
      },
    },
  },
  plugins: [],
};

