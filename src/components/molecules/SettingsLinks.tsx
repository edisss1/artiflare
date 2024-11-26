import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import {
    getTeams,
    setCurrentTeam
} from "../../redux/slices/teamManagementSlice"
import { useEffect } from "react"
import SettingsSelect from "../atoms/SettingsSelect"

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
            <div className="flex  items-center justify-between mb-4 dark:p-2 dark:bg-primary dark:rounded-md transition-all">
                <div
                    role="change to image later"
                    className="w-12 bg-gray-500 aspect-square rounded-md"
                ></div>
                <SettingsSelect
                    onChange={handleCurrentTeamChange}
                    options={teamOptions}
                />
            </div>
            <NavLink className={"mb-4"} to={`profile/${uid}`}>
                Profile settings
            </NavLink>
            <div className={"flex flex-col gap-6"}>
                <div>
                    <h2 className={"font-medium"}>Account</h2>
                    <div>
                        <NavLink to={`/app/settings/team/${currentTeam}`}>
                            Team profile
                        </NavLink>
                    </div>
                </div>

                <div>
                    <h2 className={"font-medium"}>User management</h2>
                    <div>
                        <NavLink
                            to={`/app/settings/team/${currentTeam}/members`}
                        >
                            Team members
                        </NavLink>
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default SettingsLinks
