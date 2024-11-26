import { useParams } from "react-router-dom"
import SettingsHeader from "../atoms/SettingsHeader"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import SearchMembers from "../atoms/SearchMembers"

const TeamMembersSettingsPanel = () => {
    const { currentTeamID } = useParams()
    const teams = useSelector((state: RootState) => state.teamManagement.teams)

    const currentTeam = teams.find((team) => team.id === currentTeamID)

    console.log(currentTeam)

    return (
        <div className="">
            <div className="px-4 pt-4">
                <SettingsHeader>Users</SettingsHeader>
            </div>
            <div className="w-full flex items-center  bg-secondary px-4 py-2">
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
        </div>
    )
}
export default TeamMembersSettingsPanel
