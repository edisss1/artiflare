import Button from "./Button.tsx"
import CloseIcon from "../icons/CloseIcon.tsx"
import ReadIcon from "../icons/shapes/ReadIcon.tsx"

function NotificationsContainerHeader(props: { onClick: () => void }) {
    return (
        <div className={"flex flex-col "}>
            <div className={"flex items-center  justify-between"}>
                <h2 className={"font-medium"}>Notifications</h2>
                <Button className={""} onClick={props.onClick}>
                    <CloseIcon />
                </Button>
            </div>
            <Button className="flex items-center  gap-2 mt-4">
                <ReadIcon />
                <p>Mark all as read</p>
            </Button>
        </div>
    )
}

export default NotificationsContainerHeader
