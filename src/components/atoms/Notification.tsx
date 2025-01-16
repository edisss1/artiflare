import { NotificationType } from "../../types/NotificationType.ts"
import TeamInvitation from "./TeamInvitation.tsx"

interface Notification {
    teamID: string | undefined
    userUID: string | undefined
    type: NotificationType["type"]
    notificationText: string
    notificationID: string
}

const Notification = ({
    notificationText,
    userUID,
    teamID,
    type,
    notificationID
}: Notification) => {
    return (
        <div className={"flex flex-col"}>
            {type === "invitation" && (
                <TeamInvitation
                    notificationID={notificationID}
                    notificationText={notificationText}
                    teamID={teamID}
                    userUID={userUID}
                    type={type}
                />
            )}
        </div>
    )
}
export default Notification
