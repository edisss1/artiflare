import { Link } from "react-router-dom"

import ThemeSwitch from "../atoms/ThemeSwitch.tsx"
import BoardsIcon from "../icons/BoardsIcon.tsx"
import Button from "../atoms/Button.tsx"
import BurgerMenuIcon from "../icons/BurgerMenuIcon.tsx"

interface SettingsNavProps {
    handleOpenPanel: () => void
}

const SettingsNav = ({ handleOpenPanel }: SettingsNavProps) => {
    return (
        <nav className="flex justify-between py-6 px-[clamp(.5rem,30vw,2.5rem)] rounded-b-md shadow-md items-center bg-primary dark:bg-primary-dark">
            <Button onClick={handleOpenPanel} className="w-8 lg:hidden">
                <BurgerMenuIcon />
            </Button>
            <div className="flex gap-8 lg:w-full lg:justify-between">
                <Link
                    className="flex gap-2 w-8 items-center"
                    to={"/app/dashboard"}
                >
                    <BoardsIcon />
                </Link>
                <ThemeSwitch />
            </div>
        </nav>
    )
}
export default SettingsNav
