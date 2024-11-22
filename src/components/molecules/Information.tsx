import { informationContent } from "../../constants/informationContent"
import InformationImage from "../atoms/InformationImage"
import InformationText from "../atoms/InformationText"

const Information = () => {
    return (
        <section className="flex flex-col gap-4 mx-auto w-fit mt-[clamp(1rem,100vh,10rem)] mb-16">
            {informationContent.map((section, index) => (
                <div
                    key={section.header}
                    className={`flex max-md:flex-col-reverse gap-8 justify-between ${
                        index === 1 ? "flex-row-reverse" : ""
                    }`}
                >
                    <InformationText
                        header={section.header}
                        text={section.text}
                    />
                    <InformationImage src={section.src} />
                </div>
            ))}
        </section>
    )
}
export default Information
