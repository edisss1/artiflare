import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import Board from "./Board"
import { useEffect } from "react"
import { fetchAllUserBoards } from "../../redux/slices/boardSlice"

const BoardsContainer = () => {
  const dispatch: AppDispatch = useDispatch()
  const { boards } = useSelector((state: RootState) => state.boards)
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (user) {
      dispatch(fetchAllUserBoards(user.uid))
    }
  }, [])

  console.log("Boards: ", boards)
  return (
    <div className="flex flex-col gap-16">
      {boards.map((board) => (
        <Board id={board.id} title={board.title} />
      ))}
    </div>
  )
}
export default BoardsContainer
