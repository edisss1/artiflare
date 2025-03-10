import { AppDispatch, RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import SearchMembers from "../atoms/SearchMembers"
import MembersDisplay from "../molecules/MembersDisplay"

import InviteIcon from "../icons/InviteIcon"
import Button from "../atoms/Button"
import { t } from "i18next"
import Modal from "../molecules/Modal"
import MemberInviteModalContent from "../atoms/MemberInviteModalContent"
import { useRef, useState } from "react"
import { openModal } from "../../utils/openModal"
import { useDispatch } from "react-redux"
import { clearInvitees } from "../../redux/slices/teamManagementSlice"

const TeamMembersSettingsPanel = () => {
    const dispatch: AppDispatch = useDispatch()
    const { currentTeam } = useSelector(
        (state: RootState) => state.teamManagement
    )
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const [membersQuery, setMembersQuery] = useState("")
    const [query, setQuery] = useState("")
    // const { inviteeQueryResults, invitees } = useSelector(
    //     (state: RootState) => state.teamManagement
    // )

    const clearForm = () => {
        setQuery("")
        dispatch(clearInvitees())
    }

    return (
        <div className="">
            <div className="px-4 pt-4 flex items-center gap-6 mb-8">
                <h2>{t("members")}</h2>
                <Button
                    onClick={() => openModal(modalRef)}
                    className="flex gap-2 items-center group border-2 border-secondary rounded-lg hover:bg-secondary dark:hover:text-typography-light transition-colors duration-150 px-2 py-2"
                >
                    <InviteIcon className="group-hover:[&>*]:stroke-bg-dark transition-colors duration-150" />
                    <p>{t("inviteNewUsers")}</p>
                </Button>
            </div>
            <div className="w-full flex items-center text-typography-light bg-secondary px-4 py-2">
                <p className="flex gap-2">
                    {currentTeam?.members.length}
                    <span>
                        {currentTeam && currentTeam.members.length === 1
                            ? t("memberInTeam")
                            : t("membersInTeamPlural")}
                    </span>
                </p>
            </div>
            <SearchMembers query={membersQuery} setQuery={setMembersQuery} />
            <MembersDisplay
                query={membersQuery}
                teamMembers={currentTeam?.members}
            />
            <Modal
                maxHeight="max-h-[450px] h-full"
                minHeight="min-h-[400px]"
                modalRef={modalRef}
                clearForm={clearForm}
            >
                <MemberInviteModalContent
                    query={query}
                    setQuery={setQuery}
                    modalRef={modalRef}
                />
            </Modal>
        </div>
    )
}
export default TeamMembersSettingsPanel
