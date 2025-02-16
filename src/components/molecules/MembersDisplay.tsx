import { t } from "i18next"
import { TeamMember } from "../../types/Team"
import { formatRelativeDate } from "../../utils/formatRelativeDate"
import FallbackAvatar from "../atoms/FallbackAvatar"

interface MembersDisplayProps {
    teamMembers: TeamMember[] | undefined
    query: string
}

const MembersDisplay = ({ teamMembers, query }: MembersDisplayProps) => {
    return (
        <div className="flex flex-col gap-4 mx-8 my-8   max-lg:min-h-[500px] lg:max-h-[500px] overflow-y-auto custom-scrollbar-modal">
            <div className="grid grid-cols-3">
                <h3>{t("name")}</h3>
                <h3>{t("role")}</h3>
                <h3>{t("lastAccess")}</h3>
            </div>
            {teamMembers &&
                teamMembers
                    .filter((member) => {
                        return query.toLowerCase() === ""
                            ? member
                            : member.displayName
                                  ?.toLowerCase()
                                  .includes(query.toLowerCase())
                    })
                    .map((member) => (
                        <div
                            key={member.uid}
                            className="grid grid-cols-3 items-center "
                        >
                            <div className="flex max-md:flex-col max-lg:items-start items-center gap-2">
                                {member.img ? (
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={member.img}
                                        alt=""
                                    />
                                ) : (
                                    <FallbackAvatar
                                        width="w-8"
                                        height="h-8"
                                        rounded="rounded-full"
                                        username={
                                            member.displayName! || member.email!
                                        }
                                    />
                                )}
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm">
                                        {member.displayName}
                                    </p>
                                    <p className="text-xs truncate max-w-[90px]">
                                        {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="col-start-2">
                                <span className="capitalize">
                                    {member.role}
                                </span>
                            </div>
                            <div className="col-start-3">
                                <span>
                                    {formatRelativeDate(member.lastAccessAt!)}
                                </span>
                            </div>
                        </div>
                    ))}
        </div>
    )
}
export default MembersDisplay
