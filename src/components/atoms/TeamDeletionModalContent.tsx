import Button from "./Button.tsx"
import { t } from "i18next"

const TeamDeletionModalContent = ({ onDelete }: { onDelete: () => void }) => {
    return (
        <div className={"flex flex-col items-center"}>
            <div className={"grid gap-2 place-items-center"}>
                <h2 className={"text-3xl"}>{t("areYouSure")}</h2>
                <p className={"text-lg"}>{t("irreversible")} </p>
            </div>
            <Button
                onClick={onDelete}
                className={
                    "mt-8 border-2 text-danger border-danger px-4 py-1 rounded-lg hover:rounded-md hover:bg-danger hover:text-typography-dark transition-colors duration-150"
                }
            >
                {t("delete")}
            </Button>
        </div>
    )
}
export default TeamDeletionModalContent
