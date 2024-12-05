import { Link } from "react-router-dom"

const CallToAction = () => {
    return (
        <section className="mt-[clamp(1rem,30vh,5rem)]  max-lg:items-center grid grid-cols-8 max-md:grid-cols-2 ">
            <div
                className={
                    "max-w-[800px] flex gap-[clamp(1rem,10vw,2.25rem)] flex-col col-start-3 col-span-2 max-md:col-start-1 w-full max-md:px-2"
                }
            >
                <h2 className="w-full max-w-[700px]  text-[clamp(1rem,6vw,1.6rem)] ">
                    Start collaborating
                    <span
                        className={
                            " mx-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent bg-clip-text"
                        }
                    >
                        creatively
                    </span>
                    with your team in real time
                </h2>
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
