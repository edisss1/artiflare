import TermsOfServiceSection from "../components/atoms/TermsOfServiceSection"
import Footer from "../components/organisms/Footer"
import NavBar from "../components/organisms/NavBar"
import { termsOfServiceSections } from "../constants/termsOfServiceSections"

const TermsOfService = () => {
    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center mt-6">
                <h1 className="self-center text-xl">Terms of Service</h1>
                {termsOfServiceSections.map((section) => (
                    <TermsOfServiceSection key={section.id} {...section} />
                ))}
            </div>
            <Footer />
        </>
    )
}
export default TermsOfService
