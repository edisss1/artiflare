import { Link } from "react-router-dom"
import home from "../../assets/Home.svg"
import recent from "../../assets/recent.svg"
import favorites from "../../assets/favorites.svg"

const DashboardLinksContainer = () => {
  return (
    <section className="text-typography-light flex flex-col gap-2">
      <Link className="flex items-center gap-2" to={"/app/dashboard"}>
        <img src={home} alt="" />
        <p>Home</p>
      </Link>
      <Link className="flex items-center gap-2" to={"/app/recent"}>
        <img src={recent} alt="" />
        <p>Recent</p>
      </Link>
      <Link className="flex items-center gap-2" to={"/app/favorites"}>
        <img src={favorites} alt="" />
        <p>Favorites</p>
      </Link>
    </section>
  )
}
export default DashboardLinksContainer
