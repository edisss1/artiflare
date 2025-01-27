import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { languages } from "../../constants/languages"
import { setLanguage } from "../../redux/slices/languageSlice"
import { useSelector } from "react-redux"
import i18n from "../../utils/i18n"

const LanguageSwitch = () => {
    const dispatch: AppDispatch = useDispatch()
    const { currentLanguage } = useSelector(
        (state: RootState) => state.language
    )

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLanguage(e.target.value))
        i18n.changeLanguage(e.target.value)
        window.location.reload()
    }

    return (
        <select
            value={currentLanguage}
            onChange={(e) => handleLanguageChange(e)}
        >
            {languages.map((language) => (
                <option key={language.code} value={language.code}>
                    {language.name}
                </option>
            ))}
        </select>
    )
}
export default LanguageSwitch
