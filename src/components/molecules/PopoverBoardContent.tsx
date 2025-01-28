import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { deleteBoard } from "../../redux/slices/boardSlice"
import TrashCanIcon from "../icons/TrashCanIcon"
import PencilIcon from "../icons/shapes/PencilIcon"

interface PopoverBoardContentProps {
    boardID: string | undefined
}

const PopoverBoardContent = ({ boardID }: PopoverBoardContentProps) => {
    const dispatch: AppDispatch = useDispatch()

    return (
        <div>
            <button
                className="flex gap-2 items-center"
                onClick={() => dispatch(deleteBoard(boardID))}
            >
                <TrashCanIcon />
                <p>Delete board</p>
            </button>
            <button>
                <PencilIcon />
                Rename board
            </button>
        </div>
    )
}
export default PopoverBoardContent
