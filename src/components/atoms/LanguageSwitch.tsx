import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { languages } from "../../constants/languages"
import { setLanguage } from "../../redux/slices/languageSlice"
import { useSelector } from "react-redux"
import i18n from "../../utils/i18n"
import { useNavigate } from "react-router-dom"

const LanguageSwitch = () => {
    const dispatch: AppDispatch = useDispatch()
    const { currentLanguage } = useSelector(
        (state: RootState) => state.language
    )
    const navigate = useNavigate()

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLanguage(e.target.value))
        i18n.changeLanguage(e.target.value)
        navigate(0)
    }

    return (
        <select
            className="bg-transparent border-2 border-typography-light dark:border-typography-dark rounded-md px-4 py-1 text-typography-light dark:text-typography-dark"
            value={currentLanguage}
            onChange={(e) => handleLanguageChange(e)}
        >
            {languages.map((language) => (
                <option
                    className="text-typography-light"
                    key={language.code}
                    value={language.code}
                >
                    {language.name}
                </option>
            ))}
        </select>
    )
}
export default LanguageSwitch
