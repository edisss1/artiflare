import { teamTypeOptions } from "../../constants/teamTypeOptions"
import Button from "./Button"
import FormInput from "./FormInput"
import Select from "./Select"
import { TeamType } from "../../types/TeamType"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import { createTeam } from "../../redux/slices/teamManagementSlice"
import { sendInvite } from "../../redux/slices/notificationManagementSlice"
// import SuggestionList from "./SuggestionList"
// import { fetchSuggestionsForInvites } from "../../utils/fetchSuggestionsForInvites"

interface CreateTeamModalContentProps {
    setIsCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateTeamModalContent = ({
    setIsCreateModal
}: CreateTeamModalContentProps) => {
    const [teamType, setTeamType] = useState<TeamType["teamType"]>("private")
    const [teamTitle, setTeamTitle] = useState<string>("")
    // const [userSearchQuery, setUserSearchQuery] = useState<string>("")
    // const [suggestions, setSuggestions] = useState<string[]>([])
    const dispatch: AppDispatch = useDispatch()

    const user = useSelector((state: RootState) => state.auth.user)

    // const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value
    //     setUserSearchQuery(value)
    //     fetchSuggestionsForInvites(value, setSuggestions)
    // }

    const handleJoinTeamModal = () => {
        setIsCreateModal(false)
    }

    const handleTeamTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTeamType(e.target.value as TeamType["teamType"])
    }

    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeamTitle(e.target.value)
    }

    const handleCreateNewTeam = () => {
        if (user) {
            dispatch(createTeam({ teamTitle, teamType, user, dispatch }))
        }
    }

    const invitees = ["8n0o9lzrPWZF3t9JHP1KBd0zH0i1"]

    return (
        <div className="flex flex-col items-center">
            <h3 className="font-medium text-xl text-center mb-6">
                Create a team
            </h3>
            <div className="flex flex-col items-center w-full max-w-[300px]">
                <div className="flex flex-col gap-2 w-full max-w-[300px]">
                    <FormInput
                        value={teamTitle}
                        onChange={(e) => handleTeamNameChange(e)}
                        placeholder="Enter a name for your team"
                        type="text"
                    />
                    <Select
                        value={teamType}
                        options={teamTypeOptions}
                        onChange={handleTeamTypeChange}
                    />
                    <div className="flex flex-col">
                        {/* <FormInput
                            value={userSearchQuery}
                            onChange={}
                            placeholder="Invite users to your team"
                            type="text"
                        /> */}
                        {/* <SuggestionList
                            suggestions={suggestions}
                            searchQuery={userSearchQuery}
                        /> */}
                        <Button
                            className=""
                            children="Invite test"
                            onClick={() =>
                                dispatch(
                                    sendInvite({
                                        user,
                                        invitees
                                    })
                                )
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center mt-6 gap-6">
                    <p>Already have a team to join?</p>
                    <Button
                        onClick={handleJoinTeamModal}
                        className="relative rounded-lg t dark:border-typography-dark after:content-[''] after:w-full after:h-px after:bg-typography-light dark:after:bg-typography-dark after:scale-x-0 hover:after:scale-x-100 after:transform after:origin-center after:transition-all duration-300 after:absolute after:top-full after:left-0"
                    >
                        Find it!
                    </Button>
                </div>
            </div>
            <Button
                onClick={handleCreateNewTeam}
                className="px-6 absolute bottom-6 border-2 border-typography-light dark:border-typography-dark py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark dark:hover:bg-bg-light dark:hover:text-typography-light transition-colors duration-150"
            >
                Create
            </Button>
        </div>
    )
}
export default CreateTeamModalContent
