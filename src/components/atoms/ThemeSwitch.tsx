import { useEffect, useState } from "react"
import sun from "../../assets/sun-svgrepo-com 1.svg"
import moon from "../../assets/moon-svgrepo-com.svg"

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
    <button
      className="max-w-6 w-full relative [&>*]:w-6"
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
    </button>
  )
}
export default ThemeSwitch
