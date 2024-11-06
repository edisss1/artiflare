import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { signOutUser } from "../../redux/slices/authSlice"

const User = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const handleSignOut = async () => {
    dispatch(signOutUser())
  }

  return (
    <div className="flex gap-2 absolute bottom-0 items-center">
      {user?.img ? (
        <img className="w-full max-w-8 rounded-full" src={user.img} />
      ) : null}
      <p>{user?.displayName}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}
export default User
