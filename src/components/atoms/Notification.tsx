import { NotificationType } from "../../types/NotificationType.ts"
import TeamInvitation from "./TeamInvitation.tsx"

interface Notification {
    teamID: string | undefined
    userUID: string
    type: NotificationType["type"]
    notificationText: string
}

const Notification = ({
    notificationText,
    userUID,
    teamID,
    type
}: Notification) => {
    return (
        <div className={"flex flex-col"}>
            {type === "invitation" && (
                <TeamInvitation
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
