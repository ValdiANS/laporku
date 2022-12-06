/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#81C1D3',
      },

      textColor: {
        primary: '#626262',
        secondary: '#F5F9FA',
      },

      borderColor: {
        primary: '#A2D3D7',
        secondary: '#D7D7D7',
      },

      backgroundImage: {
        primaryGradient: 'linear-gradient(180deg, #A2D3D7 0%, #7FC0D2 100%);',
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
