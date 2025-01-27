import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import Button from "../atoms/Button"
import SettingsHeader from "../atoms/SettingsHeader"
import SettingsInput from "../atoms/SettingsInput"
import {
    updateTeamName,
    uploadTeamLogo
} from "../../redux/slices/teamManagementSlice"
import { useSelector } from "react-redux"
import { useState } from "react"
import FileUpload from "../atoms/FileUpload"
import { t } from "i18next"

const TeamSettingsPanel = () => {
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const teams = useSelector((state: RootState) => state.teamManagement.teams)

    // const [logoFile, setLogoFile] = useState<File | null>(null)

    const currentTeam = teams.find(
        (team) => team.id === user?.currentSelectedTeam
    )

    const [newTeamName, setNewTeamName] = useState<string | undefined>(
        currentTeam?.name
    )

    const handleNewTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTeamName(e.target.value)
    }

    const handleTeamNameUpdate = () => {
        dispatch(
            updateTeamName({
                currentTeam: user?.currentSelectedTeam,
                newTeamName: newTeamName!
            })
        )
    }

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            uploadTeamLogo({
                teamID: user?.currentSelectedTeam!,
                file: e.target.files![0]
            })
        )
    }

    return (
        <div className="p-4">
            <SettingsHeader>{t("teamSettings")}</SettingsHeader>
            <div className={`flex justify-between w-full max-w-[90%]`}>
                <div className={"grid gap-2 place-items-start"}>
                    <SettingsInput
                        value={currentTeam?.name}
                        onChange={(e) => handleNewTeamName(e)}
                        id="teamName"
                        type="text"
                        label={t("teamName")}
                    />

                    <Button
                        className="mt-4 border-2 border-typography-light dark:border-typography-dark px-2 py-1 rounded-md hover:bg-bg-dark dark:hover:bg-bg-light dark:hover:text-typography-light hover:text-typography-dark transition-colors duration-150"
                        onClick={handleTeamNameUpdate}
                    >
                        {t("change")}
                    </Button>
                </div>
                <div className={"flex flex-col gap-2 items-center"}>
                    <h3>{t("teamLogo")}</h3>
                    <div className=" w-full min-w-[160px] aspect-square [&>*]:rounded-md">
                        {currentTeam?.logo ? (
                            <img
                                src={currentTeam?.logo}
                                alt="team logo"
                                className="w-full object-cover rounded-full"
                            />
                        ) : (
                            <div className="w-full aspect-square bg-gray-500" />
                        )}
                    </div>

                    <div className={"flex gap-2 justify-center items-center"}>
                        <FileUpload
                            label={t("upload")}
                            id="file_upload"
                            onChange={(e) => handleLogoUpload(e)}
                            accept="image/*"
                        />
                    </div>
                </div>
            </div>
            <div
                className={"mt-[clamp(3rem,30vh,9rem)] flex flex-col relative"}
            >
                <div className={"grid gap-2"}>
                    <h3 className={"font-medium"}>
                        {t("delete")} {currentTeam?.name}
                    </h3>
                    <p>{t("deleteTeamText")}</p>
                </div>
                <Button
                    className={
                        "border-2 border-danger text-danger rounded-md  hover:bg-danger hover:text-typography-dark transition-colors duration-150 w-fit p-2 mt-4"
                    }
                >
                    {t("delete")} {currentTeam?.name}
                </Button>
            </div>
        </div>
    )
}
export default TeamSettingsPanel
