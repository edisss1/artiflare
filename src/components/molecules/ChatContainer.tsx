import { useEffect, useState } from "react"
import ChatBubble from "../atoms/ChatBubble"
import Button from "../atoms/Button"
import ChevronIcon from "../icons/ChevronIcon"
import SendMessageIcon from "../icons/SendMessageIcon"
import FormInput from "../atoms/FormInput"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import { getMessages, sendMessage } from "../../redux/slices/messagingSlice"
import { useSelector } from "react-redux"
import { Message } from "../../types/MessageType"

const ChatContainer = () => {
    const dispatch: AppDispatch = useDispatch()
    const [chatExpanded, setChatExtended] = useState(false)
    const [message, setMessage] = useState("")
    const { user } = useSelector((state: RootState) => state.auth)
    const { messages } = useSelector((state: RootState) => state.messages)
    const [sortedMessages, setSortedMessages] = useState<Message[] | undefined>(
        []
    )

    const handleChatExpanding = () => {
        setChatExtended(!chatExpanded)
    }

    const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(
            sendMessage({
                roomID: user?.currentSelectedTeam,
                message,
                user
            })
        )

        setMessage("")
    }

    useEffect(() => {
        if (user && user.currentSelectedTeam) {
            getMessages(user?.currentSelectedTeam, dispatch)
        }
    }, [])

    useEffect(() => {
        setSortedMessages(
            messages
                ? [...messages].sort(
                      (a, b) =>
                          new Date(a.timestamp).getTime() -
                          new Date(b.timestamp).getTime()
                  )
                : []
        )
    }, [messages])

    return (
        <div
            role="chat"
            className={` w-full max-w-[320px]   border-2 border-typography-light grid chat-grid ${
                chatExpanded ? "expanded " : "h-[56px]"
            }  bg-primary dark:bg-primary-dark dark:text-typography-dark dark:border-bg-light/30 z-10 py-3 px-4 rounded-md `}
        >
            <div className="w-full relative flex justify-between items-center mb-4 ">
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
                <div className="max-h-[200px] px-1 overflow-y-auto custom-scrollbar-modal">
                    {sortedMessages &&
                        sortedMessages.map((message) => (
                            <ChatBubble
                                message={message}
                                isUser={message.senderID === user?.uid}
                            />
                        ))}
                </div>
                <form
                    onSubmit={handleMessageSubmit}
                    id="invitee-search"
                    // className="relative"
                    className="grid grid-cols-3 items-center mt-4 "
                >
                    <FormInput
                        autoComplete="off"
                        className="col-start-1 col-span-3 row-start-1 border-r-0 rounded-r-none "
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Search users by email or ID"
                        type="text"
                    />
                    <Button
                        type={"submit"}
                        // onClick={handleInviteeSearch}
                        className="bg-bg-light dark:bg-bg-dark z-40 row-start-1 px-3  h-full border-2 border-l-0 rounded-r-lg border-typography-light dark:border-typography-dark  "
                    >
                        <SendMessageIcon />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChatContainer
