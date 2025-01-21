import { useDispatch, useSelector } from "react-redux"
import Button from "../atoms/Button"
import FormInput from "../atoms/FormInput"
import H2 from "../atoms/H2"
import { AppDispatch, RootState } from "../../redux/store"
import { resetPassword, setEmail } from "../../redux/slices/authSlice"
import { Link } from "react-router-dom"

const ResetPassword = () => {
    const dispatch: AppDispatch = useDispatch()
    const { email, errorCode } = useSelector((state: RootState) => state.auth)

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="max-w-[400px] w-full flex flex-col gap-4 items-center">
                <H2>Artiflare</H2>
                <div className="w-full">
                    <FormInput
                        isIncorrect={!email}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        type="email"
                    />
                    {!email && (
                        <p className="text-left self-start text-danger">
                            Email is required to reset your password
                        </p>
                    )}
                </div>
                <Button
                    onClick={() => email && dispatch(resetPassword(email))}
                    className="mt-4 w-full bg-secondary py-4 rounded-lg  hover:opacity-65 transition-opacity duration-150 disabled:opacity-50"
                >
                    Send reset link
                </Button>
                {errorCode && <p>{errorCode}</p>}
                <Link
                    className="relative after:absolute after:w-full after:h-px after:bg-bg-dark dark:after:bg-bg-light after:top-full after:left-0 hover:after:scale-x-0 after:transition-all after:duration-200 after:origin-left"
                    to={"/auth/login"}
                >
                    Go back to login
                </Link>
            </div>
        </div>
    )
}
export default ResetPassword
