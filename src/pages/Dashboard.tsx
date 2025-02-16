import DashboardSidebar from "../components/organisms/DashboardSidebar"
import DashboardHome from "../components/organisms/DashboardHome.tsx"
import { useEffect } from "react"

const Dashboard = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden"
    }, [])

    return (
        <main className="dashboard">
            <DashboardSidebar />
            <DashboardHome />
        </main>
    )
}
export default Dashboard
