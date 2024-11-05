import { Link } from "react-router-dom"
import ThemeSwitch from "./ThemeSwitch"
import bell from "../../assets/Bell.svg"

type HeaderProps = {
  plan: string
}

const Header = ({ plan }: HeaderProps) => {
  return (
    <nav className="flex justify-between w-full items-center px-4 py-2 bg-white text-typography-light  rounded-md ">
      <div className="flex gap-2">
        <Link to={"/app/dashboard"}>Artiflare</Link>
        <p className="uppercase bg-primary text-typography-light px-[0.625rem]">
          {plan}
        </p>
      </div>
      <div className="flex items-center gap-6">
        <button className="capitalize px-2 py-1 bg-primary rounded-md">
          upgrade
        </button>
        <div className="flex gap-4">
          <button>
            <img className="w-5" src={bell} alt="/" />
          </button>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  )
}
export default Header
