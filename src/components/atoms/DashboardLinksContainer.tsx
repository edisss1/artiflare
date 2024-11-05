import { Link } from "react-router-dom"
import home from "../../assets/Home.svg"

const DashboardLinksContainer = () => {
  return (
    <section className="text-typography-light">
      <Link className="flex items-center gap-2" to={"/app/dashboard"}>
        <img src={home} alt="" />
        <p>Home</p>
      </Link>
      {/* <Link></Link>
      <Link></Link> */}
    </section>
  )
}
export default DashboardLinksContainer
