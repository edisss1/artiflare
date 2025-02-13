import { Team } from "../../types/Team"
import TeamCard from "./TeamCard"

interface TeamSuggestionsListProps {
    teamResults: Team[]
}

const TeamSuggestionsList = ({ teamResults }: TeamSuggestionsListProps) => {
    return (
        <div className="w-full absolute  bg-primary px-4 py-2 rounded-b-lg flex flex-col gap-4 max-h-[200px] overflow-y-auto">
            {teamResults.map((team) => (
                <TeamCard id={team.id} name={team.name} />
            ))}
        </div>
    )
}
export default TeamSuggestionsList
