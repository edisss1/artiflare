import { useEffect, useState } from "react"
import { scrollToCoords } from "../../utils/scrollToCoords"

interface ScrollToProps {
    x: number
    y: number
    children: React.ReactNode
}

const ScrollTo = ({ x, y, children }: ScrollToProps) => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <button
            onClick={() => scrollToCoords(x, y)}
            className={`z-40 dark:bg-typography-light  flex gap-1 items-center justify-center fixed right-8 bottom-12 ${
                !isScrolled ? "opacity-0" : "opacity-100"
            } hover:bg-bg-dark/60 px-4 py-2 rounded-md transition-all duration-150 `}
        >
            {children}
        </button>
    )
}
export default ScrollTo
