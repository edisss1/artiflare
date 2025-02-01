import React, { useEffect } from "react"
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

const DashboardSidebar = () => {
    const { boardSearchQuery } = useSelector((state: RootState) => state.boards)
    const dispatch: AppDispatch = useDispatch()
    const { isMobileSidebarOpened } = useSelector(
        (state: RootState) => state.miscStates
    )
    const { t } = useTranslation()

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

    return (
        <aside
            className={`w-full max-lg:absolute max-lg:z-40 max-lg:top-0 ${
                isMobileSidebarOpened ? "left-0 " : "-left-[1000px]"
            } h-screen py-9 px-4 min-w-fit max-w-[230px] bg-primary dark:bg-primary-dark dark:text-typography-dark border-r-2 border-r-typography-light min-h-screen relative transition-all duration-150 `}
        >
            <div className="gap-[clamp(1rem,40vh,5rem)] h-full flex flex-col relative">
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
                <DashboardLinksContainer />
                <User position="absolute bottom-0 left-0" />
            </div>
        </aside>
    )
}
export default DashboardSidebar
