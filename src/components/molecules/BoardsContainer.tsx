import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import Board from "../atoms/Board"
import { useEffect } from "react"
import { fetchAllUserBoards } from "../../redux/slices/boardSlice"

const BoardsContainer = () => {
    const dispatch: AppDispatch = useDispatch()
    const { boards, status } = useSelector((state: RootState) => state.boards)
    const user = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        if (user) {
            const unsubscribe = dispatch(fetchAllUserBoards(user.uid))

            return () => unsubscribe()
        }
    }, [])

    console.log("Boards: ", boards)
    return (
        <div className="flex flex-col gap-4 relative">
            {status === "loading" && (
                <div className="absolute left-[50%] top-[50%]">Loading...</div>
            )}
            {boards.map((board) => (
                <Board
                    createdBy={board.createdBy}
                    updatedAt={board.updatedAt}
                    id={board.id}
                    modifiedBy={board.modifiedBy}
                    title={board.boardTitle}
                    key={board.id}
                />
            ))}
        </div>
    )
}
export default BoardsContainer
