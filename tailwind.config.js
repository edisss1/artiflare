/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-light": "#FFFFFF",
        primary: "#F3EFF5",
        secondary: "#F2C40C",
        "primary-dark": "#2C2A30",
        "bg-dark": "#333333",
        "typography-light": "#333333",
        "typography-dark": "#FFFFFF",
        danger: "#FF0505",
      },
    },
  },
  plugins: [],
};
