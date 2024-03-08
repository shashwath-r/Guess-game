/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "300px",
      sm: "450px",
      md: "750px",
      lg: "1000px",
    },
    extend: {
      boxShadow: {
        "3xl": "0 10px 20px -5px rgba(1, 1, 1, 1)",
      },
    },
    container: {
      padding: {
        md: "2rem",
        sm: "1rem",
        xs: "0.7rem",
      },
    },
  },
  plugins: [],
};
