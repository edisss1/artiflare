import { useTranslation } from "react-i18next"

type InformationTextProps = {
    header: string
    text: string
}

const InformationText = ({ header, text }: InformationTextProps) => {
    const { t } = useTranslation()
    return (
        <div className="w-full max-w-max text-center gap-6 flex flex-col items-center ">
            <h3 className="font-medium text-xl block w-fit">{t(header)}</h3>
            <p className="max-w-[300px] text-lg font-normal">{t(text)}</p>
        </div>
    )
}
export default InformationText
