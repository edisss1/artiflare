import { Outlet, useLocation } from "react-router-dom"

const Auth = () => {
  const location = useLocation()
  console.log(location)

  return <Outlet />
}
export default Auth
