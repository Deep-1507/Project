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
        customGreen : "#45EB49"
      },
      height:{
        '192':'45rem',
      }
    },
  },
  plugins: [],
}

