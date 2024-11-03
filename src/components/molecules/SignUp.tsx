import { useDispatch, useSelector } from "react-redux"
import { signInWithGoogle, signOutUser } from "../../redux/slices/authSlice"
import { AppDispatch, RootState } from "../../redux/store"
import { Link } from "react-router-dom"

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const handleSignIn = () => {
    dispatch(signInWithGoogle())
  }

  const handleSignOut = () => {
    dispatch(signOutUser())
  }

  return (
    <div>
      {user ? (
        <div className="flex flex-col gap-2 items-center">
          <span>Welcome, {user.displayName}</span>
          <Link to={"/app/dashboard"}>dashboard</Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <button onClick={handleSignIn}>Sign In with Google</button>
          <Link to={"/"}>home</Link>
        </div>
      )}
    </div>
  )
}
export default SignUp
