// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Router from "./Router"
import { HashRouter } from "react-router-dom"
import "../main.css"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import AuthChecker from "./components/atoms/AuthChecker"
import "./utils/i18n"

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <HashRouter>
        <Provider store={store}>
            <AuthChecker>
                <Router />
            </AuthChecker>
        </Provider>
    </HashRouter>
    // </StrictMode>
)
