import { useSelector } from "react-redux"
import { RootState } from "../../redux/store.ts"
import userIcon from "../../assets/UserIcon.svg"
import { Link } from "react-router-dom"

const User = ({ position }: { position: string }) => {
    const user = useSelector((state: RootState) => state.auth.user)
    let userProfilePicture = user?.img

    if (userProfilePicture === null || undefined) {
        userProfilePicture = userIcon
    }

    return (
        <Link
            to={`/app/settings/profile/${user?.uid}`}
            className={`flex gap-2 hover:bg-bg-dark/40' dark:hover:bg-bg-light/40 py-2 px-2 transition-colors duration-200 ${position} rounded-md items-center flex-col bg-primary dark:bg-primary-dark`}
        >
            <div className="flex gap-2 items-center w-[calc(100%)] truncate ">
                <img
                    className={"w-8 rounded-full"}
                    src={userProfilePicture}
                    alt=""
                />
                <p className={"w-full max-w-[150px] truncate"}>
                    {user?.displayName || user?.email}
                </p>
            </div>
        </Link>
    )
}
export default User
