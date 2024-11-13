import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import Bell from "../icons/Bell.tsx";

type HeaderProps = {
  plan: string;
};

const Header = ({ plan }: HeaderProps) => {
  return (
    <nav className="flex justify-between  w-full  items-center px-4 py-2 bg-primary dark:bg-primary-dark dark:text-typography-dark text-typography-light  rounded-md ">
      <div className="flex gap-2 items-center">
        <Link to={"/app/dashboard"}>Artiflare</Link>
        <p className="uppercase bg-primary text-typography-light px-[0.625rem]">
          {plan}
        </p>
      </div>
      <div className="flex items-center gap-6 ">
        <button className="capitalize px-2 py-1 bg-white text-typography-light rounded-md">
          upgrade
        </button>
        <div className="flex gap-4 items-center justify-center">
          <button className={"w-8"}>
            <Bell />
          </button>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};
export default Header;
