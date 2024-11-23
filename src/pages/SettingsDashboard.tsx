import { Outlet } from "react-router-dom"
import SettingsNav from "../components/organisms/SettingsNav"
import SettingsPanel from "../components/molecules/SettingsLinks.tsx"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store.ts"
import ProtectedRoute from "../components/organisms/ProtectedRoute.tsx"

const SettingsDashboard = () => {
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <ProtectedRoute>
            <SettingsNav />
            <div className="px-[clamp(1rem,40vw,5rem)] py-4 flex gap-4 justify-center max-lg:flex-col text-typography-light dark:text-typography-light">
                <SettingsPanel uid={user?.uid} />
                <div
                    className={
                        "w-full max-w-[900px] bg-primary p-4 rounded-md dark:bg-primary-dark dark:text-typography-dark"
                    }
                >
                    <Outlet />
                </div>
            </div>
        </ProtectedRoute>
    )
}
export default SettingsDashboard
