import { useDispatch, useSelector } from "react-redux"
import FormInput from "../atoms/FormInput"
import { AppDispatch, RootState } from "../../redux/store"
import { setEmail, setPassword } from "../../redux/slices/authSlice"
import React, { useEffect } from "react"
import Button from "../atoms/Button"

interface FormProps {
    onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
    children: React.ReactNode
}

const Form = ({ onSubmit, children }: FormProps) => {
    const dispatch: AppDispatch = useDispatch()
    const { email, password } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        console.log("Email: ", email)
        console.log("Password: ", password)
    }, [email, password])
    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col gap-2 items-center mt-4 w-full text-typography-light"
        >
            <FormInput
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="you@example.com"
                type="email"
            />
            <FormInput
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                placeholder="password"
                type="password"
                autoComplete="current-password"
            />
            <Button className="my-4 border-2 border-typography-light text-typography-light dark:text-typography-dark dark:border-typography-dark rounded-md px-4 py-1 hover:bg-bg-dark hover:text-typography-dark dark:hover:bg-bg-light dark:hover:text-typography-light transition-colors duration-150">
                {children}
            </Button>
        </form>
    )
}
export default Form
