import { useEffect, useState } from "react"

interface TypewriterProps {
    text: string
    delay: number
}

const Typewriter = ({ text, delay }: TypewriterProps) => {
    const [currentText, setCurrentText] = useState("")
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    useEffect(() => {
        if (currentTextIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prevText) => prevText + text[currentTextIndex])
                setCurrentTextIndex((prevIndex) => prevIndex + 1)
            }, delay)
            return () => clearTimeout(timeout)
        }
    }, [delay, currentTextIndex, text])

    return (
        <div>
            <h2 className="w-full min-h-[80px] max-w-[700px]  text-[clamp(1rem,6vw,1.6rem)] ">
                {currentText}
            </h2>
        </div>
    )
}
export default Typewriter
