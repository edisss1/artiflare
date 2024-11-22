import { useState } from "react"
import { teamTypeOptions } from "../../constants/teamTypeOptions"
import Button from "./Button"
import FormInput from "./FormInput"
import Select from "./Select"
import { TeamType } from "../../types/TeamType"

interface CreateTeamModalContentProps {
    setIsCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateTeamModalContent = ({
    setIsCreateModal
}: CreateTeamModalContentProps) => {
    const [teamType, setTeamType] = useState<TeamType>({ teamType: "private" })

    const handleJoinTeamModal = () => {
        setIsCreateModal(false)
    }

    const handleTeamTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTeamType({ teamType: e.target.value } as TeamType)
    }

    return (
        <div className="flex flex-col items-center">
            <h3 className="font-medium text-xl text-center mb-6">
                Create a team
            </h3>
            <div className="flex flex-col items-center w-full max-w-[300px]">
                <div className="flex flex-col gap-2 w-full max-w-[300px]">
                    <FormInput
                        value=""
                        onChange={() => {}}
                        placeholder="Enter a name for your team"
                        type="text"
                    />
                    <Select
                        options={teamTypeOptions}
                        onChange={handleTeamTypeChange}
                    />
                    <FormInput
                        value=""
                        onChange={() => {}}
                        placeholder="Invite users to your team"
                        type="text"
                    />
                </div>
                <div className="flex flex-col mt-6 gap-6">
                    <p>Already have a team to join?</p>
                    <Button onClick={handleJoinTeamModal} className="">
                        Find it!
                    </Button>
                </div>
            </div>
            <Button className="px-6 absolute bottom-6 border-2 border-typography-light dark:border-typography-dark py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark dark:hover:bg-bg-light dark:hover:text-typography-light transition-colors duration-150">
                Create
            </Button>
        </div>
    )
}
export default CreateTeamModalContent
