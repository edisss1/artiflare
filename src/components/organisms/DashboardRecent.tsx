import { useDispatch, useSelector } from "react-redux"
import DashboardContainer from "../atoms/DashboardContainer"
import Header from "../molecules/Header"
import DashboardSidebar from "./DashboardSidebar"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import { getRecentBoards } from "../../redux/slices/boardSlice"
import BoardsManagement from "../molecules/BoardsManagement"
import BoardsContainer from "../molecules/BoardsContainer"

const DashboardRecent = () => {
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
                <BoardsManagement title="Recently modified boards" />
                <BoardsContainer boards={recentBoards} />
            </DashboardContainer>
        </main>
    )
}
export default DashboardRecent
