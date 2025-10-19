/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        loader:{
          "0%, 100%": {height: "20px", backgroundColor: "#818df873"},
          "50%": {height: "60px", backgroundColor: "#818cf8"}
        },
      },
      animation:{
        loader: "loader 1s ease-in-out infinite"
      }
    },
    screens: {
      'xs': '480px',
      'sm': '640px',   
      'md': '940px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
};
