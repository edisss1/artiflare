import { useEffect, useState } from "react";

import SunIcon from "../icons/SunIcon.tsx";
import MoonIcon from "../icons/MoonIcon.tsx";

const ThemeSwitch = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <button
      className="max-w-6 w-full relative [&>*]:w-8 flex items-center justify-center "
      onClick={toggleDarkMode}
    >
      <SunIcon darkMode={darkMode} />
      <MoonIcon darkMode={darkMode} />
    </button>
  );
};
export default ThemeSwitch;
