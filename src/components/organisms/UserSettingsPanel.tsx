import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store.ts"
import Button from "../atoms/Button.tsx"
import Modal from "../molecules/Modal.tsx"
import UserDeletionModalContent from "../atoms/UserDeletionModalContent.tsx"
import userIcon from "../../assets/UserIcon.svg"

import SettingsHeader from "../atoms/SettingsHeader.tsx"
import UserInfoSettings from "../molecules/UserInfoSettings.tsx"
import { handleSignOut } from "../../utils/handleSignOut.ts"
import { updateUserName } from "../../redux/slices/userManagementSlice.ts"

const UserSettingsPanel = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch: AppDispatch = useDispatch()
    const { newDisplayName, newCompanyName } = useSelector(
        (state: RootState) => state.userManagement
    )

    const modalRef = useRef<HTMLDialogElement>(null)

    const handleUserDisplayNameChange = () => {
        if (newDisplayName !== "") {
            dispatch(updateUserName({ user, newDisplayName }))
            return
        }
    }

    const openModal = () => {
        modalRef.current?.showModal()
    }

    return (
        <div className="p-4">
            <SettingsHeader>Profile details</SettingsHeader>
            <UserInfoSettings
                user={user}
                newDisplayName={newDisplayName}
                newCompanyName={newCompanyName}
                handleUserDisplayNameChange={handleUserDisplayNameChange}
                handleSignOut={handleSignOut}
                userIcon={userIcon}
            />

            <div
                className={"mt-[clamp(3rem,30vh,9rem)] flex flex-col relative"}
            >
                <div className={"grid gap-2"}>
                    <h3 className={"font-medium"}>Delete Profile</h3>
                    <p>
                        Deleting the profile will irreversibly remove all your
                        boards{" "}
                    </p>
                </div>
                <Button
                    onClick={openModal}
                    className={
                        "border-2 border-danger text-danger rounded-md  hover:bg-danger hover:text-typography-dark transition-colors duration-150 w-fit p-2 mt-4"
                    }
                >
                    Delete profile
                </Button>
                <Modal modalRef={modalRef}>
                    <UserDeletionModalContent />
                </Modal>
            </div>
        </div>
    )
}

export default UserSettingsPanel
