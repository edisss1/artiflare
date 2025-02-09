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
    const [contextMenu, setContextMenu] = useState<{
        x: number
        y: number
    } | null>(null)

    const handleClickOutside = (e: MouseEvent) => {
        if (
            contextMenuRef.current &&
            !contextMenuRef.current.contains(e.target as Node)
        ) {
            setContextMenu(null)
        }
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()

        const { pageX, pageY } = e

        const relativeY = pageY - bubbleRef.current!.getBoundingClientRect().y
        const relativeX = pageX - bubbleRef.current!.getBoundingClientRect().x

        setContextMenu({ x: relativeX, y: relativeY })

        document.addEventListener("click", handleClickOutside)
    }

    return (
        <div
            className={`group flex  relative ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
                ref={bubbleRef}
                onContextMenu={handleContextMenu}
                className={`max-w-[49%]   my-2 w-full p-4 rounded-md text-white ${
                    isUser
                        ? "bg-gray-400 text-left rounded-br-none "
                        : "bg-gray-500 text-left rounded-bl-none"
                }`}
            >
                {message.messageText}
            </div>
            {contextMenu && (
                <MessageOptions
                    contextMenuRef={contextMenuRef}
                    {...contextMenu}
                    isUser={isUser}
                />
            )}
        </div>
    )
}

export default ChatBubble
