interface MessageOptionsProps {
    isUser: boolean
    x: number
    y: number
    contextMenuRef: React.MutableRefObject<HTMLDivElement | null>
}

const MessageOptions = ({
    isUser,
    x,
    y,
    contextMenuRef
}: MessageOptionsProps) => {
    return (
        <div
            ref={contextMenuRef}
            style={{ top: `${y}px`, left: `${x}px` }}
            className={`absolute  text-typography-dark   w-full l max-w-[200px]   z-[300] ${
                isUser
                    ? "bg-gray-400 text-left rounded-br-none"
                    : "bg-gray-500 text-left rounded-bl-none"
            }`}
        ></div>
    )
}
export default MessageOptions
