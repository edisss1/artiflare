import Button from "./Button.tsx"
import { AppDispatch } from "../../redux/store.ts"
import { useDispatch } from "react-redux"
import {
    clearUser,
    deleteUserFromDatabase
} from "../../redux/slices/authSlice.ts"
import { useNavigate } from "react-router-dom"
import { t } from "i18next"

const UserDeletionModalContent = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const handleUserDeletion = () => {
        dispatch(deleteUserFromDatabase())
        dispatch(clearUser())
        setTimeout(() => {
            navigate("/")
        }, 5000)
    }

    return (
        <div className={"flex flex-col items-center"}>
            <div className={"grid gap-2 place-items-center"}>
                <h2 className={"text-3xl"}>{t("areYouSure")}</h2>
                <p className={"text-lg"}>{t("irreversible")} </p>
            </div>
            <Button
                onClick={handleUserDeletion}
                className={
                    "mt-8 border-2 text-danger border-danger px-4 py-1 rounded-lg hover:rounded-md hover:bg-danger hover:text-typography-dark transition-colors duration-150"
                }
            >
                {t("delete")}
            </Button>
        </div>
    )
}
export default UserDeletionModalContent
