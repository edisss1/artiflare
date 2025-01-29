import { useState } from "react"
import Button from "./Button"
import SettingsInput from "./SettingsInput"
import { AppDispatch } from "../../redux/store"
import { useDispatch } from "react-redux"
import { renameBoard } from "../../redux/slices/boardSlice"

interface BoardRenameModalContentProps {
    boardID: string | undefined
    modalRef: React.MutableRefObject<HTMLDialogElement | null>
}

const BoardRenameModalContent = ({
    boardID,
    modalRef
}: BoardRenameModalContentProps) => {
    const dispatch: AppDispatch = useDispatch()
    const [newBoardTitle, setNewBoardTitle] = useState("")

    const handleBoardTitleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewBoardTitle(event.target.value)
    }

    return (
        <div className="flex flex-col items-center mt-8 gap-4">
            <h2 className="font-medium text-xl">Rename board</h2>
            <SettingsInput
                id=""
                label=""
                type="text"
                value={newBoardTitle}
                onChange={(e) => handleBoardTitleChange(e)}
            />
            <Button
                onClick={() => {
                    dispatch(renameBoard({ boardID, newBoardTitle }))
                    modalRef.current?.close()
                    setNewBoardTitle("")
                }}
                className="border-2 border-typography-light dark:border-typography-dark px-2 py-1 rounded-lg hover:bg-typography-light hover:text-typography-dark transition-colors duration-150 dark:hover:bg-typography-dark dark:hover:text-typography-light"
            >
                Rename
            </Button>
        </div>
    )
}
export default BoardRenameModalContent
