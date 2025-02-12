import { t } from "i18next"
import PrivacyPolicySection from "../components/atoms/PrivacyPolicySection"
import Footer from "../components/organisms/Footer"
import NavBar from "../components/organisms/NavBar"

interface PrivacyPolicySectionType {
    title: string
    content: string[]
}

interface PrivacyPolicyType {
    introduction: string
    sections: PrivacyPolicySectionType[]
}

const PrivacyPolicy = () => {
    const privacyPolicy = t("privacyPolicySections", {
        returnObjects: true
    }) as PrivacyPolicyType

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center mt-8 max-w-[700px] mx-auto max-md:mx-4">
                <div className="mb-4 flex flex-col items-center">
                    <h1 className="text-xl font-medium mb-4">Privacy Policy</h1>
                    <p>{t("privacyPolicySections.introduction")}</p>
                </div>
                <div className="flex flex-col gap-6">
                    {privacyPolicy.sections.map((section) => (
                        <PrivacyPolicySection
                            key={section.title}
                            {...section}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}
export default PrivacyPolicy
