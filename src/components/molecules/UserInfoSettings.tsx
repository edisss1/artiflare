import { useDispatch } from "react-redux"
import { User } from "../../types/User"
import Button from "../atoms/Button"
import SettingsInput from "../atoms/SettingsInput"
import { AppDispatch } from "../../redux/store"
import { setNewDisplayName } from "../../redux/slices/userManagementSlice"
import { useState } from "react"
import FallbackAvatar from "../atoms/FallbackAvatar"
import { t } from "i18next"
import LanguageSwitch from "../atoms/LanguageSwitch"

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
        <div
            className={`flex justify-between max-md:flex-col max-lg:items-start max-lg:gap-8 w-full max-w-[90%]`}
        >
            <div className={"grid gap-2 place-items-start max-md:gap-4 "}>
                <SettingsInput
                    className={"rounded-md w-full max-w-[200px] "}
                    label={t("name")}
                    id={`name`}
                    value={newUserName!}
                    onChange={handleUserNameChange}
                    type={"text"}
                />

                <Button
                    disabled={user?.displayName === newUserName}
                    onClick={handleUserDisplayNameChange}
                    className={
                        "border-2 border-typography-light disabled:opacity-55 disabled:select-none dark:border-typography-dark px-2 py-1 rounded-md enabled:hover:bg-bg-dark enabled:hover:text-typography-dark enabled:dark:hover:text-typography-light enabled:dark:hover:bg-bg-light transition-colors duration-150"
                    }
                >
                    {t("change")}
                </Button>
                <div className="flex flex-col gap-12 mt-4">
                    <LanguageSwitch />{" "}
                    <Button
                        onClick={() => handleSignOut(dispatch)}
                        className="border-2 border-typography-light dark:border-typography-dark px-2 py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark dark:hover:text-typography-light dark:hover:bg-bg-light transition-colors duration-150"
                    >
                        {t("logOut")}
                    </Button>
                </div>
            </div>
            <div className={"flex flex-col gap-2 items-center"}>
                <h3>{t("yourPhoto")}</h3>
                {user?.img ? (
                    <img
                        className={
                            "aspect-square rounded-md w-[clamp(2rem,40vw,10rem)]"
                        }
                        src={user?.img ? user.img : userIcon}
                        alt={""}
                    />
                ) : (
                    <FallbackAvatar
                        width="w-[clamp(2rem,40vw,10rem)]"
                        height="w-[clamp(2rem,40vw,10rem)]"
                        rounded="rounded-md"
                        username={
                            user?.displayName
                                ? user.displayName
                                : user?.email
                                ? user.email
                                : "?"
                        }
                    />
                )}
                <div className={"flex gap-2 justify-center items-center"}>
                    <Button
                        onClick={() => {}}
                        className={
                            "border-2 border-typography-light dark:border-typography-dark p-2 rounded-md hover:bg-bg-dark hover:text-typography-dark dark:hover:text-typography-light dark:hover:bg-bg-light transition-colors duration-150"
                        }
                    >
                        {t("upload")}
                    </Button>
                    {user?.img && (
                        <Button
                            onClick={() => {}}
                            className={
                                "border-2 border-typography-light dark:border-typography-dark p-2 rounded-md hover:bg-bg-dark hover:text-typography-dark dark:hover:text-typography-light dark:hover:bg-bg-light transition-colors duration-150"
                            }
                        >
                            {t("remove")}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
export default UserInfoSettings
