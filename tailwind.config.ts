import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#6699A1',
        secondary: '#C17C74',
        background: '#FAF9F7',
        backgroundDark: '#E8E6E1',
        text: '#3B3A30',
        textSecondary: '#7C7C72',
        positive: '#9EB89D',
        warning: '#D97C7C',
        neutral: '#D9CBB2',
      },
    },
  },
  plugins: [],
};

export default config;
