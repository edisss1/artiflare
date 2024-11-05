import Button from "../atoms/Button"
import add from "../../assets/Add.svg"
import team from "../../assets/Team.svg"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { createBoard } from "../../redux/slices/boardSlice"

const BoardsManagement = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const createNewBoard = async () => {
    const title = prompt("Enter title for board:")
    if (title && user) {
      dispatch(createBoard({ user, title }))
    }
  }

  return (
    <div className="grid grid-rows-2 mt-[clamp(1.5rem,40vh,5rem)] mb-9">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Your boards</h2>
        <div className="flex gap-4 text-typography-light">
          <Button
            onClick={() => alert("WIP")}
            className="flex gap-2 px-2 py-3 w-max bg-primary rounded-sm hover:shadow-lg transition-all duration-200 hover:shadow-primary/80">
            <img src={team} alt="" />
            <p>Join a team</p>
          </Button>
          <Button
            onClick={createNewBoard}
            className="flex gap-2 px-2 py-3 max-w-max bg-secondary rounded-sm hover:shadow-lg transition-all duration-200 hover:shadow-secondary/80 ">
            <img src={add} alt="" />
            <p>Create new</p>
          </Button>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-9">
        <p>Sort by</p>
        <select
          className="p-2 bg-bg-light dark:bg-bg-dark border-2 max-w-fit  border-typography-light dark:border-typography-dark rounded-md"
          name=""
          id="">
          <option value="">Last opened</option>
          <option value="">Recently modified</option>
        </select>
      </div>
    </div>
  )
}
export default BoardsManagement
