import { useEffect, useRef, useState } from "react"
import { whyUsContent } from "../../constants/whyUsContent"
import WhyUsSection from "../atoms/WhyUsSection"

const WhyUs = () => {
    const [isIntersecting, setIsIntersecting] = useState(false)

    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)
        })

        observer.observe(containerRef.current as Element)

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            className="w-full  flex flex-col text-typography-light dark:text-typography-dark items-center  bg-primary dark:bg-primary-dark/90 gap-16 py-12 m-0"
        >
            <h3 className="text-3xl font-bold relative after:content[''] after:w-full after:h-px after:bg-bg-dark dark:after:bg-bg-light after:absolute after:left-0 after:top-[120%]">
                Why choose Artiflare?
            </h3>
            <div className="flex gap-4 flex-wrap items-center justify-center py-8">
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
