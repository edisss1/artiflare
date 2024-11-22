/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "bg-light": "#FFFFFF",
                primary: "#E8F0FF",
                secondary: "#7BDFF2",
                "primary-dark": "#010918",
                "bg-dark": "#333333",
                "typography-light": "#333333",
                "typography-dark": "#FFFFFF",
                danger: "#FF0505"
            },
            keyframes: {
                extend: { "0%": "h-0", "100%": "h-auto" }
            },
            animation: {
                extend: "extend 0.3s ease-in-out"
            }
        }
    },
    plugins: []
}
