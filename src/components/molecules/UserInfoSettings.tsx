import { useDispatch } from "react-redux"
import { User } from "../../types/User"
import Button from "../atoms/Button"
import SettingsInput from "../atoms/SettingsInput"
import { AppDispatch } from "../../redux/store"
import { setNewDisplayName } from "../../redux/slices/userManagementSlice"
import { useState } from "react"

interface UserInfoSettingsProps {
    user: User | null
    handleUserDisplayNameChange: () => void
    handleSignOut: (dispatch: AppDispatch) => void
    userIcon: string
}

const UserInfoSettings = ({
    user,
    handleUserDisplayNameChange,
    handleSignOut,
    userIcon
}: UserInfoSettingsProps) => {
    const dispatch: AppDispatch = useDispatch()

    const [newUserName, setNewUserName] = useState(user?.displayName)

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserName(e.target.value)
        dispatch(setNewDisplayName(e.target.value))
    }

    return (
        <div className={`flex justify-between w-full max-w-[90%]`}>
            <div className={"grid gap-2 place-items-start"}>
                <SettingsInput
                    defaultValue={user?.displayName!}
                    className={"rounded-md w-full max-w-[200px] "}
                    label={"Name"}
                    id={`name`}
                    value={newUserName!}
                    onChange={handleUserNameChange}
                    type={"text"}
                />

                <div className="flex items-center gap-4">
                    <Button
                        onClick={handleUserDisplayNameChange}
                        className={
                            "border-2 border-typography-light px-2 py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-colors duration-150"
                        }
                    >
                        Change
                    </Button>
                    <Button
                        onClick={() => handleSignOut(dispatch)}
                        className="border-2 border-typography-light px-2 py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-colors duration-150"
                    >
                        Log out
                    </Button>
                </div>
            </div>
            <div className={"flex flex-col gap-2 items-center"}>
                <h3>Your photo</h3>
                <img
                    className={
                        "aspect-square rounded-md w-[clamp(2rem,40vw,10rem)]"
                    }
                    src={user?.img ? user.img : userIcon}
                    alt={""}
                />
                <div className={"flex gap-2 justify-center items-center"}>
                    <Button
                        className={
                            "border-2 border-typography-light p-2 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-colors duration-150"
                        }
                    >
                        Upload
                    </Button>
                    <Button
                        className={
                            "border-2 border-typography-light p-2 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-colors duration-150"
                        }
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default UserInfoSettings
