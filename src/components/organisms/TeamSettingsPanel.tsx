import Button from "../atoms/Button"
import SettingsHeader from "../atoms/SettingsHeader"

const TeamSettingsPanel = () => {
    return (
        <div className="p-4">
            <SettingsHeader>Team profile</SettingsHeader>
            <div className={`flex justify-between w-full max-w-[90%]`}>
                <div className={"grid gap-2 place-items-start"}></div>
                <div className={"flex flex-col gap-2 items-center"}>
                    <h3>Your photo</h3>

                    <div className={"flex gap-2 justify-center items-center"}>
                        <Button
                            className={
                                "border-2 border-typography-light p-2 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-colors duration-150"
                            }
                        >
                            Upload
                        </Button>
                        <Button
                            className={
                                "border-2 border-typography-light p-2 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-colors duration-150"
                            }
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className={"mt-[clamp(3rem,30vh,9rem)] flex flex-col relative"}
            >
                <div className={"grid gap-2"}>
                    <h3 className={"font-medium"}>Delete Profile</h3>
                    <p>
                        Deleting the profile will irreversibly remove all your
                        boards{" "}
                    </p>
                </div>
                <Button
                    className={
                        "border-2 border-danger text-danger rounded-md  hover:bg-danger hover:text-typography-dark transition-colors duration-150 w-fit p-2 mt-4"
                    }
                >
                    Delete profile
                </Button>
            </div>
        </div>
    )
}
export default TeamSettingsPanel
