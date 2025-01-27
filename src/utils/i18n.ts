import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { resources } from "../localization/resources"

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"]
    }
})

export default i18n
