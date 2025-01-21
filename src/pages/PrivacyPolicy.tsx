import PrivacyPolicySection from "../components/atoms/PrivacyPolicySection"
import Footer from "../components/organisms/Footer"
import NavBar from "../components/organisms/NavBar"
import { privacyPolicySections } from "../constants/privacyPolicySections"

const PrivacyPolicy = () => {
    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center mt-8 max-w-[700px] mx-auto">
                <div className="mb-4 flex flex-col items-center">
                    <h1 className="text-xl font-medium mb-4">Privacy Policy</h1>
                    <p>{privacyPolicySections.introduction}</p>
                </div>
                <div className="flex flex-col gap-6">
                    {privacyPolicySections.sections.map((section) => (
                        <PrivacyPolicySection key={section.id} {...section} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}
export default PrivacyPolicy
