import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import Board from "../atoms/Board"
import { useEffect } from "react"
import { fetchAllUserBoards } from "../../redux/slices/boardSlice"

const BoardsContainer = () => {
  const dispatch: AppDispatch = useDispatch()
  const { boards } = useSelector((state: RootState) => state.boards)
  const user = useSelector((state: RootState) => state.auth.user)
  console.log(user)

  useEffect(() => {
    if (user) {
      dispatch(fetchAllUserBoards(user.uid))
    }
  }, [])

  console.log("Boards: ", boards)
  return (
    <div className="flex flex-col gap-4">
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
