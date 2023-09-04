import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0)' },
          '45%': { transform: 'rotateX(90deg)' },
          '55%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0)' },
        },
      },
      animation: {
        flip: 'flip 1s ease forwards',
      },
      backgroundColor: {
        correct: '#538d4e',
        close: '#b59f3b',
        wrong: '#3a3a3c',
      },
    },
  },
  plugins: [],
};
export default config;
