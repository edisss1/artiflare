import { useDispatch } from "react-redux"
import DashboardContainer from "../components/atoms/DashboardContainer"
import BoardsContainer from "../components/molecules/BoardsContainer"
import BoardsManagement from "../components/molecules/BoardsManagement"
import Header from "../components/molecules/Header"
import DashboardSidebar from "../components/organisms/DashboardSidebar"
import { AppDispatch, RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { getFavoriteBoards } from "../redux/slices/boardSlice"
import { t } from "i18next"

const FavoriteBoards = () => {
    const dispatch: AppDispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)

    const favoriteBoards = useSelector(
        (state: RootState) => state.boards.favoriteBoards
    )

    useEffect(() => {
        if (user) {
            const unsubscribe = dispatch(getFavoriteBoards(user.uid))

            return () => unsubscribe()
        }
    }, [])

    return (
        <main className="dashboard">
            <DashboardSidebar />
            <DashboardContainer>
                <Header />
                <BoardsManagement title={t("favoriteBoards")} />
                <BoardsContainer boards={favoriteBoards} />
            </DashboardContainer>
        </main>
    )
}
export default FavoriteBoards
