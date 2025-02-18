import { t } from "i18next"
import TermsOfServiceSection from "../components/atoms/TermsOfServiceSection"
import Footer from "../components/organisms/Footer"
import NavBar from "../components/organisms/NavBar"
import TextContainer from "../components/atoms/TextContainer"

interface TermsOfServiceSectionType {
    title: string
    content: string
}

const TermsOfService = () => {
    const termsOfService = t("termsOfServiceSections", {
        returnObjects: true
    }) as TermsOfServiceSectionType[]

    return (
        <>
            <NavBar />
            <TextContainer>
                <h1 className="self-center text-xl">{t("termsOfService")}</h1>
                {termsOfService.map((section) => (
                    <TermsOfServiceSection key={section.title} {...section} />
                ))}
            </TextContainer>
            <Footer />
        </>
    )
}
export default TermsOfService
