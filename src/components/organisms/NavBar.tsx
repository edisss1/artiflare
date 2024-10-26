import Button from "../atoms/Button"
import ThemeSwitch from "../atoms/ThemeSwitch"

const NavBar = () => {
  const placeholderFunc = () => {
    alert("TODO: add onClick for buttons")
  }

  return (
    <nav className="w-[50%] text-typography-light items-center flex justify-between max-w-full mx-auto bg-primary mt-9 px-4 py-2 rounded-sm">
      <h1>Artiflare</h1>
      <div className="flex gap-2 items-center">
        <Button
          onClick={placeholderFunc}
          textContent="Login"
          className="border-2 border-typography-light px-4 rounded-sm hover:bg-typography-light hover:text-typography-dark transition-colors duration-150"
        />
        <Button
          onClick={placeholderFunc}
          textContent="Sign Up"
          className="bg-secondary px-2 text-nowrap rounded-sm hover:bg-opacity-40 transition-colors duration-150"
        />
        <ThemeSwitch />
      </div>
    </nav>
  )
}
export default NavBar
