import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { deleteBoard } from "../../redux/slices/boardSlice"
import TrashCanIcon from "../icons/TrashCanIcon"
import PencilIcon from "../icons/shapes/PencilIcon"
import Button from "../atoms/Button"
import CopyLinkIcon from "../icons/CopyLinkIcon"

interface PopoverBoardContentProps {
    boardID: string | undefined
    openBoardRenameModal: () => void
    copyToClipboard: () => void
}

const PopoverBoardContent = ({
    boardID,
    openBoardRenameModal,
    copyToClipboard
}: PopoverBoardContentProps) => {
    const dispatch: AppDispatch = useDispatch()

    return (
        <div className="flex flex-col gap-4 z-0">
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
                <PencilIcon className="w-4 [&>*]:fill-bg-dark dark:[&>*]:fill-bg-light" />
                Rename board
            </Button>
            <Button
                onClick={copyToClipboard}
                className="flex gap-2 items-center "
            >
                <CopyLinkIcon />
                <p> Copy board link</p>
            </Button>
        </div>
    )
}
export default PopoverBoardContent
