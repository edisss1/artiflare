import { useRef, useState } from "react"
import { Message } from "../../types/MessageType"
import MessageOptions from "./MessageOptions"

type ChatBubbleProps = {
    message: Message
    isUser: boolean
}

const ChatBubble = ({ message, isUser }: ChatBubbleProps) => {
    const bubbleRef = useRef<HTMLDivElement | null>(null)
    const contextMenuRef = useRef<HTMLDivElement | null>(null)
    const [y, setY] = useState<number | null>(null)

    const handleClickOutside = (e: MouseEvent) => {
        if (
            contextMenuRef.current &&
            !contextMenuRef.current.contains(e.target as Node)
        ) {
            setY(null)
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
                {message.messageText}
                {y && (
                    <MessageOptions
                        messageID={message.id}
                        y={y}
                        contextMenuRef={contextMenuRef}
                        isUser={isUser}
                    />
                )}
            </div>
        </div>
    )
}

export default ChatBubble
