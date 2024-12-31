import React, { useEffect } from "react"

interface PopoverProps {
    content: React.ReactNode
    popoverRef: React.MutableRefObject<HTMLDivElement | null>
    isPopoverOpen: boolean
    setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Popover = ({
    popoverRef,
    isPopoverOpen,
    setIsPopoverOpen,
    content
}: PopoverProps) => {
    const handleClickOutside = (e: MouseEvent) => {
        if (
            popoverRef.current &&
            !popoverRef.current.contains(e.target as Node)
        ) {
            setIsPopoverOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div
            className={`${
                isPopoverOpen ? "block" : "hidden"
            } absolute top-full left-[50%]  -translate-x-[50%] bg-primary dark:bg-primary-dark p-4 w-[170px] shadow-lg rounded-md`}
            ref={popoverRef}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
            <div>{isPopoverOpen && <div>{content}</div>}</div>
        </div>
    )
}
export default Popover
