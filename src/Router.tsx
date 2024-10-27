import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Login from "./components/molecules/Login"
import SignUp from "./components/molecules/SignUp"
import Dashboard from "./pages/Dashboard"
import DrawingBoard from "./pages/DrawingBoard"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route path="/app">
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="board" element={<DrawingBoard />} />
      </Route>
    </Routes>
  )
}

export default Router
