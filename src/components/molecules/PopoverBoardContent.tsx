import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { deleteBoard } from "../../redux/slices/boardSlice"
import TrashCanIcon from "../icons/TrashCanIcon"
import Button from "../atoms/Button"
import CopyLinkIcon from "../icons/CopyLinkIcon"
import EditIcon from "../icons/EditIcon"
import { t } from "i18next"

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
                <p>{t("deleteBoard")}</p>
            </Button>
            <Button
                onClick={openBoardRenameModal}
                className="flex gap-2 items-center"
            >
                <EditIcon className=" [&>*]:fill-bg-dark dark:[&>*]:fill-bg-light" />
                <p>{t("renameBoard")}</p>
            </Button>
            <Button
                onClick={copyToClipboard}
                className="flex gap-2 items-center "
            >
                <CopyLinkIcon />
                <p> {t("copyBoardLink")} </p>
            </Button>
        </div>
    )
}
export default PopoverBoardContent
