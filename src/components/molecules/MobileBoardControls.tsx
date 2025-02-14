import ThemeSwitch from "../atoms/ThemeSwitch"
import User from "../atoms/User"
import CanvasNav from "./CanvasNav"
import ChatContainer from "./ChatContainer"

const MobileBoardControls = () => {
    return (
        <div className="flex flex-col gap-4 items-start bg-bg-light dark:bg-bg-dark border-2 p-4 border-typography-light dark:border-typography-dark/40 rounded-lg">
            <div className="w-full flex justify-between items-center mb-8">
                <CanvasNav position="static " />
                <ThemeSwitch />
            </div>
            <User selfAlign="self-auto" />
            <ChatContainer />
        </div>
    )
}
export default MobileBoardControls
