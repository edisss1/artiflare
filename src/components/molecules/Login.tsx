import Button from "../atoms/Button"
import Form from "./Form"

import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { signInWithGoogle } from "../../redux/slices/authSlice"
import { Navigate } from "react-router-dom"
import GoogleIcon from "../atoms/GoogleIcon"
import GithubIcon from "../atoms/GithubIcon"

const Login = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle())
  }

  if (user) {
    return <Navigate to={"/app/dashboard"} />
  }

  return (
    <div
      aria-label="Login form"
      className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center w-full max-w-[400px]">
        <div className="flex flex-col gap-2 max-w-[200px] items-center">
          <h2 className="text-typography-light dark:text-typography-dark text-3xl font-bold">
            Artiflare
          </h2>
          <p className="text-xl font-medium">Login</p>
        </div>
        <Form onSubmit={() => alert("shit")} />
        <div className=" flex flex-col gap-2 mt-4 ">
          <Button
            onClick={handleSignInWithGoogle}
            className="flex  items-center bg-none border-2 border-typography-light dark:border-typography-dark hover:bg-secondary transition-colors duration-150 p-2 rounded-sm gap-2">
            <GoogleIcon />
            <p>Sign in with Google</p>
          </Button>
          <Button
            onClick={() => alert}
            className="flex  items-center bg-none border-2 border-typography-light dark:border-typography-dark hover:bg-secondary transition-colors duration-150 p-2 rounded-sm gap-2">
            <GithubIcon />
            <p>Sign in with GitHub</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Login
