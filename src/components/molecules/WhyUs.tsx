import { whyUsContent } from "../../utils/whyUsContent"
import WhyUsSection from "../atoms/WhyUsSection"

const WhyUs = () => {
  return (
    <div className="w-full flex flex-col text-typography-light items-center  bg-secondary dark:bg-secondary/90 gap-10 py-9">
      <h3 className="text-3xl font-bold relative after:content[''] after:w-full after:h-px after:bg-typography-light after:absolute after:left-0 after:top-[120%]">
        Why choose Artiflare?
      </h3>
      <div className="flex gap-4 flex-wrap">
        {whyUsContent.map((section) => (
          <WhyUsSection
            key={section.header}
            header={section.header}
            text={section.text}
          />
        ))}
      </div>
    </div>
  )
}
export default WhyUs
