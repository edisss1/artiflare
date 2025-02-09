import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { RootState } from "../../redux/store"
import ThemeSwitch from "../atoms/ThemeSwitch"

const CanvasNav = () => {
    const { boards } = useSelector((state: RootState) => state.boards)
    const { boardID } = useParams()

    const currentBoard = boards.find((board) => board.id === boardID)

    return (
        <nav className="absolute top-2 left-[5%] text-typography-light w-full max-w-[200px] z-40 dark:bg-primary-dark dark:text-typography-dark bg-primary p-2 rounded-md">
            <div className="flex gap-2 items-center justify-center">
                <Link className="text-xl " to={"/app/dashboard"}>
                    Artiflare
                </Link>
                <span>{">"}</span>
                <p className="max-w-[300px] text-lg w-full truncate">
                    {currentBoard?.boardTitle}
                </p>
                <ThemeSwitch />
            </div>
        </nav>
    )
}
export default CanvasNav
