import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
// import { signOutUser } from "../../redux/slices/authSlice"
import userIcon from "../../assets/UserIcon.svg"
import { deleteUserFromDatabase } from "../../redux/slices/authSlice"

const User = ({ position }: { position: string }) => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  // const handleSignOut = async () => {
  //   dispatch(signOutUser())
  // }

  const handleDeleteUser = async () => {
    dispatch(deleteUserFromDatabase())
  }

  return (
    <div
      className={`flex gap-2  ${position} rounded-sm items-center flex-col bg-primary`}>
      <div className="flex gap-2 items-center">
        {user?.img ? (
          <img className="w-full max-w-8 rounded-full" src={user.img} />
        ) : (
          <img className="w-full max-w-8 rounded-full" src={userIcon} />
        )}
        <p>{user?.displayName || user?.email}</p>
      </div>
      <button onClick={handleDeleteUser}>Delete profile</button>
    </div>
  )
}
export default User
