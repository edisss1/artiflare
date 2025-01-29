import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { deleteBoard } from "../../redux/slices/boardSlice"
import TrashCanIcon from "../icons/TrashCanIcon"
import PencilIcon from "../icons/shapes/PencilIcon"
import Button from "../atoms/Button"

interface PopoverBoardContentProps {
    boardID: string | undefined
    openBoardRenameModal: () => void
}

const PopoverBoardContent = ({
    boardID,
    openBoardRenameModal
}: PopoverBoardContentProps) => {
    const dispatch: AppDispatch = useDispatch()

    return (
        <div className="flex flex-col gap-4">
            <Button
                className="flex gap-2 items-center"
                onClick={() => dispatch(deleteBoard(boardID))}
            >
                <TrashCanIcon />
                <p>Delete board</p>
            </Button>
            <Button
                onClick={openBoardRenameModal}
                className="flex gap-2 items-center"
            >
                <PencilIcon className="w-4" />
                Rename board
            </Button>
        </div>
    )
}
export default PopoverBoardContent
