import Button from "./Button"

interface TeamInvitationProps {
    teamID: string | undefined
    userUID: string
    type: string
    notificationText: string
}

const TeamInvitation = ({
    notificationText,
    teamID,
    userUID
}: TeamInvitationProps) => {
    return (
        <div className="flex flex-col items-start gap-2">
            <p>{notificationText}</p>
            <div className="flex gap-2">
                <Button className=" bg-secondary dark:text-typography-light min-w-[60px] p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-150">
                    Accept
                </Button>
                <Button className="border-2 border-typography-light dark:border-typography-dark rounded-lg min-w-[60px]   shadow-lg hover:shadow-xl transition-all duration-150">
                    Deny
                </Button>
            </div>
        </div>
    )
}
export default TeamInvitation
