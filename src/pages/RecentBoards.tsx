import { useDispatch, useSelector } from "react-redux"
import DashboardContainer from "../components/atoms/DashboardContainer"
import BoardsContainer from "../components/molecules/BoardsContainer"
import BoardsManagement from "../components/molecules/BoardsManagement"
import Header from "../components/molecules/Header"
import DashboardSidebar from "../components/organisms/DashboardSidebar"
import { AppDispatch, RootState } from "../redux/store"
import { getRecentBoards } from "../redux/slices/boardSlice"
import { useEffect } from "react"
import { t } from "i18next"

const RecentBoards = () => {
    const dispatch: AppDispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const recentBoards = useSelector(
        (state: RootState) => state.boards.recentBoards
    )

    useEffect(() => {
        if (user) {
            const unsubscribe = dispatch(getRecentBoards(user.uid))

            return () => unsubscribe()
        }
    }, [])

    return (
        <main className="dashboard">
            <DashboardSidebar />
            <DashboardContainer>
                <Header plan="pro" />
                <BoardsManagement title={t("recentlyModifiedBoards")} />
                <BoardsContainer boards={recentBoards} />
            </DashboardContainer>
        </main>
    )
}
export default RecentBoards
