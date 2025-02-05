import { teamTypeOptions } from "../../constants/teamTypeOptions"
import Button from "./Button"
import FormInput from "./FormInput"
import Select from "./Select"
import { TeamType } from "../../types/TeamType"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import {
    clearInvitees,
    createTeam,
    deleteInvitee,
    searchForInvitees,
    updateInvitees,
    updateQueryResults
} from "../../redux/slices/teamManagementSlice"
import { t } from "i18next"
import InviteesContainer from "../molecules/InviteesContainer"
import UserCard from "./UserCard"
import SearchIcon from "../icons/SearchIcon"
import AddIcon from "../icons/AddIcon"
import { sendInvite } from "../../redux/slices/notificationManagementSlice"

interface CreateTeamModalContentProps {
    setIsCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateTeamModalContent = ({
    setIsCreateModal
}: CreateTeamModalContentProps) => {
    const [teamType, setTeamType] = useState<TeamType["teamType"]>("private")
    const [teamTitle, setTeamTitle] = useState<string>("")
    const { inviteeQueryResults, status, invitees } = useSelector(
        (state: RootState) => state.teamManagement
    )
    const [inviteeQuery, setInviteeQuery] = useState<string>("")

    const dispatch: AppDispatch = useDispatch()

    const user = useSelector((state: RootState) => state.auth.user)

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

            dispatch(sendInvite({ user, invitees }))

            console.log(
                `Team created, sent invites to: ${JSON.stringify(invitees)}`
            )

            dispatch(clearInvitees())
        }
    }

    useEffect(() => {
        console.log(inviteeQueryResults)
        console.log(`Invitees array: ${invitees}`)
    }, [inviteeQueryResults, invitees])

    const handleInviteeSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(
            searchForInvitees({
                queryStr: inviteeQuery,
                userEmail: user?.email,
                userID: user?.uid!
            })
        )
        console.log(status)
        console.log(`Query: ${inviteeQuery}`)
        setInviteeQuery("")
    }

    const addInviteeToList = () => {
        if (inviteeQueryResults) {
            dispatch(updateInvitees(inviteeQueryResults))
        }

        dispatch(updateQueryResults())
    }

    return (
        <div className="flex flex-col items-center">
            <h3 className="font-medium text-xl text-center mb-6">
                {t("createATeam")}
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
                    <form
                        onSubmit={handleInviteeSearch}
                        id="invitee-search"
                        // className="relative"
                        className="grid grid-cols-3 items-center "
                    >
                        <FormInput
                            className="col-start-1 col-span-3 row-start-1 border-r-0 rounded-r-none "
                            value={inviteeQuery}
                            onChange={(e) => setInviteeQuery(e.target.value)}
                            placeholder="Search users by email or ID"
                            type="text"
                        />
                        {inviteeQueryResults === null ? (
                            <Button
                                type={"submit"}
                                // onClick={handleInviteeSearch}
                                className="bg-bg-light dark:bg-bg-dark z-40 row-start-1 px-3  h-full border-2 border-l-0 rounded-r-lg border-typography-light dark:border-typography-dark  "
                            >
                                <SearchIcon className="w-6 h-6" />
                            </Button>
                        ) : (
                            <Button
                                onClick={addInviteeToList}
                                className="bg-bg-light  z-40 row-start-1 px-3  h-full border-2 border-l-0 rounded-r-lg border-typography-light dark:border-typography-dark  "
                            >
                                <AddIcon />
                            </Button>
                        )}
                    </form>
                    <InviteesContainer>
                        {invitees.map((invitee) => (
                            <UserCard
                                onClick={() => dispatch(deleteInvitee(invitee))}
                                key={invitee.uid}
                                img={invitee.img}
                                name={invitee.displayName}
                            />
                        ))}
                    </InviteesContainer>
                </div>
                <div className="flex flex-col items-center mt-6 gap-6">
                    <p>{t("alreadyHaveATeam")}</p>
                    <Button
                        onClick={handleJoinTeamModal}
                        className="relative rounded-lg t dark:border-typography-dark after:content-[''] after:w-full after:h-px after:bg-typography-light dark:after:bg-typography-dark after:scale-x-0 hover:after:scale-x-100 after:transform after:origin-center after:transition-all duration-300 after:absolute after:top-full after:left-0"
                    >
                        {t("findIt")}!
                    </Button>
                </div>
            </div>
            <Button
                disabled={teamTitle === ""}
                onClick={handleCreateNewTeam}
                className="px-6 absolute bottom-6 border-2 disabled:opacity-50 border-typography-light dark:border-typography-dark py-1 rounded-md enabled:hover:bg-bg-dark enabled:hover:text-typography-dark enabled:dark:hover:bg-bg-light enabled:dark:hover:text-typography-light transition-colors duration-150"
            >
                {t("create")}
            </Button>
        </div>
    )
}
export default CreateTeamModalContent
