import { Link } from "react-router-dom"
import HomeIcon from "../icons/HomeIcon"
import RecentIcon from "../icons/RecentIcon"
import FavoritesIcon from "../icons/FavoritesIcon"
import { useTranslation } from "react-i18next"

const DashboardLinksContainer = () => {
    const { t } = useTranslation()
    return (
        <section className="flex flex-col gap-2">
            <Link className="flex items-center gap-2" to={"/app/dashboard"}>
                <HomeIcon />
                <p>{t("home")}</p>
            </Link>
            <Link className="flex items-center gap-2" to={"/app/recent"}>
                <RecentIcon />
                <p>{t("recent")}</p>
            </Link>
            <Link className="flex items-center gap-2" to={"/app/favorites"}>
                <FavoritesIcon />
                <p>{t("favorites")}</p>
            </Link>
        </section>
    )
}
export default DashboardLinksContainer
