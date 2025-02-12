import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import {
    clearInvitees,
    deleteInvitee,
    searchForInvitees,
    updateInvitees,
    updateQueryResults
} from "../../redux/slices/teamManagementSlice"
import { useState } from "react"
import FormInput from "./FormInput"
import Button from "./Button"
import SearchIcon from "../icons/SearchIcon"
import AddIcon from "../icons/AddIcon"
import InviteesContainer from "../molecules/InviteesContainer"
import UserCard from "./UserCard"
import { sendInvite } from "../../redux/slices/notificationManagementSlice"

interface MemberInviteModalContentProps {
    modalRef: React.MutableRefObject<HTMLDialogElement | null>
}

const MemberInviteModalContent = ({
    modalRef
}: MemberInviteModalContentProps) => {
    const dispatch: AppDispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const [query, setQuery] = useState("")
    const { inviteeQueryResults, invitees } = useSelector(
        (state: RootState) => state.teamManagement
    )

    const handleInviteeSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(
            searchForInvitees({
                queryStr: query,
                userEmail: user?.email,
                userID: user?.uid!
            })
        )

        setQuery("")
    }

    const addInviteeToList = () => {
        if (inviteeQueryResults) {
            dispatch(updateInvitees(inviteeQueryResults))
        }

        dispatch(updateQueryResults())
    }

    const handleInvites = () => {
        dispatch(
            sendInvite({
                user,
                teamID: user?.currentSelectedTeam,
                invitees
            })
        )
        modalRef.current?.close()

        dispatch(clearInvitees())
    }

    return (
        <div className="grid place-items-center gap-8 h-[calc(100%)]">
            <div className="max-w-[60%]  w-full mx-auto  ">
                <h2 className="text-center mb-4 text-xl">Invite new users</h2>
                <form
                    onSubmit={handleInviteeSearch}
                    id="invitee-search"
                    className="grid grid-cols-3 items-center "
                >
                    <FormInput
                        className="col-start-1 col-span-3 row-start-1 border-r-0 rounded-r-none "
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search users by email or ID"
                        type="text"
                        autoComplete="off"
                    />
                    {inviteeQueryResults === null ? (
                        <Button
                            type={"submit"}
                            className="bg-bg-light  z-40 row-start-1 px-3  h-full border-2 border-l-0 rounded-r-lg border-typography-light dark:border-typography-dark  "
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
            <Button
                onClick={handleInvites}
                className="border-2  max-w-[60%] w-full py-3 border-secondary rounded-lg hover:bg-secondary dark:hover:text-typography-light transition-colors duration-150"
            >
                Send invites
            </Button>
        </div>
    )
}
export default MemberInviteModalContent
