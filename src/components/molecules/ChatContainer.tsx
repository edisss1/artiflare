import { useEffect, useRef, useState } from "react"
import ChatBubble from "../atoms/ChatBubble"
import Button from "../atoms/Button"
import ChevronIcon from "../icons/ChevronIcon"
import SendMessageIcon from "../icons/SendMessageIcon"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import { getMessages, sendMessage } from "../../redux/slices/messagingSlice"
import { useSelector } from "react-redux"
import { Message } from "../../types/MessageType"
import { t } from "i18next"
import { validateInput } from "../../utils/validateInput"

const ChatContainer = () => {
    const dispatch: AppDispatch = useDispatch()
    const [chatExpanded, setChatExtended] = useState(false)
    const [message, setMessage] = useState("")
    const { user } = useSelector((state: RootState) => state.auth)
    const { messages } = useSelector((state: RootState) => state.messages)
    const [sortedMessages, setSortedMessages] = useState<Message[] | undefined>(
        []
    )
    const [isMessageValid, setIsMessageValid] = useState(false)
    const messagesRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        validateInput(message, setIsMessageValid)
        console.log(isMessageValid)
    }, [message])

    const handleChatExpanding = () => {
        setChatExtended(!chatExpanded)
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
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

        setTimeout(() => {
            if (messagesRef.current) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight
            }
        }, 200)
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
            className={` w-full max-w-[350px]   flex flex-col justify-end    border-2 border-typography-light  chat-grid ${
                chatExpanded
                    ? "h-[300px] "
                    : "h-[56px] items-center justify-center"
            }  bg-primary dark:bg-primary-dark dark:text-typography-dark dark:border-bg-light/30 z-10 py-3 px-4 rounded-md `}
        >
            <div
                className={`w-full relative flex justify-between items-center ${
                    chatExpanded ? "mb-6" : "mb-0"
                }  `}
            >
                <h3>{t("chatTitle")}</h3>
                <Button
                    onClick={handleChatExpanding}
                    className="hover:bg-bg-dark/40 dark:hover:bg-bg-light/40 transition-colors duration-100 rounded-full p-1"
                >
                    <ChevronIcon
                        className={`${
                            chatExpanded ? "rotate-0" : "rotate-180"
                        } transition-all duration-150 [&>*]:dark:stroke-bg-light`}
                    />
                </Button>
            </div>
            <div
                className={` ${
                    chatExpanded
                        ? "visible h-full max-h-[220px]"
                        : "invisible h-0"
                } animate-extend flex flex-col justify-end `}
            >
                <div
                    className="flex-1 max-h-[300px] overflow-y-auto px-1 custom-scrollbar-modal"
                    ref={messagesRef}
                >
                    {sortedMessages &&
                        sortedMessages.map((message) => (
                            <ChatBubble
                                key={message.id}
                                message={message}
                                isUser={message.senderID === user?.uid}
                            />
                        ))}
                </div>
                <form
                    onSubmit={handleMessageSubmit}
                    id="message-submit"
                    className="grid grid-cols-3 items-center mt-4  "
                >
                    <input
                        autoComplete="off"
                        className="col-start-1 col-span-3 row-start-1 border-r-0 rounded-r-none py-[0.9375rem] w-full peer ps-3 outline-none rounded-md bg-bg-light dark:bg-bg-dark dark:text-typography-dark border-2 border-typography-light dark:border-typography-dark dark:placeholder:text-typography-dark"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t("enterMessage")}
                        type="text"
                    />
                    <Button
                        type={"submit"}
                        disabled={!isMessageValid}
                        className="disabled:cursor-not-allowed  z-40 row-start-1 px-3  h-full border-2 border-l-0 rounded-r-lg border-typography-light dark:border-typography-dark bg-bg-light dark:bg-bg-dark dark:text-typography-dark "
                    >
                        <SendMessageIcon className="[&>*]:stroke-bg-dark [&>*]:dark:stroke-bg-light" />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChatContainer
