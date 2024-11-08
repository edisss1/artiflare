import { Link } from "react-router-dom"
import boardsIcon from "../../assets/BoardsIcon.svg"

const SettingsNav = () => {
  return (
    <nav className="flex py-6 px-[clamp(.5rem,30vw,2.5rem)] items-center justify-start bg-primary">
      <Link className="flex gap-2 items-center" to={"/app/dashboard"}>
        <img src={boardsIcon} alt="/" />
        <p>Go to boards</p>
      </Link>
    </nav>
  )
}
export default SettingsNav
