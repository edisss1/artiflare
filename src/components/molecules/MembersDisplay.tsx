import { Team } from "../../types/Team"
import { formatRelativeDate } from "../../utils/formatRelativeDate"

interface MembersDisplayProps {
    currentTeam: Team | undefined
}

const MembersDisplay = ({ currentTeam }: MembersDisplayProps) => {
    return (
        <div className="flex flex-col gap-2 mx-8 mt-8">
            <div className="grid grid-cols-3">
                <h3>Name</h3>
                <h3>Role</h3>
                <h3>Last access</h3>
            </div>
            {currentTeam?.members.map((member) => (
                <div className="grid grid-cols-3 items-center">
                    <div className="flex items-center gap-2">
                        <img
                            className="w-8 h-8 rounded-full"
                            src={member.img ? member.img : ""}
                            alt=""
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">{member.displayName}</p>
                            <p className="text-xs">{member.email}</p>
                        </div>
                    </div>
                    <div className="col-start-2">
                        <span className="capitalize">{member.role}</span>
                    </div>
                    <div className="col-start-3">
                        <span>{formatRelativeDate(member.lastAccessAt)}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MembersDisplay
