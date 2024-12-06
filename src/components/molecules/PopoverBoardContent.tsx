import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { deleteBoard } from "../../redux/slices/boardSlice"

interface PopoverBoardContentProps {
    boardID: string | undefined
}

const PopoverBoardContent = ({ boardID }: PopoverBoardContentProps) => {
    const dispatch: AppDispatch = useDispatch()

    return (
        <div>
            <button onClick={() => dispatch(deleteBoard(boardID))}>
                Delete board
            </button>
        </div>
    )
}
export default PopoverBoardContent
