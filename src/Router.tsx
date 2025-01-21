import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Loading from "./components/atoms/Loading"
import TermsOfService from "./pages/TermsOfService.tsx"
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx"
import ResetPassword from "./components/molecules/ResetPassword.tsx"
const SettingsDashboard = lazy(() => import("./pages/SettingsDashboard"))
const UserSettingsPanel = lazy(
    () => import("./components/organisms/UserSettingsPanel.tsx")
)
const TeamSettingsPanel = lazy(
    () => import("./components/organisms/TeamSettingsPanel")
)
const TeamMembersSettingsPanel = lazy(
    () => import("./components/organisms/TeamMembersSettingsPanel.tsx")
)
const FavoriteBoards = lazy(() => import("./pages/FavoriteBoards.tsx"))
const DashboardRecent = lazy(
    () => import("./components/organisms/DashboardRecent.tsx")
)
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
                    <Route path="reset-password" element={<ResetPassword />} />
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
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
        </Suspense>
    )
}

export default Router
