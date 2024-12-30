import { NotificationType } from "../../types/NotificationType.ts"
import NotificationsContainerHeader from "../atoms/NotificationsContainerHeader.tsx"
import Notification from "../atoms/Notification.tsx"

interface NotificationsProps {
    isContainerOpened: boolean
    closeContainer: () => void
    notifications: NotificationType[]
}

const NotificationsContainer = ({
    isContainerOpened,
    closeContainer,
    notifications
}: NotificationsProps) => {
    return (
        <aside
            className={`bg-primary p-4 dark:bg-primary-dark fixed h-screen w-full drop-shadow-2xl max-w-[300px] z-10 right-0 top-0 ${
                !isContainerOpened ? "translate-x-full" : "translate-x-0"
            } transition-all duration-150 ease-in `}
        >
            <NotificationsContainerHeader onClick={closeContainer} />
            <div className={"mt-4"}>
                {notifications.length === 0 && (
                    <p
                        className={
                            "text-center text-balance text-sm mt-8 opacity-70"
                        }
                    >
                        You don’t have any notifications yet
                    </p>
                )}
                {notifications.map((notification) => (
                    <Notification notification={notification} />
                ))}
            </div>
        </aside>
    )
}
export default NotificationsContainer
