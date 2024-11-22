import Button from "./Button"
import FormInput from "./FormInput"

interface JoinTeamModalContentProps {
    setIsCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}

const JoinTeamModalContent = ({
    setIsCreateModal
}: JoinTeamModalContentProps) => {
    const handleCreateTeamModal = () => {
        setIsCreateModal(true)
    }

    return (
        <div className="flex flex-col items-center">
            <h3 className="font-medium text-xl text-center mb-6">
                Join a team
            </h3>
            <div className="flex flex-col items-center w-full max-w-[300px] ">
                <FormInput
                    value=""
                    onChange={() => {}}
                    placeholder="Team name or id"
                    type="text"
                    maxWidth="max-w-[300px]"
                />
                <div className="flex flex-col mt-6 gap-6">
                    <p>Don't have a team to join?</p>
                    <Button onClick={handleCreateTeamModal} className="">
                        Create one
                    </Button>
                </div>
            </div>
            <Button className="px-6 absolute bottom-6 border-2 border-typography-light dark:border-typography-dark py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark dark:hover:bg-bg-light dark:hover:text-typography-light transition-colors duration-150">
                Join
            </Button>
        </div>
    )
}
export default JoinTeamModalContent
