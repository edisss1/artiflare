import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import {
    getTeams,
    setCurrentTeam
} from "../../redux/slices/teamManagementSlice"
import { useEffect } from "react"
import SettingsSelect from "../atoms/SettingsSelect"
import ProfileSettingsIcon from "../icons/ProfileSettingsIcon"
import SettingsLink from "../atoms/SettingsLink"
import TeamProfileIcon from "../icons/TeamProfileIcon"
import TeamMembersIcon from "../icons/TeamMembersIcon"

interface SettingsLinksProps {
    uid: string | undefined
}

const SettingsLinks = ({ uid }: SettingsLinksProps) => {
    const dispatch: AppDispatch = useDispatch()
    const teams = useSelector((state: RootState) => state.teamManagement.teams)
    const user = useSelector((state: RootState) => state.auth.user)
    const currentTeam = useSelector(
        (state: RootState) => state.teamManagement.currentTeam
    )

    useEffect(() => {
        if (user?.teams && user) {
            dispatch(getTeams(user))
        }
        console.log(user)
    }, [])

    const teamOptions = teams.map((team) => {
        return {
            label: team.name,
            value: team.id!
        }
    })

    console.log(teamOptions)

    const handleCurrentTeamChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        dispatch(setCurrentTeam(e.target.value))
    }

    return (
        <aside className="flex flex-col bg-primary dark:bg-primary-dark text-typography-light dark:text-typography-dark w-full max-w-[300px] p-4 rounded-md h-full min-h-[500px]  ">
            <div className="flex items-center  mb-4 dark:p-2 dark:bg-primary dark:rounded-md transition-all">
                <div
                    role="change to image later"
                    className="w-12 bg-gray-500 aspect-square rounded-md"
                ></div>
                <SettingsSelect
                    onChange={handleCurrentTeamChange}
                    options={teamOptions}
                />
            </div>
            <SettingsLink
                icon={<ProfileSettingsIcon />}
                to={"Profile settings"}
                path={`/app/settings/profile/${uid}`}
            />
            <div className={"flex flex-col gap-6"}>
                <div>
                    <h2 className={"font-medium mb-2"}>Account</h2>
                    <div>
                        <SettingsLink
                            path={`/app/settings/team/${currentTeam}`}
                            to="Team profile"
                            icon={<TeamProfileIcon />}
                        />
                    </div>
                </div>

                <div>
                    <h2 className={"font-medium mb-2"}>User management</h2>
                    <div>
                        <SettingsLink
                            path={`/app/settings/team/${currentTeam}/members`}
                            to="Team members"
                            icon={<TeamMembersIcon />}
                        />
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default SettingsLinks
