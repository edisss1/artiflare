import { Link } from "react-router-dom"

const CanvasNav = () => {
  return (
    <nav className="absolute top-[1%] left-[5%] text-typography-light z-40  bg-primary p-2 rounded-sm">
      <div className="flex gap-2">
        <Link to={"/app/dashboard"}>Artiflare</Link>
        <span>{">"}</span>
        <p>Board name</p>
      </div>
    </nav>
  )
}
export default CanvasNav
