import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import LanguageSwitch from "../atoms/LanguageSwitch"

const Footer = () => {
    const { t } = useTranslation()

    return (
        <footer
            className={
                "grid grid-rows-1 p-[clamp(0rem,5vw,4rem)] grid-flow-row  bg-primary dark:bg-primary-dark mt-[clamp(4rem,40vh,16rem)] text-typography-light dark:text-typography-dark"
            }
        >
            <div className={"grid grid-cols-4 max-md:grid-rows-2 mb-8  "}>
                <div
                    className={
                        "flex md:flex-col max-md:items-center max-md:col-start-1  max-md:mb-8 gap-9 col-start-1"
                    }
                >
                    <h3 className={"font-medium text-xl max-md:text-center "}>
                        Artiflare
                    </h3>
                    <div className={"grid gap-2"}>
                        <p>artiflare@gmail.com</p>
                        <p>+7(913) 731-3243</p>
                    </div>
                </div>
                <div
                    className={
                        "col-start-3 grid grid-cols-2 max-md:row-start-2 max-md:col-start-1 w-max"
                    }
                >
                    <div className={""}>
                        <h4 className={"font-medium text-xl mb-2"}>
                            {t("company")}
                        </h4>
                        <div className={"grid gap-2"}>
                            <p>{t("pricingHeader")}</p>
                        </div>
                    </div>
                    <div className={"col-start-2"}>
                        <h4 className={"font-medium text-xl mb-2"}>
                            {t("legal")}
                        </h4>
                        <div className={"grid gap-2"}>
                            <Link to={"/terms"}>{t("termsOfService")}</Link>
                            <Link to={"/privacy"}>{t("privacyPolicy")}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row-start-3 flex flex-col w-fit gap-2"}>
                <p>{new Date().getFullYear()} Artiflare</p>
                <LanguageSwitch />
            </div>
        </footer>
    )
}
export default Footer
