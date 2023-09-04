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
        'incorrect-wiggle': {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '12.5%, 87.5%': { transform: 'translateX(-2px)' },
          '37.5%, 62.5%': { transform: 'translateX(4px)' },
          '50%': { transform: 'translateX(-4px)' },
          '25%, 75%': { transform: 'translateX(-2px)' },
        },
        winning: {
          '0%, 20%': { transform: 'translateY(0)' },
          '40%': {
            transform: 'translateY(-30px)',
          },
          '50%': {
            transform: 'translateY(5px)',
          },
          '60%': {
            transform: 'translateY(-15px)',
          },
          '80%': {
            transform: 'translateY(2px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        flip: 'flip 0.5s ease forwards',
        'incorrect-wiggle': 'incorrect-wiggle 0.5s ease forwards',
        winning: 'winning 1s ease forwards'
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
