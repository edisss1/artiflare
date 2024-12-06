import { useEffect, useState } from "react"
import { handleClickOutside } from "../../utils/handleClickOutside"

interface PopoverProps {
    children: React.ReactNode
    popoverRef: React.MutableRefObject<HTMLDivElement | null>
}

const Popover = ({ children, popoverRef }: PopoverProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    useEffect(() => {
        document.addEventListener("mousedown", (e) =>
            handleClickOutside(e, popoverRef, isPopoverOpen, setIsPopoverOpen)
        )

        return () =>
            document.removeEventListener("mousedown", (e) =>
                handleClickOutside(
                    e,
                    popoverRef,
                    isPopoverOpen,
                    setIsPopoverOpen
                )
            )
    }, [])

    return (
        <div
            ref={popoverRef}
            className={` ${
                !isPopoverOpen
                    ? "opacity-0 hidden -z-40"
                    : "opacity-100 block z-40"
            } absolute p-4 bg-bg-light dark:bg-bg-dark top-full left-[50%] -translate-x-[50%]`}
        >
            {children}
        </div>
    )
}
export default Popover
