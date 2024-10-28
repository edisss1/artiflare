import { Link } from "react-router-dom"

const DashboardLinksContainer = () => {
  return (
    <section className="text-typography-light">
      <Link to={"/app/dashboard"}>Home</Link>
      {/* <Link></Link>
      <Link></Link> */}
    </section>
  )
}
export default DashboardLinksContainer
