import { Link } from "react-router-dom"
import HomeIcon from "../icons/HomeIcon"
import RecentIcon from "../icons/RecentIcon"
import FavoritesIcon from "../icons/FavoritesIcon"

const DashboardLinksContainer = () => {
    return (
        <section className="flex flex-col gap-2">
            <Link className="flex items-center gap-2" to={"/app/dashboard"}>
                <HomeIcon />
                <p>Home</p>
            </Link>
            <Link className="flex items-center gap-2" to={"/app/recent"}>
                <RecentIcon />
                <p>Recent</p>
            </Link>
            <Link className="flex items-center gap-2" to={"/app/favorites"}>
                <FavoritesIcon />
                <p>Favorites</p>
            </Link>
        </section>
    )
}
export default DashboardLinksContainer
