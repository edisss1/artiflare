import { t } from "i18next"
import Button from "./Button"
import FormInput from "./FormInput"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import {
    searchTeams,
    updateTeamResults
} from "../../redux/slices/teamManagementSlice"
import { useSelector } from "react-redux"
import { useState } from "react"

import TeamSuggestionsList from "./TeamSuggestionsList"

interface JoinTeamModalContentProps {
    setIsCreateModal: React.Dispatch<React.SetStateAction<boolean>>
    modalRef: React.MutableRefObject<HTMLDialogElement | null>
}

const JoinTeamModalContent = ({
    setIsCreateModal
}: // modalRef
JoinTeamModalContentProps) => {
    const dispatch: AppDispatch = useDispatch()
    const { teamQueryResults, teamResults } = useSelector(
        (state: RootState) => state.teamManagement
    )
    const [teamQuery, setTeamQuery] = useState("")

    const handleCreateTeamModal = () => {
        setIsCreateModal(true)
    }

    const handleTeamSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(searchTeams({ queryStr: teamQuery })).then(() => {
            if (teamQueryResults) {
                dispatch(updateTeamResults(teamQueryResults))
            }
        })

        setTeamQuery("")
    }

    return (
        <div className="flex flex-col items-center">
            <h3 className="font-medium text-xl text-center mb-6">
                {t("joinATeam")}
            </h3>
            <form
                onSubmit={handleTeamSearch}
                className="flex flex-col items-center w-full max-w-[300px]   "
            >
                {/* <FormInput
                    value=""
                    onChange={() => {}}
                    placeholder="Team name or id"
                    type="text"
                    maxWidth="max-w-[300px]"
                /> */}
                <div className=" w-full max-w-[300px]  relative">
                    <FormInput
                        className={`${
                            teamResults.length > 0
                                ? "rounded-b-none"
                                : "rounded-b-md"
                        } `}
                        value={teamQuery}
                        onChange={(e) => setTeamQuery(e.target.value)}
                        placeholder="Search teams by name or ID"
                        type="text"
                    />
                    {teamResults.length > 0 && (
                        <TeamSuggestionsList teamResults={teamResults} />
                    )}
                </div>

                <div className="flex flex-col mt-6 gap-6 items-center">
                    <p>{t("dontHaveATeam")}</p>
                    <Button
                        type="button"
                        onClick={handleCreateTeamModal}
                        className="relative  dark:border-typography-dark after:content-[''] after:w-full after:h-px after:bg-typography-light dark:after:bg-typography-dark after:scale-x-0 hover:after:scale-x-100 after:transform after:origin-center after:transition-all duration-300 after:absolute after:top-full after:left-0"
                    >
                        {t("createOne")}
                    </Button>
                </div>
            </form>
            <Button className="px-6 absolute bottom-6 border-2 border-typography-light dark:border-typography-dark py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark dark:hover:bg-bg-light dark:hover:text-typography-light transition-colors duration-150">
                {t("join")}
            </Button>
        </div>
    )
}
export default JoinTeamModalContent
