import { Link } from "react-router-dom"

interface BoardProps {
  id: string | undefined
  title: string | undefined
}

const Board = ({ id, title }: BoardProps) => {
  return (
    <div className="flex flex-col border-2">
      <Link to={`/app/board/${id}`}>{title}</Link>
    </div>
  )
}
export default Board
