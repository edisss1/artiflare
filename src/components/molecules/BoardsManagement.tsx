import Button from "../atoms/Button"
import add from "../../assets/Add.svg"
import team from "../../assets/Team.svg"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import {
    addMembersOfBoard,
    createBoard,
    updateSortedBy
} from "../../redux/slices/boardSlice"
import Modal from "./Modal"
import { useRef, useState } from "react"
import CreateBoardModalContent from "../atoms/CreateBoardModalContent"
import TeamManagementModal from "./TeamManagementModal"
import { sortByOptions } from "../../constants/sortByOptions"
import { useTranslation } from "react-i18next"
import { Board } from "../../types/Board"

interface BoardsManagementProps {
    title: string
}

const BoardsManagement = ({ title }: BoardsManagementProps) => {
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const createBoardModalRef = useRef<HTMLDialogElement | null>(null)
    const joinTeamModalRef = useRef<HTMLDialogElement | null>(null)
    const [boardTitle, setBoardTitle] = useState("")
    const [isCreateModal, setIsCreateModal] = useState(false)
    const [areMembersChecked, setAreMembersChecked] = useState(false)
    const { currentTeam } = useSelector(
        (state: RootState) => state.teamManagement
    )

    const { t } = useTranslation()

    const toggleCreateBoardModal = () => {
        createBoardModalRef.current?.showModal()
    }

    const handleNewBoardTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardTitle(e.target.value)
    }

    const createNewBoard = async () => {
        if (boardTitle && user) {
            dispatch(
                createBoard({
                    user,
                    boardTitle,
                    currentTeam: user.currentSelectedTeam
                })
            ).then((newBoard) => {
                const newBoardPayload = newBoard.payload as Board
                if (areMembersChecked) {
                    dispatch(
                        addMembersOfBoard({
                            members: currentTeam?.members,
                            boardID: newBoardPayload.id
                        })
                    )
                }
            })
            setBoardTitle("")
            createBoardModalRef.current?.close()
        }
    }

    const toggleJoinTeamModal = () => {
        joinTeamModalRef.current?.showModal()
    }

    const handleSortedByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(updateSortedBy(e.target.value))
    }

    return (
        <>
            <Modal modalRef={createBoardModalRef}>
                <CreateBoardModalContent
                    isChecked={areMembersChecked}
                    setIsChecked={() =>
                        setAreMembersChecked(!areMembersChecked)
                    }
                    setTitle={(e) => handleNewBoardTitle(e)}
                    title={boardTitle}
                    createBoard={createNewBoard}
                />
            </Modal>
            <Modal
                minHeight="lg:min-h-[600px] max-lg:min-h-[550px]"
                modalRef={joinTeamModalRef}
            >
                <TeamManagementModal
                    isCreateModal={isCreateModal}
                    setIsCreateModal={setIsCreateModal}
                />
            </Modal>
            <div className="grid grid-rows-2 max-md:place-items-center mt-[clamp(1.5rem,40vh,5rem)] mb-9">
                <div className="flex items-center w-full max-md:flex-col max-md:gap-4 justify-between">
                    <h2 className="text-xl">{title}</h2>
                    <div className="flex gap-4  text-typography-light">
                        <Button
                            // disabled={user?.teams && user?.teams.length >= 1}
                            onClick={toggleJoinTeamModal}
                            className="flex gap-2 items-center px-2 py-3 w-max bg-primary rounded-md hover:shadow-lg transition-all duration-200 hover:shadow-primary/80"
                        >
                            <img src={team} alt="" />
                            <p>{t("joinATeam")}</p>
                        </Button>
                        <Button
                            onClick={toggleCreateBoardModal}
                            className="flex gap-2 items-center px-2 py-3 max-w-max bg-secondary rounded-md hover:shadow-lg transition-all duration-200 hover:shadow-secondary/80 "
                        >
                            <img src={add} alt="" />
                            <p>{t("createNew")}</p>
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2 items-center mt-9">
                    <p>{t("sortBy")}</p>
                    <select
                        onChange={(e) => handleSortedByChange(e)}
                        className="p-2 bg-bg-light dark:bg-bg-dark border-2 max-w-fit  border-typography-light dark:border-typography-dark rounded-md"
                        name=""
                        id=""
                    >
                        {sortByOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {t(option.label)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}
export default BoardsManagement
