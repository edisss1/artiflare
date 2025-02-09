import Button from "./Button.tsx"
import CloseIcon from "../icons/CloseIcon.tsx"
import ReadIcon from "../icons/ReadIcon.tsx"
import { useTranslation } from "react-i18next"

function NotificationsContainerHeader(props: { onClick: () => void }) {
    const { t } = useTranslation()

    return (
        <div className={"flex flex-col "}>
            <div className={"flex items-center  justify-between"}>
                <h2 className={"font-medium"}>{t("notifications")}</h2>
                <Button className={""} onClick={props.onClick}>
                    <CloseIcon />
                </Button>
            </div>
            <Button className="flex items-center  gap-2 mt-4">
                <ReadIcon />
                <p>{t("markAllAsRead")}</p>
            </Button>
        </div>
    )
}

export default NotificationsContainerHeader
