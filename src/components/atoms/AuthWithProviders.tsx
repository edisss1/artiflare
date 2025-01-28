import Button from "./Button"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { signInWithGoogle } from "../../redux/slices/authSlice"
import { Navigate } from "react-router-dom"
import GoogleIcon from "../icons/GoogleIcon.tsx"
import GithubIcon from "../icons/GithubIcon.tsx"
import { useTranslation } from "react-i18next"

const AuthWithProviders = () => {
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const { t } = useTranslation()

    const handleSignInWithGoogle = () => {
        dispatch(signInWithGoogle())
    }

    if (user) {
        return <Navigate to={"/app/dashboard"} />
    }

    return (
        <div className=" flex flex-col gap-2 mt-4 ">
            <Button
                onClick={handleSignInWithGoogle}
                className="flex group   items-center bg-none border-2 border-typography-light dark:border-typography-dark hover:bg-secondary transition-colors duration-150 p-2 rounded-md gap-2"
            >
                <GoogleIcon />
                <p className="dark:group-hover:text-typography-light">
                    {t("signInWithGoogle")}
                </p>
            </Button>
            <Button
                onClick={() => alert}
                className="flex group items-center bg-none border-2 border-typography-light dark:border-typography-dark hover:bg-secondary transition-colors duration-150 p-2 rounded-md gap-2"
            >
                <GithubIcon />
                <p className="dark:group-hover:text-typography-light">
                    {t("signInWithGithub")}
                </p>
            </Button>
        </div>
    )
}
export default AuthWithProviders
