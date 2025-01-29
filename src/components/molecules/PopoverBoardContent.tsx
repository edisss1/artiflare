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
}

const PopoverBoardContent = ({
    boardID,
    openBoardRenameModal
}: PopoverBoardContentProps) => {
    const dispatch: AppDispatch = useDispatch()

    const copyToClipboard = async () => {
        try {
            const url = `${window.location.origin}/board/${boardID}`
            await navigator.clipboard.writeText(url)
            alert("Board link copied to clipboard")
        } catch (err) {
            console.error("Error copying to clipboard:", err)
        }
    }

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
                <PencilIcon className="w-4 [&>*]:fill-bg-dark dark:[&>*]:fill-bg-light" />
                Rename board
            </Button>
            <Button
                onClick={copyToClipboard}
                className="flex gap-2 items-center"
            >
                <CopyLinkIcon />
                <p> Copy board link</p>
            </Button>
        </div>
    )
}
export default PopoverBoardContent
