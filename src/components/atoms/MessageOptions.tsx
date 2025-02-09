import CopyLinkIcon from "../icons/CopyLinkIcon"
import EditIcon from "../icons/EditIcon"
import TrashCanIcon from "../icons/TrashCanIcon"
import Button from "./Button"

interface MessageOptionsProps {
    isUser: boolean

    contextMenuRef: React.MutableRefObject<HTMLDivElement | null>
}

const MessageOptions = ({
    isUser,

    contextMenuRef
}: MessageOptionsProps) => {
    const buttonsContent = [
        { icon: <EditIcon />, text: "Edit", isUser },
        { icon: <TrashCanIcon />, text: "Delete", isUser },
        { icon: <CopyLinkIcon />, text: "Copy", isUser }
    ]

    return (
        <div
            onContextMenu={(e) => e.preventDefault()}
            ref={contextMenuRef}
            className={`absolute  text-typography-dark flex px-2  rounded-lg py-2  w-full  max-w-[100px]   z-[9999] ${
                isUser
                    ? "bg-gray-400 dark:bg-gray-500 text-left  right-[calc(100%+3px)] top-[50%] -translate-y-[50%]"
                    : "bg-gray-500 dark:bg-gray-600 text-left  left-[calc(100%+3px)] top-[50%] -translate-y-[50%]"
            }`}
        >
            <div className="flex flex-col  gap-2">
                {/* {isUser && (
                    <Button className="flex gap-2 items-center">
                        <EditIcon />
                        Edit
                    </Button>
                )}
                {isUser && <Button className="">Delete</Button>}
                <Button className="">Copy</Button> */}
                {buttonsContent.map((button, index) => (
                    <Button
                        key={index}
                        className={`${
                            !isUser && button.text !== "Copy" && "hidden"
                        } flex gap-2 items-center`}
                    >
                        {button.icon}
                        {button.text}
                    </Button>
                ))}
            </div>
        </div>
    )
}
export default MessageOptions
