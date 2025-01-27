import { Link } from "react-router-dom"
import Anchor from "../atoms/Anchor"
import ScrollTo from "../atoms/ScrollTo"
import ThemeSwitch from "../atoms/ThemeSwitch"
import ChevronIcon from "../icons/ChevronIcon"
import { useTranslation } from "react-i18next"

const NavBar = () => {
    const { t } = useTranslation()

    return (
        <nav className="w-full max-w-[50%] max-lg:max-w-[100%] text-typography-light dark:text-typography-dark items-center flex justify-between mx-auto bg-primary dark:bg-primary-dark mt-9 px-6 py-4 rounded-md">
            <Link to={"/"} className="text-xl ">
                Artiflare
            </Link>
            <div className="flex gap-4 items-center">
                <div className={"flex gap-2 items-center justify-center "}>
                    <Anchor
                        path="/auth/login"
                        children={t("login")}
                        className="border-2 border-typography-light px-4 py-1 rounded-md hover:bg-typography-light hover:text-typography-dark transition-colors duration-150"
                    />
                    <Anchor
                        path="/auth/signup"
                        children={t("signUp")}
                        className="border-2 border-secondary hover:bg-secondary dark:hover:text-typography-light transition-colors duration-150 text-typography-light dark:text-typography-dark w-max px-3 py-2 rounded-md  "
                    />
                </div>

                {/* <Button
                    onClick={() => dispatch(setLanguage("en"))}
                    className=""
                >
                    EN
                </Button>
                <Button
                    onClick={() => dispatch(setLanguage("it"))}
                    className=""
                >
                    IT
                </Button> */}
                <ThemeSwitch />
            </div>
            <ScrollTo x={0} y={0}>
                <ChevronIcon className="rotate-180" />
                <p>{t("backToTop")}</p>
            </ScrollTo>
        </nav>
    )
}
export default NavBar
