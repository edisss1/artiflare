import { t } from "i18next"
import Button from "./Button"
import FormInput from "./FormInput"

interface JoinTeamModalContentProps {
    setIsCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}

const JoinTeamModalContent = ({
    setIsCreateModal
}: JoinTeamModalContentProps) => {
    const handleCreateTeamModal = () => {
        setIsCreateModal(true)
    }

    return (
        <div className="flex flex-col items-center">
            <h3 className="font-medium text-xl text-center mb-6">
                {t("joinATeam")}
            </h3>
            <div className="flex flex-col items-center w-full max-w-[300px] ">
                <FormInput
                    value=""
                    onChange={() => {}}
                    placeholder="Team name or id"
                    type="text"
                    maxWidth="max-w-[300px]"
                />
                <div className="flex flex-col mt-6 gap-6 items-center">
                    <p>{t("dontHaveATeam")}</p>
                    <Button
                        onClick={handleCreateTeamModal}
                        className="relative  dark:border-typography-dark after:content-[''] after:w-full after:h-px after:bg-typography-light dark:after:bg-typography-dark after:scale-x-0 hover:after:scale-x-100 after:transform after:origin-center after:transition-all duration-300 after:absolute after:top-full after:left-0"
                    >
                        {t("createOne")}
                    </Button>
                </div>
            </div>
            <Button className="px-6 absolute bottom-6 border-2 border-typography-light dark:border-typography-dark py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark dark:hover:bg-bg-light dark:hover:text-typography-light transition-colors duration-150">
                {t("join")}
            </Button>
        </div>
    )
}
export default JoinTeamModalContent
