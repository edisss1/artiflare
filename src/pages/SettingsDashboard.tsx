import { Outlet, useLocation } from "react-router-dom"
import SettingsNav from "../components/organisms/SettingsNav"
import SettingsPanel from "../components/molecules/SettingsPanel.tsx"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store.ts"
import { useEffect, useState } from "react"

const SettingsDashboard = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [isPanelVisible, setIsPanelVisible] = useState(false)
    const location = useLocation()

    const handleOpenPanel = () => {
        setIsPanelVisible((prev) => !prev)
        console.log(isPanelVisible)
    }

    useEffect(() => {
        setIsPanelVisible(false)
    }, [location])

    return (
        <>
            <SettingsNav handleOpenPanel={handleOpenPanel} />
            <div className="px-[clamp(.5rem,5vw,5rem)] py-4 flex gap-4 justify-center max-lg:flex-col max-lg:items-center text-typography-light dark:text-typography-light relative">
                <SettingsPanel
                    isPanelVisible={isPanelVisible}
                    uid={user?.uid}
                />
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
