import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import CopyLinkIcon from "../icons/CopyLinkIcon"
import EditIcon from "../icons/EditIcon"
import TrashCanIcon from "../icons/TrashCanIcon"
import Button from "./Button"
import { deleteMessage } from "../../redux/slices/messagingSlice"
import { t } from "i18next"

interface MessageOptionsProps {
    isUser: boolean
    contextMenuRef: React.MutableRefObject<HTMLDivElement | null>
    y: number | null
    messageID: string | undefined
    setEditingMode: React.Dispatch<React.SetStateAction<boolean>>
    editingInputRef: React.MutableRefObject<HTMLInputElement | null>
    onCopy: () => void
}

const MessageOptions = ({
    isUser,
    y,
    contextMenuRef,
    messageID,
    setEditingMode,
    editingInputRef,
    onCopy
}: MessageOptionsProps) => {
    const dispatch: AppDispatch = useDispatch()
    return (
        <div
            onContextMenu={(e) => e.preventDefault()}
            style={{ top: `${y}px` }}
            ref={contextMenuRef}
            className={`absolute  text-typography-dark flex px-2  rounded-lg py-2  w-full  max-w-[110px]   z-[9999] ${
                isUser
                    ? "bg-gray-400 dark:bg-gray-500 text-left  right-[calc(100%+3px)]  -translate-y-[50%]"
                    : "bg-gray-500 dark:bg-gray-600 text-left  left-[calc(100%+3px)]  -translate-y-[50%]"
            }`}
        >
            <div className="flex flex-col  gap-2">
                {isUser && (
                    <Button
                        onClick={() => {
                            setEditingMode(true)
                            editingInputRef.current?.focus()
                        }}
                        className="flex gap-2 items-center"
                    >
                        <EditIcon />
                        {t("edit")}
                    </Button>
                )}
                {isUser && (
                    <Button
                        onClick={() => dispatch(deleteMessage(messageID))}
                        className="flex gap-2 items-center"
                    >
                        <TrashCanIcon />
                        {t("delete")}
                    </Button>
                )}
                <Button onClick={onCopy} className="flex gap-2 items-center">
                    <CopyLinkIcon />
                    {t("copy")}
                </Button>
            </div>
        </div>
    )
}
export default MessageOptions
