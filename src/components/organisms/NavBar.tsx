import Anchor from "../atoms/Anchor";
import ThemeSwitch from "../atoms/ThemeSwitch";

const NavBar = () => {
  return (
    <nav className="w-full max-w-[50%] max-lg:max-w-[100%] text-typography-light dark:text-typography-dark items-center flex justify-between mx-auto bg-primary dark:bg-primary-dark mt-9 px-4 py-2 rounded-sm">
      <h1>Artiflare</h1>
      <div className="flex gap-4 items-center">
        <div className={"flex gap-2 items-center justify-center max-w-max"}>
          <Anchor
            path="/auth/login"
            children="Login"
            className="border-2 border-typography-light px-4 rounded-sm hover:bg-typography-light hover:text-typography-dark transition-colors duration-150"
          />
          <Anchor
            path="/auth/signup"
            children={"Sign up"}
            className="bg-secondary text-typography-light dark:bg-secondary/90 w-max px-2 py-1 rounded-sm hover:bg-opacity-40 transition-colors duration-150"
          />
        </div>

        <ThemeSwitch />
      </div>
    </nav>
  );
};
export default NavBar;
