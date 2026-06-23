export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F7F4',
        'background-alt': '#FAFAFA',
        primary: '#111111',
        accent: '#1F3D2A',
        'accent-light': '#2a5a3a',
        gold: '#C9A227',
        'gold-light': '#d4b24a',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
