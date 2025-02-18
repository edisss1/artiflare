import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { Team } from "../../types/Team"
import TeamCard from "./TeamCard"
import { clearTeams } from "../../redux/slices/teamManagementSlice"

interface TeamSuggestionsListProps {
    teamResults: Team[]
    setAddedTeam: React.Dispatch<React.SetStateAction<Team | null>>
}

const TeamSuggestionsList = ({
    teamResults,
    setAddedTeam
}: TeamSuggestionsListProps) => {
    const dispatch: AppDispatch = useDispatch()
    return (
        <div className="w-full absolute top-full bg-primary px-4 py-2 rounded-b-lg flex flex-col gap-4 max-h-[200px] overflow-y-auto">
            {teamResults.map((team) => (
                <TeamCard
                    key={team.id}
                    onClick={() => {
                        setAddedTeam(team)
                        console.log(`Team was added: ${team.id}`)
                        dispatch(clearTeams())
                    }}
                    id={team.id}
                    name={team.name}
                />
            ))}
        </div>
    )
}
export default TeamSuggestionsList
