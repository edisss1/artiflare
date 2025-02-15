import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import AuthWithProviders from "../atoms/AuthWithProviders"
import Form from "./Form"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithCredentials } from "../../redux/slices/authSlice"
import { useState } from "react"
import H2 from "../atoms/H2"
import { useTranslation } from "react-i18next"

const SignUp = () => {
    const dispatch: AppDispatch = useDispatch()
    const { email, password, confirmedPassword, errorCode, name } = useSelector(
        (state: RootState) => state.auth
    )
    const [isAgreed, setIsAgreed] = useState(false)
    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleUserSignUp = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isAgreed && confirmedPassword && email && password) {
            dispatch(createUserWithCredentials({ email, password, name })).then(
                () => navigate(0)
            )
        }
    }

    return (
        <div
            aria-label="Sign up form"
            className="flex flex-col items-center justify-center min-h-screen "
        >
            <div className="flex flex-col items-center w-full max-w-[400px]">
                <div className="flex flex-col gap-2 max-w-[200px] items-center">
                    <H2>Artiflare</H2>
                    <p className="text-xl font-medium">{t("signUp")}</p>
                </div>
                <Form
                    isAgreed={isAgreed}
                    email={email}
                    password={password}
                    name={name}
                    confirmedPassword={confirmedPassword}
                    errorCode={errorCode}
                    setIsAgreed={setIsAgreed}
                    isSignUp
                    children={t("signUp")}
                    onSubmit={(e) => handleUserSignUp(e)}
                />
                <AuthWithProviders />
                <div className="flex gap-2 mt-6 mb-9">
                    <p>{t("alreadyHaveAnAccount")}</p>
                    <Link
                        className="relative after:absolute after:w-full after:h-px after:bg-bg-dark dark:after:bg-bg-light after:top-full after:left-0 hover:after:scale-x-0 after:transition-all after:duration-200 after:origin-left "
                        to={"/auth/login"}
                    >
                        {t("login")}
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
export default SignUp
