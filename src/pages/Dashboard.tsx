import { useDispatch, useSelector } from "react-redux"
import BoardsContainer from "../components/atoms/BoardsContainer"
import Header from "../components/atoms/Header"
import DashboardSidebar from "../components/organisms/DashboardSidebar"
import UserBoardsContainer from "../components/organisms/UserBoardsContainer"
import { AppDispatch, RootState } from "../redux/store"
import { createBoard } from "../redux/slices/boardSlice"

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const createNewBoard = async () => {
    const title = prompt("Enter title for board:")
    if (title && user) {
      dispatch(createBoard({ user, title }))
    }
  }

  return (
    <main className="dashboard">
      <DashboardSidebar />
      <div className="w-full py-4 px-8">
        <button onClick={createNewBoard}>Create new</button>
        <Header plan="free" />
        <UserBoardsContainer />
        <BoardsContainer />
      </div>
    </main>
  )
}
export default Dashboard
