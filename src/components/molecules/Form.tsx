import { useDispatch, useSelector } from "react-redux"
import FormInput from "../atoms/FormInput"
import { AppDispatch, RootState } from "../../redux/store"
import {
    setConfirmedPassword,
    setEmail,
    setPassword
} from "../../redux/slices/authSlice"
import React, { useEffect, useState } from "react"
import Button from "../atoms/Button"
import { useLocation } from "react-router-dom"
import { handleAuthError } from "../../utils/handleAuthError"

interface FormProps {
    onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
    children: React.ReactNode
    isSignUp: boolean
}

const Form = ({ onSubmit, children, isSignUp }: FormProps) => {
    const dispatch: AppDispatch = useDispatch()
    const { email, password, confirmedPassword, errorCode } = useSelector(
        (state: RootState) => state.auth
    )
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    )

    const location = useLocation()

    useEffect(() => {
        setErrorMessage(handleAuthError(errorCode))

        console.log("infinite")
    }, [errorCode])

    const passwordMatch = password === confirmedPassword && isSignUp

    useEffect(() => {
        dispatch(setPassword(""))
        dispatch(setEmail(""))
        dispatch(setConfirmedPassword(""))
        setErrorMessage(undefined)
    }, [location])

    return (
        <form onSubmit={onSubmit} className="mt-4 w-full">
            <fieldset className="flex flex-col gap-2 items-center mt-4 w-full text-typography-light">
                <FormInput
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    placeholder="you@example.com"
                    type="email"
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
                {!passwordMatch && confirmedPassword && (
                    <p className="text-danger text-sm block ">
                        Passwords do not match
                    </p>
                )}
                {errorMessage && (
                    <p className="text-danger text-sm block ">{errorMessage}</p>
                )}
                <Button
                    disabled={!passwordMatch && !email && isSignUp}
                    className="my-4 border-2 disabled:opacity-30 border-typography-light text-typography-light dark:text-typography-dark dark:border-typography-dark rounded-md px-4 py-1 hover:bg-bg-dark hover:text-typography-dark dark:hover:bg-bg-light dark:hover:text-typography-light transition-colors duration-150"
                >
                    {children}
                </Button>
            </fieldset>
        </form>
    )
}
export default Form
