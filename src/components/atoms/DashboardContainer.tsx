interface DashboardContainerProps {
    children: React.ReactNode
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
    return <div className="w-full py-4 px-8">{children}</div>
}
export default DashboardContainer
