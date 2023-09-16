/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'display': ['Rubik Mono One', 'sans-serif'],
        'brand': ['Rubik', 'sans-serif'],
        'roboto': ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'screen-lg':['11.6vw', '11.6vw'],
        'screen-xl':['12.3vw', '12.3vw'],
      },
      height: {
        15: '3.75rem',
      },
      colors: {
        'bright-faded': '#FDBD1077',
        'bright-dark': '#FCA311',
        'bright': '#FDBD10',
        'bright-light': '#FFD43B',
        'bright-lighter': '#FFE66B',
        'cool': '#1C71D4',
        'cool-light': '#2D8EE3',
        'cool-lighter': '#4BA4F0',
        'field': '#039061',
        'white': '#FFFFFF',
      },
      animation: {
        'pulseScale': 'pulseScale 1.5s ease-in-out infinite',
      },
      keyframes: {
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      }
    },
  },
  plugins: [],
}
