import { useRef, useState } from "react"
import { Message } from "../../types/MessageType"
import MessageOptions from "./MessageOptions"
import Button from "./Button"
import CheckMarkIcon from "../icons/CheckMarkIcon"
import { AppDispatch } from "../../redux/store"
import { useDispatch } from "react-redux"
import { submitEditedMessage } from "../../redux/slices/messagingSlice"

type ChatBubbleProps = {
    message: Message
    isUser: boolean
}

const ChatBubble = ({ message, isUser }: ChatBubbleProps) => {
    const dispatch: AppDispatch = useDispatch()
    const bubbleRef = useRef<HTMLDivElement | null>(null)
    const contextMenuRef = useRef<HTMLDivElement | null>(null)
    const [y, setY] = useState<number | null>(null)
    const [editingMode, setEditingMode] = useState(false)
    const editingInputRef = useRef<HTMLInputElement | null>(null)
    const [editedMessage, setEditedMessage] = useState(message.messageText)

    const handleClickOutside = (e: MouseEvent) => {
        if (
            contextMenuRef.current &&
            !contextMenuRef.current.contains(e.target as Node)
        ) {
            setY(null)
        }
    }

    const handleMessageEditing = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editedMessage && editingInputRef.current) {
            dispatch(
                submitEditedMessage({
                    messageID: message.id,
                    message: editedMessage
                })
            )
            setEditingMode(false)
            editingInputRef.current.blur()
        }
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (!bubbleRef.current) return

        const { pageY } = e

        const relativeY = pageY - bubbleRef.current.getBoundingClientRect().y

        setY(relativeY)

        document.addEventListener("click", handleClickOutside)
    }

    const handleMessageCopy = () => {
        navigator.clipboard.writeText(message.messageText)
        setY(null)
    }

    return (
        <div
            className={`group flex   ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
                ref={bubbleRef}
                onContextMenu={handleContextMenu}
                className={`max-w-[49%] relative overflow-visible  my-2 w-full p-4 rounded-md text-white ${
                    isUser
                        ? "bg-gray-400 text-left rounded-br-none "
                        : "bg-gray-500 text-left rounded-bl-none"
                }`}
            >
                {!editingMode && message.messageText}
                {editingMode && (
                    <form
                        onSubmit={handleMessageEditing}
                        className="flex items-center relative gap-2 after:content-[''] after:w-[80%] after:h-[2px] after:rounded-full after:bg-bg-dark
                            after:absolute after:top-full after:left-0  after:transition-all  group-focus-within:after:w-0 after:z-[60]"
                    >
                        <input
                            ref={editingInputRef}
                            onChange={(e) => setEditedMessage(e.target.value)}
                            className="w-full  bg-transparent text-left  ps-1 focus:outline-none rounded-lg"
                            value={editedMessage}
                        />
                        <Button type="submit" className="">
                            <CheckMarkIcon />
                        </Button>
                    </form>
                )}
                {y && (
                    <MessageOptions
                        editingInputRef={editingInputRef}
                        setEditingMode={setEditingMode}
                        messageID={message.id}
                        y={y}
                        contextMenuRef={contextMenuRef}
                        isUser={isUser}
                        onCopy={handleMessageCopy}
                    />
                )}
            </div>
        </div>
    )
}

export default ChatBubble
