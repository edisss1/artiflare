import { Link } from "react-router-dom"
import Typewriter from "../atoms/Typewriter"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

const CallToAction = () => {
    const { t } = useTranslation()
    const { currentLanguage } = useSelector(
        (state: RootState) => state.language
    )

    const gradientStyles =
        "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent bg-clip-text"
    return (
        <section className="mt-[clamp(1rem,30vh,5rem)] px-[5%]  max-lg:items-center grid grid-cols-8 max-md:grid-cols-2 ">
            <div
                className={
                    "max-w-[800px] max-md:max-w-[415px]  flex gap-[clamp(1rem,10vw,2.25rem)] flex-col lg:col-start-3 lg:col-span-2 max-md:col-start-1 max-lg:col-start-2 max-lg:col-span-6 w-full max-md:px-2"
                }
            >
                <Typewriter
                    text={t("callToAction")}
                    delay={20}
                    styles={[
                        {
                            range:
                                currentLanguage === "en" ? [19, 29] : [29, 37],
                            className: gradientStyles
                        }
                    ]}
                />
                <Link
                    className="bg-secondary w-fit hover:shadow-xl hover:shadow-secondary/50  transition-all duration-150 rounded-md text-typography-light px-6 py-4"
                    to={"/auth/signup"}
                >
                    {t("getStarted")}
                </Link>
            </div>
        </section>
    )
}
export default CallToAction
