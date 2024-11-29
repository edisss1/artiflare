import { Outlet } from "react-router-dom"
import SettingsNav from "../components/organisms/SettingsNav"
import SettingsPanel from "../components/molecules/SettingsPanel.tsx"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store.ts"

const SettingsDashboard = () => {
    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <>
            <SettingsNav />
            <div className="px-[clamp(1rem,40vw,5rem)] py-4 flex gap-4 justify-center max-lg:flex-col max-lg:items-center text-typography-light dark:text-typography-light">
                <SettingsPanel uid={user?.uid} />
                <div
                    className={
                        "w-full max-w-[900px] bg-primary  rounded-md dark:bg-primary-dark dark:text-typography-dark"
                    }
                >
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default SettingsDashboard
