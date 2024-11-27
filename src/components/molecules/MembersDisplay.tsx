import { Team } from "../../types/Team"

interface MembersDisplayProps {
    currentTeam: Team | undefined
}

const MembersDisplay = ({ currentTeam }: MembersDisplayProps) => {
    return (
        <div className="flex flex-col gap-2 mx-8 mt-8">
            {currentTeam?.members.map((member) => (
                <div className="grid grid-cols-3 ">
                    <div className="flex">
                        <img src={member.img ? member.img : ""} alt="" />
                        <div className="flex flex-col gap-2">
                            <p>{member.displayName}</p>
                            <p>{member.email}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default MembersDisplay
