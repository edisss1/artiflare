import { useTranslation } from "react-i18next"
import PricingCard from "../atoms/PricingCard"

const Pricing = () => {
    const { t } = useTranslation()

    const pricingPlans = [
        {
            tier: "pricingBasic",
            price: 0,
            signUpWith: "forFree",
            isFree: true,
            features: "pricingBasicFeatures",
            gradient: "bg-gradient-to-br from-[#F5E7F8] to-[#BBDCE3]"
        },
        {
            tier: "pricingPro",
            price: 9.99,
            signUpWith: "upgradeNow",
            isFree: false,

            paymentLink: "https://buy.stripe.com/test_00g7up2rk4dm4so6oo",
            features: "pricingProFeatures",
            gradient: "bg-gradient-to-br from-[#C2FAE6] to-[#E7F5BE]"
        },
        {
            tier: "pricingEnterprise",
            price: 25.99,
            signUpWith: "contactUs",
            paymentLink: "https://buy.stripe.com/test_3cscOJ5DweS03ok5kl",
            isFree: false,
            features: "pricingEnterpriseFeatures",
            gradient: "bg-gradient-to-br from-[#AAB8FF] to-[#FFBEE9]"
        }
    ]

    return (
        <div className="flex min-h-[300px]   text-typography-light mb-4 flex-col gap-4 w-full items-center mt-[clamp(1rem,40vh,4rem)]">
            <h3 className={"text-3xl font-medium"}>{t("pricingHeader")}</h3>
            <div className="flex gap-4 w-full justify-center flex-wrap ">
                {pricingPlans.map((plan) => (
                    <PricingCard
                        gradient={plan.gradient}
                        key={plan.tier}
                        planName={plan.tier}
                        isFree={plan.isFree}
                        price={plan.price}
                        features={plan.features}
                        signUpWith={plan.signUpWith}
                        paymentLink={plan.paymentLink}
                    />
                ))}
            </div>
        </div>
    )
}
export default Pricing
