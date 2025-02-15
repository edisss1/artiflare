import { useDispatch } from "react-redux"
import FormInput from "../atoms/FormInput"
import { AppDispatch } from "../../redux/store"
import {
    setConfirmedPassword,
    setEmail,
    setName,
    setPassword
} from "../../redux/slices/authSlice"
import React, { useEffect, useState } from "react"
import Button from "../atoms/Button"
import { Link, useLocation } from "react-router-dom"
import { handleAuthError } from "../../utils/handleAuthError"
import Checkbox from "../atoms/Checkbox"
import { useTranslation } from "react-i18next"
import HidePassword from "../icons/HidePassword"
import ShowPassword from "../icons/ShowPassword"

interface FormProps {
    onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
    children: React.ReactNode
    isSignUp: boolean
    passwordMatch?: boolean
    email: string
    password: string
    name?: string
    confirmedPassword?: string
    errorCode: string | undefined
    isAgreed?: boolean
    setIsAgreed?: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({
    onSubmit,
    children,
    isSignUp,
    email,
    password,
    name,
    confirmedPassword,
    errorCode,
    isAgreed,
    setIsAgreed
}: FormProps) => {
    const dispatch: AppDispatch = useDispatch()
    const { t } = useTranslation()

    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    )

    const [inputType, setInputType] = useState<"password" | "text">("password")

    const location = useLocation()

    useEffect(() => {
        setErrorMessage(handleAuthError(errorCode))
    }, [errorCode])

    const passwordMatch = password === confirmedPassword && isSignUp

    useEffect(() => {
        dispatch(setPassword(""))
        dispatch(setEmail(""))
        dispatch(setConfirmedPassword(""))
        setErrorMessage(undefined)
        setIsAgreed && setIsAgreed(false)
    }, [location])

    return (
        <form onSubmit={onSubmit} className="mt-4 w-full">
            <fieldset className="flex flex-col gap-2 items-center max-md:max-w-[90%] max-md:mx-auto mt-4 w-full text-typography-light">
                {isSignUp && (
                    <FormInput
                        value={name}
                        onChange={(e) => dispatch(setName(e.target.value))}
                        placeholder="enter your name"
                        type="text"
                        autoComplete="off"
                    />
                )}
                <FormInput
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="off"
                />
                <div className="w-full relative">
                    <FormInput
                        isIncorrect={!passwordMatch && isSignUp}
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        placeholder={t("password").toLowerCase()}
                        type={inputType}
                        autoComplete="current-password"
                    />
                    {inputType === "password" ? (
                        <Button
                            onClick={() => setInputType("text")}
                            className="absolute right-4 top-[50%] -translate-y-[50%] hover:bg-gray-300 p-2 rounded-full transition-colors duration-150"
                        >
                            <ShowPassword />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setInputType("password")}
                            className="absolute right-4 top-[50%] -translate-y-[50%] hover:bg-gray-300 p-2 rounded-full transition-colors duration-150"
                        >
                            <HidePassword />
                        </Button>
                    )}
                </div>
                {isSignUp && (
                    <FormInput
                        isIncorrect={!passwordMatch}
                        value={confirmedPassword}
                        onChange={(e) =>
                            dispatch(setConfirmedPassword(e.target.value))
                        }
                        placeholder={t("confirmPassword").toLowerCase()}
                        type={inputType}
                    />
                )}
                {!passwordMatch && confirmedPassword && (
                    <p className="text-danger text-sm block my-2 ">
                        Passwords do not match
                    </p>
                )}
                {isSignUp && (
                    <div className="flex gap-2 self-start items-center text-typography-light dark:text-typography-dark">
                        <Checkbox
                            checked={isAgreed}
                            onChange={() =>
                                setIsAgreed && setIsAgreed(!isAgreed)
                            }
                            id="terms"
                        />
                        <div className="flex gap-1 items-center">
                            <span>{t("iAgreeToThe")}</span>
                            <Link
                                className="relative after:content-[''] after:w-full after:h-px after:bg-typography-light after:absolute after:top-full after:left-0 after:dark:bg-typography-dark hover:after:scale-x-0 after:origin-center
                                after:transition-all"
                                to={"/terms"}
                            >
                                {t("termsOfService")}
                            </Link>
                        </div>
                    </div>
                )}

                {!isSignUp && (
                    <Link
                        className="self-end text-typography-light opacity-60 hover:opacity-100 dark:text-typography-dark transition-opacity duration-150"
                        to={"/auth/reset-password"}
                    >
                        {t("forgotPassword")}
                    </Link>
                )}

                {errorMessage && (
                    <p className="text-danger text-sm block ">{errorMessage}</p>
                )}
                <Button
                    disabled={!passwordMatch && !email && isSignUp && !isAgreed}
                    className="my-6 w-full bg-secondary py-4 rounded-lg  hover:opacity-65 transition-opacity duration-150 disabled:opacity-50"
                >
                    {children}
                </Button>
            </fieldset>
        </form>
    )
}
export default Form
