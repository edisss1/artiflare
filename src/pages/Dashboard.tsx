import { useDispatch, useSelector } from "react-redux"
import BoardsContainer from "../components/atoms/BoardsContainer"
import Header from "../components/atoms/Header"
import DashboardSidebar from "../components/organisms/DashboardSidebar"
import { AppDispatch, RootState } from "../redux/store"
import { createBoard } from "../redux/slices/boardSlice"
import BoardsManagement from "../components/molecules/BoardsManagement"

const Dashboard = () => {
  return (
    <main className="dashboard">
      <DashboardSidebar />
      <div className="w-full py-4 px-8">
        <Header plan="free" />
        <BoardsManagement />
        <BoardsContainer />
      </div>
    </main>
  )
}
export default Dashboard
