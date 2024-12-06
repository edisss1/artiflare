import { Link } from "react-router-dom"
import Typewriter from "../atoms/Typewriter"

const CallToAction = () => {
    const gradientStyles =
        "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent bg-clip-text"
    return (
        <section className="mt-[clamp(1rem,30vh,5rem)]  max-lg:items-center grid grid-cols-8 max-md:grid-cols-2 ">
            <div
                className={
                    "max-w-[800px] flex gap-[clamp(1rem,10vw,2.25rem)] flex-col col-start-3 col-span-2 max-md:col-start-1 w-full max-md:px-2"
                }
            >
                <Typewriter
                    text="Start collaborating creatively with your team in real time"
                    delay={20}
                    styles={[{ range: [19, 29], className: gradientStyles }]}
                />
                <Link
                    className="bg-secondary w-fit hover:shadow-xl hover:shadow-secondary/50  transition-all duration-150 rounded-md text-typography-light px-6 py-4"
                    to={"/auth/signup"}
                >
                    Get Started
                </Link>
            </div>
        </section>
    )
}
export default CallToAction
