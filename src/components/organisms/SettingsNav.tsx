import { Link } from "react-router-dom"

import ThemeSwitch from "../atoms/ThemeSwitch.tsx"
import BoardsIcon from "../icons/BoardsIcon.tsx"

const SettingsNav = () => {
    return (
        <nav className="flex justify-between py-6 px-[clamp(.5rem,30vw,2.5rem)] rounded-b-md shadow-md items-center bg-primary dark:bg-primary-dark">
            <Link className="flex gap-4 w- items-center" to={"/app/dashboard"}>
                <BoardsIcon />
                <p>Go to boards</p>
            </Link>
            <ThemeSwitch />
        </nav>
    )
}
export default SettingsNav
