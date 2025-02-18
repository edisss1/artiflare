import React from "react"

interface TextContainerProps {
    children: React.ReactNode
}

const TextContainer = ({ children }: TextContainerProps) => {
    return (
        <div className="flex flex-col items-center mt-8 max-w-[700px] mx-auto max-md:mx-4">
            {children}
        </div>
    )
}
export default TextContainer
