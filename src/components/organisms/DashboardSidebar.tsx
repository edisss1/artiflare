import React, { useEffect, useRef } from "react"
import DashboardLinksContainer from "../atoms/DashboardLinksContainer"
import Search from "../atoms/Search"
import User from "../atoms/User.tsx"
import BurgerMenuIcon from "../icons/BurgerMenuIcon.tsx"
import Button from "../atoms/Button.tsx"
import { AppDispatch, RootState } from "../../redux/store.ts"
import { useDispatch, useSelector } from "react-redux"
import { setIsMobileSidebarOpened } from "../../redux/slices/miscStatesSlice.ts"
import { useTranslation } from "react-i18next"
import { setBoardSearchQuery } from "../../redux/slices/boardSlice.ts"
import { handleClickOutside } from "../../utils/handleClickOutside.ts"
import { useLocation } from "react-router-dom"
import UpgradeButton from "../atoms/UpgradeButton.tsx"

const DashboardSidebar = () => {
    const sidebarRef = useRef<HTMLDivElement | null>(null)
    const { boardSearchQuery } = useSelector((state: RootState) => state.boards)
    const dispatch: AppDispatch = useDispatch()
    const { isMobileSidebarOpened } = useSelector(
        (state: RootState) => state.miscStates
    )
    const { user } = useSelector((state: RootState) => state.auth)
    const { t } = useTranslation()
    const location = useLocation()

    const handleSearchQueryChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(setBoardSearchQuery(e.target.value))
    }

    const handleMobileSideBarClose = () => {
        dispatch(setIsMobileSidebarOpened(false))
    }

    const windowWidth = window.innerWidth

    useEffect(() => {
        windowWidth > 768 &&
            !isMobileSidebarOpened &&
            dispatch(setIsMobileSidebarOpened(true))
    }, [windowWidth, isMobileSidebarOpened, dispatch])

    useEffect(() => {
        document.addEventListener("mousedown", (e) => {
            handleClickOutside(e, sidebarRef, handleMobileSideBarClose)
        })

        return () => {
            document.removeEventListener("mousedown", (e) => {
                handleClickOutside(e, sidebarRef, handleMobileSideBarClose)
            })
        }
    }, [])

    useEffect(() => {
        windowWidth < 1024 && dispatch(setIsMobileSidebarOpened(false))
    }, [location])

    return (
        <aside
            ref={sidebarRef}
            className={`w-full max-lg:absolute max-lg:z-40 max-lg:top-0 ${
                isMobileSidebarOpened ? "left-0 " : "-left-[1000px]"
            } h-screen py-9 px-4 min-w-fit max-w-[230px] bg-primary dark:bg-primary-dark dark:text-typography-dark border-r-2 border-r-typography-light min-h-[100dvh] relative transition-all duration-150 h- `}
        >
            <div className="gap-[clamp(1rem,40vh,5rem)] h-full flex flex-col relative">
                <div className="flex flex-col gap-4">
                    <Button
                        onClick={handleMobileSideBarClose}
                        className={"lg:hidden"}
                    >
                        <BurgerMenuIcon />
                    </Button>
                    <Search
                        placeholder={t("searchByTitle")}
                        onChange={(e) => handleSearchQueryChange(e)}
                        value={boardSearchQuery}
                    />
                </div>
                <DashboardLinksContainer />
                <div className="absolute bottom-8 left-0 flex gap-2 items-center">
                    <User />
                    {user?.plan === "free" && (
                        <UpgradeButton isHidden="md:hidden" />
                    )}
                </div>
            </div>
        </aside>
    )
}
export default DashboardSidebar
