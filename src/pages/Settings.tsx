import { Outlet } from "react-router-dom"
import SettingsNav from "../components/organisms/SettingsNav"
import SettingsPanel from "../components/molecules/SettingsPanel"

const Settings = () => {
  return (
    <>
      <SettingsNav />
      <div className="px-[clamp(1rem,40vw,5rem)] py-4">
        <SettingsPanel />
      </div>
      <Outlet />
    </>
  )
}
export default Settings
