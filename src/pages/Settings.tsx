import { Outlet } from "react-router-dom"
import SettingsNav from "../components/organisms/SettingsNav"

const Settings = () => {
  return (
    <>
      <SettingsNav />
      <Outlet />
    </>
  )
}
export default Settings
