/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JSX/TSX files in src
  ],
  theme: {
    extend: {}, // Extend default Tailwind styles if needed
  },
  plugins: [], // Add Tailwind plugins here if required
};