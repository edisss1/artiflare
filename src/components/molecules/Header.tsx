import { Link } from "react-router-dom"
import ThemeSwitch from "../atoms/ThemeSwitch.tsx"
import Bell from "../icons/Bell.tsx"
import { useState } from "react"
import NotificationsContainer from "../organisms/NotificationsContainer.tsx"
import Button from "../atoms/Button.tsx"
import BurgerMenuIcon from "../icons/BurgerMenuIcon.tsx"
import { AppDispatch } from "../../redux/store.ts"
import { useDispatch } from "react-redux"
import { setIsMobileSidebarOpened } from "../../redux/slices/miscStatesSlice.ts"

type HeaderProps = {
    plan: string
}

const Header = ({ plan }: HeaderProps) => {
    const dispatch: AppDispatch = useDispatch()

    const [isContainerOpened, setIsContainerOpened] = useState(false)

    const handleNotificationsOpen = () => {
        setIsContainerOpened(true)
    }

    const handleNotificationsClose = () => {
        setIsContainerOpened(false)
    }

    const handleMobileSideBarOpen = () => {
        dispatch(setIsMobileSidebarOpened(true))
    }

    return (
        <nav className="flex justify-between relative  w-full  items-center ps-9 max-md:ps-2 py-2  dark:text-typography-dark text-typography-light  rounded-md ">
            <div className="flex gap-2 items-center">
                <Button
                    onClick={handleMobileSideBarOpen}
                    className={"md:hidden"}
                >
                    <BurgerMenuIcon />
                </Button>
                <Link className="text-xl" to={"/app/dashboard"}>
                    Artiflare
                </Link>
                <p className="uppercase rounded-lg bg-primary dark:bg-primary-dark  dark:text-typography-dark text-typography-light px-4 py-1">
                    {plan}
                </p>
            </div>
            <div className="flex items-center gap-6 ">
                {plan === "free" && (
                    <Button className="capitalize px-2 py-1  text-typography-light bg-secondary rounded-lg  ">
                        upgrade
                    </Button>
                )}

                <div className="flex gap-4 items-center justify-center">
                    <Button
                        ariaLabel="Open notifications"
                        onClick={handleNotificationsOpen}
                        className={"w-8"}
                    >
                        <Bell />
                    </Button>
                    <ThemeSwitch />
                </div>
            </div>
            <NotificationsContainer
                closeContainer={handleNotificationsClose}
                isContainerOpened={isContainerOpened}
            />
        </nav>
    )
}
export default Header
