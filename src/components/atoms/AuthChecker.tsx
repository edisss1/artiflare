import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../../firestore/firebaseConfig"
import { User as LoggedUser } from "../../types/User"
import { setUser } from "../../redux/slices/authSlice"
import { RootState } from "../../redux/store"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import Loading from "./Loading"
import { useLocation, useNavigate } from "react-router-dom"

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()
    const { user, status } = useSelector((state: RootState) => state.auth)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDocRef = doc(db, "users", firebaseUser.uid)
                const userDoc = await getDoc(userDocRef)
                const userData = userDoc.data()

                const loggedUser: LoggedUser = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    img: firebaseUser.photoURL,
                    displayName: firebaseUser.displayName,
                    teams: userData?.teams || [],
                    boards: userData?.boards || [],
                    currentSelectedTeam: userData?.currentSelectedTeam,
                    lastAccessAt: userData?.lastAccessAt
                }

                await updateDoc(userDocRef, {
                    lastAccessAt: new Date().toDateString()
                })

                dispatch(setUser(loggedUser))
                console.log(loggedUser)
            } else {
                dispatch(setUser(null))
            }
        })

        return () => unsubscribe()
    }, [dispatch])

    useEffect(() => {
        if (status === "authenticated" && user) {
            if (
                location.pathname === "/auth/signup" ||
                location.pathname === "/auth/login" ||
                location.pathname === "/"
            ) {
                navigate("/app/dashboard", { replace: true })
            }
        } else if (status === "unauthenticated") {
            if (!location.pathname.startsWith("/")) {
                navigate("/", { replace: true })
            }
        }
    }, [status, user, location.pathname, navigate])

    if (status === "loading") {
        return <Loading />
    }

    return <>{children}</>
}

export default AuthChecker
