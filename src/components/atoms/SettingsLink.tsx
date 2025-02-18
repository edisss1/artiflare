import { NavLink } from "react-router-dom"

interface SettingsLinkProps {
    icon: React.ReactNode
    path: string
    to: string
}

const SettingsLink = ({ icon, to, path }: SettingsLinkProps) => {
    return (
        <NavLink
            className={({ isActive }) =>
                ` mb-4 flex items-center gap-2 ${isActive && "font-semibold"} `
            }
            to={path}
            end
        >
            {icon}
            <p>{to}</p>
        </NavLink>
    )
}
export default SettingsLink
