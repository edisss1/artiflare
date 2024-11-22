import JoinTeamModalContent from "../atoms/JoinTeamModalContent"
import CreateTeamModalContent from "../atoms/CreateTeamModalContent"

interface TeamManagementModalProps {
    isCreateModal: boolean
    setIsCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}

const TeamManagementModal = ({
    isCreateModal,
    setIsCreateModal
}: TeamManagementModalProps) => {
    return (
        <div>
            {isCreateModal ? (
                <CreateTeamModalContent setIsCreateModal={setIsCreateModal} />
            ) : (
                <JoinTeamModalContent setIsCreateModal={setIsCreateModal} />
            )}
        </div>
    )
}
export default TeamManagementModal
