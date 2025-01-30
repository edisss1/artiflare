import { useState } from "react"
import ChatBubble from "../atoms/ChatBubble"
import Button from "../atoms/Button"
import { Message } from "../../types/MessageType"
import ChevronIcon from "../icons/ChevronIcon"
import SendMessageIcon from "../icons/SendMessageIcon"
import FormInput from "../atoms/FormInput"
import User from "../atoms/User"

const ChatContainer = () => {
    const [chatExpanded, setChatExtended] = useState(false)

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            senderID: "1",
            senderName: "John Doe",
            receiverID: "2",
            receiverName: "Jane Doe",
            messageText: "Hello, how are you?",
            timestamp: new Date()
        },
        {
            id: "2",
            senderID: "2",
            senderName: "Jane Doe",
            receiverID: "1",
            receiverName: "John Doe",
            messageText: "I'm doing well, thanks for asking.",
            timestamp: new Date()
        }
    ])

    const currentUserID = "1"

    const handleChatExpanding = () => {
        setChatExtended(!chatExpanded)
    }

    return (
        <div
            role="chat"
            className={` w-full max-w-[320px] border-2 border-typography-light grid chat-grid ${
                chatExpanded ? "expanded " : "h-[56px]"
            }  bg-primary z-10 py-3 px-4 rounded-md `}
        >
            <div className="w-full relative flex justify-between items-center mb-4">
                <h3>Chat</h3>
                <Button
                    onClick={handleChatExpanding}
                    className="hover:bg-bg-dark/40 dark:hover:bg-bg-light/40 transition-colors duration-100 rounded-full p-1"
                >
                    <ChevronIcon
                        className={`${
                            chatExpanded ? "rotate-0" : "rotate-180"
                        } transition-all duration-150`}
                    />
                </Button>
            </div>
            <div
                className={`row-start-2  ${
                    chatExpanded
                        ? "visible h-auto"
                        : "invisible h-0 overflow-hidden"
                } animate-extend`}
            >
                {messages.map((message) => (
                    <ChatBubble
                        message={message}
                        isUser={message.senderID === currentUserID}
                    />
                ))}

                <div role="message input" className="relative mt-4 ">
                    <FormInput
                        bg={"bg-transparent"}
                        placeholder={"Enter your message"}
                        type="text"
                        onChange={() => {}}
                        value=""
                    />
                    <SendMessageIcon className="absolute right-2 top-[50%] -translate-y-[50%]" />
                </div>
            </div>
        </div>
    )
}

export default ChatContainer
