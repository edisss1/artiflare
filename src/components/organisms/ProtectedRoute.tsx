import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = useSelector((state: RootState) => state.auth.user)

    if (!user) {
        return <Navigate to="/auth/signup" replace />
    }

    return children
}
export default ProtectedRoute
