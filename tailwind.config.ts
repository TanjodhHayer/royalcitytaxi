/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in `app/`
    "./components/**/*.{js,ts,jsx,tsx}", // Include components folder
    "./pages/**/*.{js,ts,jsx,tsx}", // If using `pages/`
    "./public/**/*.html", // Any static HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
