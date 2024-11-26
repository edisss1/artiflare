import { NavLink } from "react-router-dom"

interface SettingsLinkProps {
    icon: React.ReactNode
    path: string
    to: string
}

const SettingsLink = ({ icon, to, path }: SettingsLinkProps) => {
    return (
        <NavLink
            className={"mb-4 flex items-center gap-2"}
            // to={`profile/${uid}`}
            to={path}
        >
            {/* <ProfileSettingsIcon /> */}
            {icon}
            {/* <p>Profile settings</p> */}
            <p>{to}</p>
        </NavLink>
    )
}
export default SettingsLink
