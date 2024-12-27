const Loading = () => {
    return (
        <div className="bg-bg-light dark:bg-bg-dark absolute h-screen w-screen inset-0 flex items-center justify-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-secondary animate-ping"></div>
            <div className="h-3 w-3 rounded-full bg-secondary animate-ping"></div>
            <div className="h-3 w-3 rounded-full bg-secondary animate-ping"></div>
        </div>
    )
}
export default Loading
