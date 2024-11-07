import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { RootState } from "../../redux/store"

const CanvasNav = () => {
  const { boards } = useSelector((state: RootState) => state.boards)
  const { boardID } = useParams()

  const currentBoard = boards.find((board) => board.id === boardID)

  return (
    <nav className="absolute top-[1%] left-[5%] text-typography-light z-40  bg-primary p-2 rounded-sm">
      <div className="flex gap-2">
        <Link to={"/app/dashboard"}>Artiflare</Link>
        <span>{">"}</span>
        <p>{currentBoard?.title}</p>
      </div>
    </nav>
  )
}
export default CanvasNav
