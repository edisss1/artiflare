import Button from "./Button.tsx"
import { AppDispatch, RootState } from "../../redux/store.ts"
import { useDispatch } from "react-redux"

import { t } from "i18next"
import { deleteTeam } from "../../redux/slices/teamManagementSlice.ts"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const TeamDeletionModalContent = () => {
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const navigate = useNavigate()

    return (
        <div className={"flex flex-col items-center"}>
            <div className={"grid gap-2 place-items-center"}>
                <h2 className={"text-3xl"}>{t("areYouSure")}</h2>
                <p className={"text-lg"}>{t("irreversible")} </p>
            </div>
            <Button
                onClick={() => {
                    dispatch(deleteTeam(user?.currentSelectedTeam))
                    navigate(0)
                }}
                className={
                    "mt-8 border-2 text-danger border-danger px-4 py-1 rounded-lg hover:rounded-md hover:bg-danger hover:text-typography-dark transition-colors duration-150"
                }
            >
                {t("delete")}
            </Button>
        </div>
    )
}
export default TeamDeletionModalContent
