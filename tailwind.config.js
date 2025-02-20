/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "bg-light": "#FAFAFA",
                primary: "#E8F0FF",
                secondary: "#7BDFF2",
                "primary-dark": "#2A4158",
                "bg-dark": "#333333",
                "typography-light": "#333333",
                "typography-dark": "#FFFFFF",
                danger: "#FF0505",
                "danger-dark": "#E63946"
            },
            keyframes: {
                extend: { "0%": "h-0", "100%": "h-auto" },
                appear: { "0%": "opacity-0", "100%": "opacity-100" }
            },
            animation: {
                extend: "extend 0.3s ease-in-out",
                appear: "appear 0.3 ease-in"
            }
        }
    },
    plugins: []
}
