import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { resources } from "../localization/resources"

i18n.use(initReactI18next).init({
    resources,

    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    lng: "en"
})

export default i18n
