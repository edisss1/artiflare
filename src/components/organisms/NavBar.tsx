import Link from "../atoms/Anchor"
import ThemeSwitch from "../atoms/ThemeSwitch"

const NavBar = () => {
  return (
    <nav className="w-[50%] text-typography-light items-center flex justify-between max-w-full mx-auto bg-primary mt-9 px-4 py-2 rounded-sm">
      <h1>Artiflare</h1>
      <div className="flex gap-2 items-center">
        <Link
          path="/auth/login"
          textContent="Login"
          className="border-2 border-typography-light px-4 rounded-sm hover:bg-typography-light hover:text-typography-dark transition-colors duration-150"
        />
        <Link
          path="/auth/signup"
          textContent="Sign Up"
          className="bg-secondary dark:bg-secondary/90 px-2 text-now rounded-sm hover:bg-opacity-40 transition-colors duration-150"
        />
        <Link path="/app/board">test link</Link>
        <Link path="/app/dashboard">test link2</Link>
        <ThemeSwitch />
      </div>
    </nav>
  )
}
export default NavBar
