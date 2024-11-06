import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { signOutUser } from "../../redux/slices/authSlice"
import userIcon from "../../assets/UserIcon.svg"

const User = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const handleSignOut = async () => {
    dispatch(signOutUser())
  }

  return (
    <div className="flex gap-2 absolute bottom-0 items-center flex-col">
      <div className="flex gap-2 items-center">
        {user?.img ? (
          <img className="w-full max-w-8 rounded-full" src={user.img} />
        ) : (
          <img className="w-full max-w-8 rounded-full" src={userIcon} />
        )}
        <p>{user?.displayName || user?.email}</p>
      </div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}
export default User
