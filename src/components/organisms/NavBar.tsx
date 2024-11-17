import Anchor from "../atoms/Anchor";
import ThemeSwitch from "../atoms/ThemeSwitch";

const NavBar = () => {
  return (
    <nav className="w-full max-w-[50%] max-lg:max-w-[100%] text-typography-light dark:text-typography-dark items-center flex justify-between mx-auto bg-primary dark:bg-primary-dark mt-9 px-6 py-4 rounded-md">
      <h1>Artiflare</h1>
      <div className="flex gap-4 items-center">
        <div className={"flex gap-2 items-center justify-center "}>
          <Anchor
            path="/auth/login"
            children="Login"
            className="border-2 border-typography-light px-4 py-1 rounded-md hover:bg-typography-light hover:text-typography-dark transition-colors duration-150"
          />
          <Anchor
            path="/auth/signup"
            children={"Sign up"}
            className="border-2 border-secondary hover:bg-secondary dark:hover:text-typography-light transition-colors duration-150 text-typography-light dark:text-typography-dark w-max px-3 py-2 rounded-md  "
          />
        </div>

        <ThemeSwitch />
      </div>
    </nav>
  );
};
export default NavBar;
