import { Link } from "react-router-dom"

interface BoardProps {
  id: string | undefined
  title: string | undefined
  createdBy: string | null
  modifiedBy: string | null
  updatedAt: string | null
}

const Board = ({ id, title, createdBy, modifiedBy, updatedAt }: BoardProps) => {
  return (
    <div className="flex flex-col border-2 gap-2 px-4 py-2 border-typography-light dark:border-typography-dark rounded-sm">
      <Link to={`/app/board/${id}`}>{title}</Link>
      <div className="flex gap-2 ">
        <p>Created by {createdBy},</p>
        <p className="text-typography-light/80 dark:text-typography-dark/80">
          Modified by {modifiedBy}, {updatedAt}
        </p>
      </div>
    </div>
  )
}
export default Board
