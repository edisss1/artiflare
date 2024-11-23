import BoardsContainer from "../components/molecules/BoardsContainer"
import Header from "../components/molecules/Header.tsx"
import DashboardSidebar from "../components/organisms/DashboardSidebar"
import BoardsManagement from "../components/molecules/BoardsManagement"
import { useState } from "react"

const Dashboard = () => {
    const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false)

    return (
        <main className="dashboard">
            <DashboardSidebar
                setIsMobileSidebarOpened={setIsMobileSidebarOpened}
                isMobileSidebarOpened={isMobileSidebarOpened}
            />
            <div className="w-full py-4 px-8">
                <Header
                    plan="free"
                    setIsMobileSidebarOpened={setIsMobileSidebarOpened}
                />
                <BoardsManagement />
                <BoardsContainer />
            </div>
        </main>
    )
}
export default Dashboard
