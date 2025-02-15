import Form from "./Form"

import AuthWithProviders from "../atoms/AuthWithProviders"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { signInWithCredentials } from "../../redux/slices/authSlice"
import H2 from "../atoms/H2"
import { useTranslation } from "react-i18next"

const Login = () => {
    const dispatch: AppDispatch = useDispatch()
    const { email, password, errorCode } = useSelector(
        (state: RootState) => state.auth
    )
    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleUserSignIn = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(signInWithCredentials({ email, password })).then(() =>
            navigate(0)
        )
    }

    return (
        <div
            aria-label="Login form"
            className="flex flex-col items-center justify-center min-h-screen "
        >
            <div className="flex flex-col items-center w-full max-w-[400px]">
                <div className="flex flex-col gap-2 max-w-[200px] items-center">
                    <H2>Artiflare</H2>
                    <p className="text-xl font-medium">{t("login")}</p>
                </div>
                <Form
                    email={email}
                    password={password}
                    errorCode={errorCode}
                    isSignUp={false}
                    children={t("logIn")}
                    onSubmit={(e) => handleUserSignIn(e)}
                />

                <AuthWithProviders />
                <div className="flex gap-2 mt-6 mb-9">
                    <p>{t("dontHaveAnAccount")}</p>
                    <Link
                        className="relative after:absolute after:w-full after:h-px after:bg-bg-dark dark:after:bg-bg-light after:top-full after:left-0 hover:after:scale-x-0 after:transition-all after:duration-200 after:origin-left "
                        to={"/auth/signup"}
                    >
                        {t("signUp")}
                    </Link>
                </div>
                <Link
                    className="relative after:absolute after:w-full after:h-px after:bg-bg-dark dark:after:bg-bg-light after:top-full after:left-0 hover:after:scale-x-0 after:transition-all after:duration-200 after:origin-left"
                    to={"/"}
                >
                    {t("goBack")}
                </Link>
            </div>
        </div>
    )
}
export default Login
