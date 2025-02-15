import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { RootState } from "../../redux/store"
import ThemeSwitch from "../atoms/ThemeSwitch"

interface CanvasNavProps {
    position?: string
    themeSwitchVisible?: boolean
}

const CanvasNav = ({
    position = "absolute top-2 left-[5%] max-lg:hidden",
    themeSwitchVisible = false
}: CanvasNavProps) => {
    const { boards } = useSelector((state: RootState) => state.boards)
    const { boardID } = useParams()

    const currentBoard = boards.find((board) => board.id === boardID)

    return (
        <nav
            className={`${position} ${
                themeSwitchVisible ? "max-w-[210px] w-full" : "w-auto"
            } text-typography-light    z-40 dark:bg-primary-dark dark:text-typography-dark bg-primary py-2 px-4 rounded-md`}
        >
            <div className="flex gap-2 items-center justify-center">
                <Link className="text-xl " to={"/app/dashboard"}>
                    Artiflare
                </Link>
                <span>{">"}</span>
                <p className="max-w-[300px] text-lg w-full truncate">
                    {currentBoard?.boardTitle}
                </p>
                {themeSwitchVisible && <ThemeSwitch />}
            </div>
        </nav>
    )
}
export default CanvasNav
