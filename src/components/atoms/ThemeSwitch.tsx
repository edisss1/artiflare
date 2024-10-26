import { useEffect, useState } from "react"
import sun from "../../../public/sun-svgrepo-com 1.svg"
import moon from "../../../public/moon-svgrepo-com.svg"
import Button from "./Button"

const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <Button
      className="max-w-8 w-full relative [&>*]:w-8"
      onClick={toggleDarkMode}>
      <img
        className={`absolute inset-0 transition-opacity ${
          darkMode ? "opacity-0" : "opacity-100"
        }`}
        src={sun}
        alt=""
      />
      <img
        className={`transition-opacity ${
          !darkMode ? "opacity-0" : "opacity-100"
        }`}
        src={moon}
        alt=""
      />
    </Button>
  )
}
export default ThemeSwitch
