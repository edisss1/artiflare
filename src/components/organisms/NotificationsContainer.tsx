import NotificationsContainerHeader from "../atoms/NotificationsContainerHeader.tsx"
import Notification from "../atoms/Notification.tsx"
import Button from "../atoms/Button.tsx"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store.ts"
import { getNotificationsForUser } from "../../redux/slices/notificationManagementSlice.ts"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { t } from "i18next"

interface NotificationsProps {
    isContainerOpened: boolean
    closeContainer: () => void
}

const NotificationsContainer = ({
    isContainerOpened,
    closeContainer
}: NotificationsProps) => {
    const { notifications } = useSelector(
        (state: RootState) => state.notificationManagement
    )
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        if (user) {
            const unsubscribe = dispatch(getNotificationsForUser(user.uid))

            return () => unsubscribe()
        }
    }, [])

    return (
        <aside
            className={`bg-primary  dark:bg-primary-dark fixed h-screen flex flex-col justify-between w-full drop-shadow-2xl max-w-[350px] z-10 right-0 top-0 ${
                !isContainerOpened ? "translate-x-full" : "translate-x-0"
            } transition-all duration-150 ease-in `}
        >
            <div className="p-4">
                <NotificationsContainerHeader onClick={closeContainer} />

                {notifications.map((notification) => {
                    const inviteeID = notification.receiversID.find(
                        (id) => id === user?.uid
                    )

                    return (
                        <Notification
                            key={notification.id}
                            type={notification.type}
                            notificationText={notification.notificationText}
                            notificationID={notification.id}
                            teamID={notification.teamID}
                            userUID={inviteeID}
                        />
                    )
                })}
            </div>

            <div className=" p-4 border-t-2 border-typography-light/30 dark:border-typography-dark/30">
                <Button className="">{t("viewAllNotifications")}</Button>
            </div>
        </aside>
    )
}
export default NotificationsContainer
