import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import {
    getCurrentSelectedTeam,
    getTeams,
    updateCurrentSelectedTeam
} from "../../redux/slices/teamManagementSlice"
import { useEffect, useState } from "react"
import SettingsSelect from "../atoms/SettingsSelect"
import ProfileSettingsIcon from "../icons/ProfileSettingsIcon"
import SettingsLink from "../atoms/SettingsLink"
import TeamProfileIcon from "../icons/TeamProfileIcon"
import TeamMembersIcon from "../icons/TeamMembersIcon"
import { t } from "i18next"
import { useNavigate } from "react-router-dom"

interface SettingsLinksProps {
    uid: string | undefined
    isPanelVisible: boolean
}

const SettingsPanel = ({ uid, isPanelVisible }: SettingsLinksProps) => {
    const dispatch: AppDispatch = useDispatch()
    const { teams, currentTeam } = useSelector(
        (state: RootState) => state.teamManagement
    )
    const user = useSelector((state: RootState) => state.auth.user)
    const [teamOptions, setTeamOptions] = useState<
        (
            | {
                  label: string
                  value: string
              }
            | {
                  label: string
                  value: string
                  selected: boolean
              }
        )[]
    >([])

    const navigate = useNavigate()

    useEffect(() => {
        if (user?.teams && user) {
            dispatch(getTeams(user))
        }
    }, [user])

    useEffect(() => {
        setTeamOptions([
            {
                label: currentTeam?.name!,
                value: currentTeam?.id!,
                selected: true
            },
            ...teams
                .filter((team) => team.id !== currentTeam?.id)
                .map((team) => ({
                    label: team.name,
                    value: team.id!
                }))
        ])
    }, [currentTeam])

    const handleCurrentTeamChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedTeamID = e.target.value
        dispatch(updateCurrentSelectedTeam({ selectedTeamID, user }))

        navigate(`/app/settings/team/${user?.currentSelectedTeam}`)
    }

    useEffect(() => {
        if (user) {
            const unsubscribe = dispatch(getCurrentSelectedTeam(user))
            return () => {
                if (typeof unsubscribe === "function") {
                    unsubscribe()
                }
            }
        }
    }, [user])

    return (
        <aside
            className={`${
                isPanelVisible ? "left-0" : "-left-[1000px]"
            } flex  flex-col bg-primary max-lg:absolute transition-[left] duration-500 max-lg:min-w-screen max-lg:z-40 dark:bg-primary-dark text-typography-light dark:text-typography-dark w-full max-lg:items-center max-lg:max-w-screen lg:max-w-[300px] p-4 rounded-md h-full lg:min-h-[500px]  overflow-hidden  `}
        >
            <div>
                <div className="flex items-center   mb-4 dark:p-2 dark:bg-primary dark:rounded-md transition-all">
                    <div
                        role="change to image later"
                        className="w-12 h-12 bg-gray-500 aspect-square rounded-md"
                    />
                    <SettingsSelect
                        onChange={handleCurrentTeamChange}
                        options={teamOptions}
                        value={currentTeam?.id}
                    />
                </div>
                <SettingsLink
                    icon={<ProfileSettingsIcon />}
                    to={t("profileSettings")}
                    path={`/app/settings/profile/${uid}`}
                />
                <div className={"flex flex-col gap-6"}>
                    <div>
                        <h2 className={"font-medium mb-2"}>{t("account")}</h2>
                        <div>
                            <SettingsLink
                                path={`/app/settings/team/${user?.currentSelectedTeam}`}
                                to={t("teamSettings")}
                                icon={<TeamProfileIcon />}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className={"font-medium mb-2"}>
                            {t("userManagement")}
                        </h2>
                        <div>
                            <SettingsLink
                                path={`/app/settings/team/${user?.currentSelectedTeam}/members`}
                                to={t("teamMembers")}
                                icon={<TeamMembersIcon />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
export default SettingsPanel
