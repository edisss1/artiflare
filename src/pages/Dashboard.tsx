import Header from "../components/atoms/Header"
import DashboardSidebar from "../components/organisms/DashboardSidebar"
import UserBoardsContainer from "../components/organisms/UserBoardsContainer"

const Dashboard = () => {
  return (
    <main className="dashboard">
      <DashboardSidebar />
      <div className="w-full py-4 px-8">
        <Header plan="free" />
        <UserBoardsContainer />
      </div>
    </main>
  )
}
export default Dashboard
