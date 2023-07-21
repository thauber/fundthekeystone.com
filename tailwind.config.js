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
        'rubikMonoOne': ['Rubik Mono One', 'sans-serif'],
        'roboto': ['Manrope', 'sans-serif'],
      },

      colors: {
        'bright': '#FDBD10',
        'cool': '#1C71D4',
        'field': '#039061',
        'white': '#FFFFFF',
      }
    },
  },
  plugins: [],
}
