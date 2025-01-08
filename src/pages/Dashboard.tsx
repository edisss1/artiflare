import DashboardSidebar from "../components/organisms/DashboardSidebar"
import DashboardHome from "../components/organisms/DashboardHome.tsx"

const Dashboard = () => {
    return (
        <main className="dashboard">
            <DashboardSidebar />
            <DashboardHome />
        </main>
    )
}
export default Dashboard
