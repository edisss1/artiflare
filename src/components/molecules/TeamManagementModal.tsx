import JoinTeamModalContent from "../atoms/JoinTeamModalContent"
import CreateTeamModalContent from "../atoms/CreateTeamModalContent"

interface TeamManagementModalProps {
    isCreateModal: boolean
    setIsCreateModal: React.Dispatch<React.SetStateAction<boolean>>
    modalRef: React.MutableRefObject<HTMLDialogElement | null>
}

const TeamManagementModal = ({
    isCreateModal,
    setIsCreateModal,
    modalRef
}: TeamManagementModalProps) => {
    return (
        <div>
            {isCreateModal ? (
                <CreateTeamModalContent
                    modalRef={modalRef}
                    setIsCreateModal={setIsCreateModal}
                />
            ) : (
                <JoinTeamModalContent
                    modalRef={modalRef}
                    setIsCreateModal={setIsCreateModal}
                />
            )}
        </div>
    )
}
export default TeamManagementModal
