import { useTranslation } from "react-i18next"

type WhyUsSectionProps = {
    header: string
    text: string
}

const WhyUsSection = ({ header, text }: WhyUsSectionProps) => {
    const { t } = useTranslation()
    return (
        <div className="flex flex-col items-center text-center w-full max-w-[250px] gap-4">
            <h4 className="font-medium text-xl">{t(header)}</h4>
            <p>{t(text)}</p>
        </div>
    )
}
export default WhyUsSection
