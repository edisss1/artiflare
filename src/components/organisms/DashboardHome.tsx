import { useSelector } from "react-redux"
import BoardsContainer from "../molecules/BoardsContainer"
import BoardsManagement from "../molecules/BoardsManagement"
import Header from "../molecules/Header"
import { AppDispatch, RootState } from "../../redux/store"
import DashboardContainer from "../atoms/DashboardContainer"
import { useEffect } from "react"
import { fetchAllUserBoards } from "../../redux/slices/boardSlice"
import { useDispatch } from "react-redux"

const DashboardHome = () => {
    const dispatch: AppDispatch = useDispatch()
    const { boards } = useSelector((state: RootState) => state.boards)
    const { user } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (user) {
            const unsubscribe = dispatch(fetchAllUserBoards(user.uid))

            return () => unsubscribe()
        }
    }, [])

    return (
        <DashboardContainer>
            <Header plan="pro" />
            <BoardsManagement title="Your boards" />
            <BoardsContainer boards={boards} />
        </DashboardContainer>
    )
}
export default DashboardHome
