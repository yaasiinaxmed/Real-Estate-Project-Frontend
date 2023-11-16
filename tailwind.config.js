/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#1E88E5",
        HeadingColor: "#222222"
      }
    },
  },
  plugins: [],
}

