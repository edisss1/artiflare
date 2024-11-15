import { useState } from "react";
import DashboardLinksContainer from "../atoms/DashboardLinksContainer";
import Search from "../atoms/Search";
import User from "../atoms/User.tsx";
import BurgerMenuIcon from "../icons/BurgerMenuIcon.tsx";
import Button from "../atoms/Button.tsx";

interface DashboardSidebarProps {
  isMobileSidebarOpened: boolean;
  setIsMobileSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardSidebar = ({
  isMobileSidebarOpened,
  setIsMobileSidebarOpened,
}: DashboardSidebarProps) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleMobileSideBarClose = () => {
    setIsMobileSidebarOpened(false);
  };

  return (
    <aside
      className={`w-full max-xl:absolute max-xl:z-40 max-xl:${!isMobileSidebarOpened ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"} h-screen py-9 px-4 min-w-fit max-w-[230px] bg-primary dark:bg-primary-dark dark:text-typography-dark border-r-2 border-r-typography-light min-h-screen relative transition-all duration-150 `}
    >
      <div className="gap-[clamp(1rem,40vh,5rem)] h-full flex flex-col relative">
        <Button onClick={handleMobileSideBarClose} className={""}>
          <BurgerMenuIcon />
        </Button>
        <Search
          placeholder="Search by title"
          onChange={(e) => handleQueryChange(e)}
          value={query}
        />
        <DashboardLinksContainer />
        <User position="absolute bottom-0" />
      </div>
    </aside>
  );
};
export default DashboardSidebar;
