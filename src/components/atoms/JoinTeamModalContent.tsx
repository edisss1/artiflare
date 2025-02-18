import { t } from "i18next"
import Button from "./Button"
import FormInput from "./FormInput"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import {
    addNewUserToTeam,
    clearTeams,
    searchTeams,
    updateTeamResults
} from "../../redux/slices/teamManagementSlice"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import TeamSuggestionsList from "./TeamSuggestionsList"
import { Team } from "../../types/Team"
import TeamCard from "./TeamCard"
import SearchIcon from "../icons/SearchIcon"

interface JoinTeamModalContentProps {
    setIsCreateModal: React.Dispatch<React.SetStateAction<boolean>>
    modalRef: React.MutableRefObject<HTMLDialogElement | null>
}

const JoinTeamModalContent = ({
    setIsCreateModal,
    modalRef
}: JoinTeamModalContentProps) => {
    const dispatch: AppDispatch = useDispatch()
    const { teamQueryResults, teamResults } = useSelector(
        (state: RootState) => state.teamManagement
    )
    const [teamQuery, setTeamQuery] = useState("")
    const [addedTeam, setAddedTeam] = useState<Team | null>(null)
    const { user } = useSelector((state: RootState) => state.auth)

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

    const clearForm = () => {
        setTeamQuery("")
        dispatch(clearTeams())
    }

    useEffect(() => {
        const dialog = modalRef.current
        if (dialog) {
            dialog.addEventListener("close", clearForm)
        }

        return () => {
            dialog?.removeEventListener("close", clearForm)
        }
    }, [])

    const handleAddUserToTeam = () => {
        if (addedTeam && user) {
            addNewUserToTeam(addedTeam.id, user.uid)
            modalRef.current?.close()
        }
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
                <div className="grid grid-cols-3 items-center  w-full max-w-[300px] relative ">
                    <FormInput
                        id="team-search-input"
                        className={`col-start-1 col-span-3 row-start-1 border-r-0 rounded-r-none  `}
                        value={teamQuery}
                        onChange={(e) => setTeamQuery(e.target.value)}
                        placeholder="Search teams by name or ID"
                        type="text"
                        autoComplete="off"
                    />
                    <Button
                        type={"submit"}
                        className="bg-bg-light dark:bg-bg-dark  z-40 row-start-1 px-3  h-full border-2 border-l-0 rounded-r-lg border-typography-light dark:border-typography-dark  "
                    >
                        <SearchIcon className="w-6 h-6" />
                    </Button>

                    {teamResults.length > 0 && (
                        <TeamSuggestionsList
                            setAddedTeam={setAddedTeam}
                            teamResults={teamResults}
                        />
                    )}
                </div>
                <div className="w-full my-4 flex  items-center justify-center">
                    {addedTeam && (
                        <TeamCard
                            onClick={() => {}}
                            cursor="cursor-default"
                            id={addedTeam.id}
                            name={addedTeam.name}
                        />
                    )}
                </div>
                {addedTeam && (
                    <p className="text-sm text-danger">
                        You can add only 1 team at a time
                    </p>
                )}
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
            <Button
                onClick={handleAddUserToTeam}
                disabled={!addedTeam}
                className="px-6 absolute bottom-6 border-2 border-typography-light dark:border-typography-dark py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark dark:hover:bg-bg-light dark:hover:text-typography-light transition-colors duration-150"
            >
                {t("join")}
            </Button>
        </div>
    )
}
export default JoinTeamModalContent
