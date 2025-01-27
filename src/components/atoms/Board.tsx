import { Link } from "react-router-dom"
import Button from "./Button"
import FavoritesIcon from "../icons/FavoritesIcon"
import { formatRelativeDate } from "../../utils/formatRelativeDate"
import Popover from "./Popover"
import PopoverBoardContent from "../molecules/PopoverBoardContent"
import { useRef, useState } from "react"
import { togglePopover } from "../../utils/togglePopover"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import {
    addBoardToFavorites,
    removeBoardsFromFavorites
} from "../../redux/slices/boardSlice"
import MoreIcon from "../icons/MoreIcon"
import { useTranslation } from "react-i18next"

interface BoardProps {
    id: string | undefined
    title: string | undefined
    createdBy: string | null
    modifiedBy: string | null
    updatedAt: string | null
    isFavorite: boolean
}

const Board = ({
    id,
    title,
    createdBy,
    modifiedBy,
    updatedAt,
    isFavorite
}: BoardProps) => {
    const dispatch: AppDispatch = useDispatch()
    const popoverRef = useRef<HTMLDivElement | null>(null)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const winowWidth = window.innerWidth
    const { t } = useTranslation()

    return (
        <div className="flex  flex-col relative border-2 gap-2 px-4 py-2 group hover:bg-primary dark:hover:bg-primary-dark/70 dark:hover:text-typography-dark    transition-colors duration-150 border-typography-light dark:border-typography-dark/40 rounded-md">
            <Link
                className="max-w-[200px] truncate text-lg"
                to={`/app/board/${id}`}
            >
                {title}
            </Link>
            <div className="flex max-lg:flex-col gap-2 max-xl:flex-col ">
                <p className={"max-w-[200px] truncate"}>
                    {t("createdBy")} {createdBy},
                </p>
                <div className={"flex gap-2"}>
                    <p className="max-w-[400px] truncate text-nowrap max-md:text-balance ">
                        {t("modified")}{" "}
                        {formatRelativeDate(updatedAt!).toLowerCase()} {t("by")}{" "}
                        {modifiedBy}
                    </p>
                </div>
            </div>
            <div
                className={`absolute top-[50%] right-4 -translate-y-[50%] flex items-center gap-4  ${
                    isPopoverOpen || winowWidth < 1024
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 "
                } max-xl:opacity-100 group-hover:opacity-100 transition-opacity duration-150`}
            >
                <Button
                    onClick={() =>
                        !isFavorite
                            ? dispatch(addBoardToFavorites(id))
                            : dispatch(removeBoardsFromFavorites(id))
                    }
                    className={`hover:bg-typography-dark/10 transition-colors duration-150 w-8 h-8 flex items-center justify-center rounded-sm `}
                >
                    <FavoritesIcon
                        fill={`${
                            isFavorite
                                ? "fill-typography-light dark:fill-typography-dark "
                                : ""
                        }`}
                    />
                </Button>
                <Button
                    onClick={() =>
                        togglePopover(isPopoverOpen, setIsPopoverOpen)
                    }
                    className="relative hover:bg-typography-dark/10 transition-colors duration-150 w-8 h-8 flex items-center justify-center rounded-sm"
                >
                    <MoreIcon />
                </Button>
                <Popover
                    popoverRef={popoverRef}
                    isPopoverOpen={isPopoverOpen}
                    setIsPopoverOpen={setIsPopoverOpen}
                    content={<PopoverBoardContent boardID={id} />}
                />
            </div>
        </div>
    )
}
export default Board
