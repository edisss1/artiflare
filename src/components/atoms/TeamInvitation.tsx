import { useDispatch } from "react-redux"
import { addNewUserToTeam } from "../../redux/slices/teamManagementSlice"
import { AppDispatch } from "../../redux/store"
import Button from "./Button"
import { deleteNotification } from "../../redux/slices/notificationManagementSlice"

interface TeamInvitationProps {
    teamID: string | undefined
    userUID: string | undefined
    type: string
    notificationText: string
    notificationID: string
}

const TeamInvitation = ({
    notificationText,
    teamID,
    userUID,
    notificationID
}: TeamInvitationProps) => {
    const dispatch: AppDispatch = useDispatch()

    return (
        <div className="flex flex-col items-start gap-2">
            <p>{notificationText}</p>
            <div className="flex gap-2">
                <Button
                    onClick={() => {
                        addNewUserToTeam(teamID, userUID)
                        dispatch(deleteNotification({ notificationID }))
                    }}
                    className=" bg-secondary dark:text-typography-light min-w-[60px] p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-150"
                >
                    Accept
                </Button>
                <Button
                    onClick={() =>
                        dispatch(deleteNotification({ notificationID }))
                    }
                    className="border-2 border-typography-light dark:border-typography-dark rounded-lg min-w-[60px]   shadow-lg hover:shadow-xl transition-all duration-150"
                >
                    Deny
                </Button>
            </div>
        </div>
    )
}
export default TeamInvitation
