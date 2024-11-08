import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import userIcon from "../../assets/UserIcon.svg"
import { Link } from "react-router-dom"

const User = ({ position }: { position: string }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  return (
    <Link
      to={`/app/settings/profile/${user?.uid}`}
      className={`flex gap-2 hover:bg-bg-dark/40 py-2 px-2 transition-colors duration-200 ${position} rounded-sm items-center flex-col bg-primary`}>
      <div className="flex gap-2 items-center">
        {user?.img ? (
          <img className="w-full max-w-8 rounded-full" src={user.img} />
        ) : (
          <img className="w-full max-w-8 rounded-full" src={userIcon} />
        )}
        <p>{user?.displayName || user?.email}</p>
      </div>
    </Link>
  )
}
export default User
