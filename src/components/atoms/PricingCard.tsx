import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

type PricingCardProps = {
    planName: string
    price: string | number
    features: string
    signUpWith: string
    paymentLink?: string | undefined
    gradient: string
    isFree?: boolean
}

const PricingCard = ({
    planName,
    price,
    features,
    signUpWith,
    paymentLink,
    gradient,
    isFree
}: PricingCardProps) => {
    const { t } = useTranslation()

    const translatedFeatures = t(features, { returnObjects: true }) as string[]

    return (
        <div
            className={`w-full max-w-[320px] dark:text-typography-light relative ${gradient} rounded-md bg-primary dark:bg-primary-dark dark:text-typography-dark p-8 min-h-[400px] `}
        >
            <div className="w-full flex flex-col gap-2">
                <h4 className={"text-3xl font-medium"}>{t(planName)}</h4>
                <div className="flex">
                    <span className={"self-end font-medium text-lg"}>$</span>
                    <span
                        className={
                            "text-[clamp(1.5rem,30vw,3rem)] self-end h-[3.5rem]"
                        }
                    >
                        {price}
                    </span>
                </div>
            </div>
            <ul className="list-disc mt-4 ml-4">
                {translatedFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                ))}
            </ul>

            {isFree ? (
                <Link
                    className="bg-secondary absolute bottom-7 left-8 py-3 text-center text-typography-light px-2 rounded-md hover:outline hover:outline-primary transition-all duration-150"
                    to={"/auth/signup"}
                >
                    {t(signUpWith)}
                </Link>
            ) : (
                <a
                    href={paymentLink}
                    target="_blank"
                    className="bg-secondary absolute bottom-7 left-8 py-3 text-center text-typography-light px-2 rounded-md hover:outline hover:outline-primary transition-all duration-150"
                >
                    {t(signUpWith)}
                </a>
            )}
        </div>
    )
}
export default PricingCard
