import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Loading from "./components/atoms/Loading"
import SettingsDashboard from "./pages/SettingsDashboard"
import UserSettingsPanel from "./components/organisms/UserSettingsPanel.tsx"
import TeamSettingsPanel from "./components/organisms/TeamSettingsPanel.tsx"
import TeamMembersSettingsPanel from "./components/organisms/TeamMembersSettingsPanel.tsx"
import FavoriteBoards from "./pages/FavoriteBoards.tsx"
import DashboardRecent from "./components/organisms/DashboardRecent.tsx"
import PageNotFound from "./components/atoms/PageNotFound.tsx"
const Home = lazy(() => import("./pages/Home"))
const Auth = lazy(() => import("./pages/Auth"))
const Login = lazy(() => import("./components/molecules/Login"))
const SignUp = lazy(() => import("./components/molecules/SignUp"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const DrawingBoard = lazy(() => import("./pages/DrawingBoard"))

function Router() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                <Route path="/app">
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="recent" element={<DashboardRecent />} />
                    <Route path="favorites" element={<FavoriteBoards />} />
                    <Route path="board/:boardID" element={<DrawingBoard />} />
                    <Route path="settings/" element={<SettingsDashboard />}>
                        <Route
                            path="profile/:userID"
                            element={<UserSettingsPanel />}
                        />
                        <Route
                            path="team/:currentTeamID"
                            element={<TeamSettingsPanel />}
                        />
                        <Route
                            path="team/:currentTeamID/members"
                            element={<TeamMembersSettingsPanel />}
                        />
                        <Route
                            path="*"
                            element={<Navigate to={"/app/dashboard"} />}
                        />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    )
}

export default Router
