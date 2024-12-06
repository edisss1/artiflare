import { Link } from "react-router-dom"
import Button from "./Button"
import favorite from "../../assets/Favorite.svg"
import more from "../../assets/More.svg"
import { formatRelativeDate } from "../../utils/formatRelativeDate"
import Popover from "./Popover"
import PopoverBoardContent from "../molecules/PopoverBoardContent"
import { useRef, useState } from "react"
import { togglePopover } from "../../utils/togglePopover"

interface BoardProps {
    id: string | undefined
    title: string | undefined
    createdBy: string | null
    modifiedBy: string | null
    updatedAt: string | null
}

const Board = ({ id, title, createdBy, modifiedBy, updatedAt }: BoardProps) => {
    const popoverRef = useRef<HTMLDivElement | null>(null)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    return (
        <div className="flex flex-col relative border-2 gap-2 px-4 py-2 group hover:bg-primary dark:hover:bg-primary-dark/70 dark:hover:text-typography-dark    transition-colors duration-150 border-typography-light dark:border-typography-dark/40 rounded-md">
            <Link
                className="max-w-[200px] truncate text-lg"
                to={`/app/board/${id}`}
            >
                {title}
            </Link>
            <div className="flex gap-2 max-xl:flex-col ">
                <p className={"max-w-[200px] truncate"}>
                    Created by {createdBy},
                </p>
                <div className={"flex gap-2"}>
                    <p className="max-w-[200px] truncate text-nowrap ">
                        Modified {formatRelativeDate(updatedAt!).toLowerCase()}{" "}
                        by {modifiedBy}
                    </p>
                </div>
            </div>
            <div className="absolute top-[50%] right-4 -translate-y-[50%] flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <Button
                    onClick={() => alert("WIP")}
                    className="hover:bg-slate-200 transition-colors duration-150 w-8 h-8 flex items-center justify-center rounded-sm"
                >
                    <img className="w-6" src={favorite} alt="" />
                </Button>
                <Button
                    onClick={() =>
                        togglePopover(isPopoverOpen, setIsPopoverOpen)
                    }
                    className="relative hover:bg-slate-200 transition-colors duration-150 w-8 h-8 flex items-center justify-center rounded-sm"
                >
                    <img className="w-6" src={more} alt="" />
                </Button>
                <Popover popoverRef={popoverRef}>
                    <PopoverBoardContent boardID={id} />
                </Popover>
            </div>
        </div>
    )
}
export default Board
