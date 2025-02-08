import { Message } from "../../types/MessageType"

type ChatBubbleProps = {
    message: Message
    isUser: boolean
}

const ChatBubble = ({ message, isUser }: ChatBubbleProps) => {
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[130px] w-full p-4 rounded-md text-white ${
                    isUser
                        ? "bg-gray-400 text-left rounded-br-none"
                        : "bg-gray-500 text-left rounded-bl-none"
                }`}
            >
                {message.messageText}
            </div>
        </div>
    )
}

export default ChatBubble
