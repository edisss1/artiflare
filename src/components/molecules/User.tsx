import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

const User = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div className="flex gap-2 absolute bottom-0 items-center">
      {user?.img ? (
        <img className="w-full max-w-8 rounded-full" src={user.img} />
      ) : null}
      <p>{user?.displayName}</p>
    </div>
  )
}
export default User
