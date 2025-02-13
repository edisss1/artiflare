import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "process.env.IS_PREACT": JSON.stringify("true")
    },
    base: "/artiflare/",
    build: {
        target: "esnext"
    }
})
