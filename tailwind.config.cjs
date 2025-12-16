/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        champagne: {
          DEFAULT: '#FDFCF5', // Light Cream (Jo Malone background)
          50: '#FFFFFF',
          100: '#FDFCF5',
          200: '#F2F0EB', 
          300: '#E8E6E0',
        },
        gold: {
          DEFAULT: '#B7852B', // Keeping for subtle accents only
          50: '#FDFCF5',
          100: '#EEEADE',
          200: '#B7852B',
        },
        black: '#000000', // Pure black for text
        rose: '#000000', // Replaced rose with black for the premium monochrome look
      },
      borderRadius: {
        'none': '0',
        'sm': '0',
        DEFAULT: '0',
        'md': '0',
        'lg': '0',
        'xl': '0',
        '2xl': '0',
        '3xl': '0',
        'full': '9999px',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'metallic-gradient': 'linear-gradient(135deg, #B7852B 0%, #F5E0A3 50%, #B7852B 100%)',
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
