import { Link } from "react-router-dom"
import Button from "./Button"
import favorite from "../../assets/Favorite.svg"
import more from "../../assets/More.svg"

interface BoardProps {
  id: string | undefined
  title: string | undefined
  createdBy: string | null
  modifiedBy: string | null
  updatedAt: string | null
}

const Board = ({ id, title, createdBy, modifiedBy, updatedAt }: BoardProps) => {
  return (
    <div className="flex flex-col relative border-2 gap-2 px-4 py-2 group hover:bg-primary transition-colors duration-150 border-typography-light dark:border-typography-dark rounded-sm">
      <Link to={`/app/board/${id}`}>{title}</Link>
      <div className="flex gap-2 ">
        <p>Created by {createdBy},</p>
        <p className="text-typography-light/80 dark:text-typography-dark/80">
          Modified by {modifiedBy}, {updatedAt}
        </p>
      </div>
      <div className="absolute top-[50%] right-4 -translate-y-[50%] flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <Button
          onClick={() => alert("WIP")}
          className="hover:bg-slate-200 transition-colors duration-150 w-8 h-8 flex items-center justify-center rounded-sm">
          <img className="w-6" src={favorite} alt="" />
        </Button>
        <Button
          onClick={() => alert("WIP")}
          className="hover:bg-slate-200 transition-colors duration-150 w-8 h-8 flex items-center justify-center rounded-sm">
          <img className="w-6" src={more} alt="" />
        </Button>
      </div>
    </div>
  )
}
export default Board
