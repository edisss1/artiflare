import { useSelector } from "react-redux"
import BoardsContainer from "../molecules/BoardsContainer"
import BoardsManagement from "../molecules/BoardsManagement"
import Header from "../molecules/Header"
import { RootState } from "../../redux/store"

const DashboardHome = () => {
    const { boards } = useSelector((state: RootState) => state.boards)

    return (
        <div className="w-full py-4 px-8">
            <Header plan="pro" />
            <BoardsManagement />
            <BoardsContainer boards={boards} />
        </div>
    )
}
export default DashboardHome
