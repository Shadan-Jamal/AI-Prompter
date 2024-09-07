/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        footer : "200px minmax(250px,1fr) 100px"
      }
    },
  },
  plugins: [],
}

