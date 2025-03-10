import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store.ts"
import Button from "../atoms/Button.tsx"
import Modal from "../molecules/Modal.tsx"
import UserDeletionModalContent from "../atoms/UserDeletionModalContent.tsx"
import userIcon from "../../assets/UserIcon.svg"

import SettingsHeader from "../atoms/SettingsHeader.tsx"
import UserInfoSettings from "../molecules/UserInfoSettings.tsx"
import { updateUserName } from "../../redux/slices/userManagementSlice.ts"
import { t } from "i18next"
import { useNavigate } from "react-router-dom"
import { openModal } from "../../utils/openModal.ts"

const UserSettingsPanel = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch: AppDispatch = useDispatch()
    const { newDisplayName } = useSelector(
        (state: RootState) => state.userManagement
    )
    const navigate = useNavigate()

    const modalRef = useRef<HTMLDialogElement>(null)

    const handleUserDisplayNameChange = () => {
        if (newDisplayName !== "") {
            dispatch(updateUserName({ user, newDisplayName }))
        }
        navigate(0)
    }

    return (
        <div className="p-4">
            <SettingsHeader>{t("profileSettings")}</SettingsHeader>
            <UserInfoSettings
                user={user}
                handleUserDisplayNameChange={handleUserDisplayNameChange}
                userIcon={userIcon}
            />

            <div
                className={"mt-[clamp(3rem,30vh,9rem)] flex flex-col relative"}
            >
                <div className={"grid gap-2"}>
                    <h3 className={"font-medium"}>
                        {t("deleteProfileHeader")}
                    </h3>
                    <p>{t("deleteProfileText")} </p>
                </div>
                <Button
                    onClick={() => openModal(modalRef)}
                    className={
                        "border-2 border-danger dark:border-0 dark:bg-danger dark:text-typography-dark dark:hover:opacity-70 dark:border-danger-dark da text-danger rounded-md  enabled:hover:bg-danger enabled:hover:text-typography-dark transition-all duration-150 w-fit p-2 mt-4 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                >
                    {t("deleteProfileHeader")}
                </Button>
                <Modal minHeight="lg:min-h-[300px] " modalRef={modalRef}>
                    <UserDeletionModalContent />
                </Modal>
            </div>
        </div>
    )
}

export default UserSettingsPanel
