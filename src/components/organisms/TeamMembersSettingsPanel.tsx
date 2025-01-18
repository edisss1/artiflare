import { AppDispatch, RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import SearchMembers from "../atoms/SearchMembers"
import MembersDisplay from "../molecules/MembersDisplay"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCurrentSelectedTeam } from "../../redux/slices/teamManagementSlice"
import InviteIcon from "../icons/InviteIcon"
import Button from "../atoms/Button"

const TeamMembersSettingsPanel = () => {
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)

    const currentTeam = useSelector(
        (state: RootState) => state.teamManagement.currentTeam
    )

    useEffect(() => {
        dispatch(getCurrentSelectedTeam(user))
        console.log("dispatched")
    }, [])

    return (
        <div className="">
            <div className="px-4 pt-4 flex items-center gap-6 mb-8">
                <h2>Members</h2>
                <Button className="flex gap-2 items-center border-2 border-secondary rounded-lg hover:bg-secondary dark:hover:text-typography-light transition-colors duration-150 px-2 py-2">
                    <InviteIcon /> <p>Invite new users</p>
                </Button>
            </div>
            <div className="w-full flex items-center text-typography-light bg-secondary px-4 py-2">
                <p className="flex gap-2">
                    {currentTeam?.members.length}
                    <span>
                        {currentTeam
                            ? currentTeam.members.length === 1
                                ? "member is"
                                : "members are"
                            : ""}{" "}
                        in team
                    </span>
                </p>
            </div>
            <SearchMembers />
            <MembersDisplay currentTeam={currentTeam} />
        </div>
    )
}
export default TeamMembersSettingsPanel
