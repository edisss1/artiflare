import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/atoms/Loading";
import SettingsDashboard from "./pages/SettingsDashboard";
import UserSettingsPanel from "./components/organisms/UserSettingsPanel.tsx";
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Login = lazy(() => import("./components/molecules/Login"));
const SignUp = lazy(() => import("./components/molecules/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DrawingBoard = lazy(() => import("./pages/DrawingBoard"));

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
          <Route path="recent" />
          <Route path="favorites" />
          <Route path="board/:boardID" element={<DrawingBoard />} />
          <Route path="settings" element={<SettingsDashboard />}>
            <Route path="profile/:userID" element={<UserSettingsPanel />} />
            <Route path="team/:teamID">
              <Route path="members" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Router;
