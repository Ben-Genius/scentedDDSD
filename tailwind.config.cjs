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
        gold: {
          DEFAULT: '#B7852B',
          50: '#f6efe0',
          100: '#eee0c1',
        },
        black: '#0B0B0B',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'metallic-gradient': 'linear-gradient(135deg, #B7852B 0%, #F5E0A3 50%, #B7852B 100%)',
      },
    },
  },
  plugins: [],
}
