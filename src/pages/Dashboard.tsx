import { useSelector } from "react-redux"
import Header from "../components/atoms/Header"
import DashboardSidebar from "../components/organisms/DashboardSidebar"
import UserBoardsContainer from "../components/organisms/UserBoardsContainer"
import { RootState } from "../redux/store"

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <main className="dashboard">
      <DashboardSidebar user={user} />
      <div className="w-full py-4 px-8">
        <Header plan="free" />
        <UserBoardsContainer />
      </div>
    </main>
  )
}
export default Dashboard
