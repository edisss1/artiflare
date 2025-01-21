import { useDispatch } from "react-redux"
import FormInput from "../atoms/FormInput"
import { AppDispatch } from "../../redux/store"
import {
    setConfirmedPassword,
    setEmail,
    setPassword
} from "../../redux/slices/authSlice"
import React, { useEffect, useState } from "react"
import Button from "../atoms/Button"
import { Link, useLocation } from "react-router-dom"
import { handleAuthError } from "../../utils/handleAuthError"
import Checkbox from "../atoms/Checkbox"

interface FormProps {
    onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
    children: React.ReactNode
    isSignUp: boolean
    passwordMatch?: boolean
    email: string
    password: string
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
    confirmedPassword,
    errorCode,
    isAgreed,
    setIsAgreed
}: FormProps) => {
    const dispatch: AppDispatch = useDispatch()

    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    )

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
            <fieldset className="flex flex-col gap-2 items-center mt-4 w-full text-typography-light">
                <FormInput
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="off"
                />
                <FormInput
                    isIncorrect={!passwordMatch && isSignUp}
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                />
                {isSignUp && (
                    <FormInput
                        isIncorrect={!passwordMatch}
                        value={confirmedPassword}
                        onChange={(e) =>
                            dispatch(setConfirmedPassword(e.target.value))
                        }
                        placeholder="confirm your password"
                        type="password"
                    />
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
                            <span>I agree to the</span>
                            <Link
                                className="relative after:content-[''] after:w-full after:h-px after:bg-typography-light after:absolute after:top-full after:left-0 after:dark:bg-typography-dark hover:after:scale-x-0 after:origin-center
                                after:transition-all"
                                to={"/terms"}
                            >
                                Terms of service
                            </Link>
                        </div>
                    </div>
                )}
                {!isSignUp && (
                    <Link
                        className="self-end text-typography-light opacity-60 hover:opacity-100 dark:text-typography-dark transition-opacity duration-150"
                        to={"/auth/reset-password"}
                    >
                        Forgot password?
                    </Link>
                )}
                {!passwordMatch && confirmedPassword && (
                    <p className="text-danger text-sm block ">
                        Passwords do not match
                    </p>
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
