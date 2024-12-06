// Typewriter.tsx
import { useEffect, useState } from "react"

interface TypewriterSegment {
    range: [number, number]
    className: string
}

interface TypewriterProps {
    text: string
    delay: number
    styles?: TypewriterSegment[]
}

const Typewriter = ({ text, delay, styles = [] }: TypewriterProps) => {
    const [currentText, setCurrentText] = useState("")
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    useEffect(() => {
        if (currentTextIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + text[currentTextIndex])
                setCurrentTextIndex((prevIndex) => prevIndex + 1)
            }, delay)
            return () => clearTimeout(timeout)
        }
    }, [currentTextIndex, text, delay])

    const renderStyledText = () => {
        const result: JSX.Element[] = []
        let charIndex = 0

        while (charIndex < currentText.length) {
            const segment = styles.find(
                ({ range: [start, end] }) =>
                    charIndex >= start && charIndex <= end
            )

            if (segment) {
                const styledText = currentText.slice(
                    segment.range[0],
                    segment.range[1] + 1
                )
                result.push(
                    <span
                        key={`styled-${charIndex}`}
                        className={segment.className}
                    >
                        {styledText}
                    </span>
                )
                charIndex = segment.range[1] + 1
            } else {
                let unstyledEnd = charIndex
                while (
                    unstyledEnd < currentText.length &&
                    !styles.some(
                        ({ range: [start, end] }) =>
                            unstyledEnd >= start && unstyledEnd <= end
                    )
                ) {
                    unstyledEnd++
                }

                result.push(
                    <span key={`unstyled-${charIndex}`}>
                        {currentText.slice(charIndex, unstyledEnd)}
                    </span>
                )
                charIndex = unstyledEnd
            }
        }

        return result
    }

    return (
        <div>
            <h2 className="w-full animate-appear min-h-[80px] max-w-[700px] text-[clamp(1rem,6vw,1.6rem)]">
                {renderStyledText()}
            </h2>
        </div>
    )
}

export default Typewriter
