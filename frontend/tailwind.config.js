/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Anton: ["Anton SC", "sans-serif"], // Add your Google Font here
      },
      colors :{
          walmartBlue: '#0071CE',
          walmartYellow: '#FFC120',
      },
      height:{
        '192':'45rem',
      }
    },
  },
  plugins: [],
}

