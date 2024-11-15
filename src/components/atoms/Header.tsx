import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import Bell from "../icons/Bell.tsx";
import { useState } from "react";
import NotificationsContainer from "../organisms/NotificationsContainer.tsx";
import Button from "./Button.tsx";

type HeaderProps = {
  plan: string;
};

const Header = ({ plan }: HeaderProps) => {
  const [isContainerOpened, setIsContainerOpened] = useState(false);

  const handleNotificationsOpen = () => {
    setIsContainerOpened(true);
  };

  const handleNotificationsClose = () => {
    setIsContainerOpened(false);
  };

  return (
    <nav className="flex justify-between relative  w-full  items-center ps-9 py-2  dark:text-typography-dark text-typography-light  rounded-md ">
      <div className="flex gap-2 items-center">
        <Link to={"/app/dashboard"}>Artiflare</Link>
        <p className="uppercase bg-primary dark:bg-primary-dark rounded-sm dark:text-typography-dark text-typography-light px-4 py-1">
          {plan}
        </p>
      </div>
      <div className="flex items-center gap-6 ">
        <Button className="capitalize px-2 py-1 bg-white text-typography-light rounded-md">
          upgrade
        </Button>
        <div className="flex gap-4 items-center justify-center">
          <Button onClick={handleNotificationsOpen} className={"w-8"}>
            <Bell />
          </Button>
          <ThemeSwitch />
        </div>
      </div>
      <NotificationsContainer
        notifications={[]}
        closeContainer={handleNotificationsClose}
        isContainerOpened={isContainerOpened}
      />
    </nav>
  );
};
export default Header;
