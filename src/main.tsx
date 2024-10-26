import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Router from "./Router"
import { HashRouter } from "react-router-dom"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Router />
    </HashRouter>
  </StrictMode>
)

