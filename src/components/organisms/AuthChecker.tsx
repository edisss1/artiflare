import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../../firestore/firebaseConfig"
import { User as LoggedUser } from "../../types/User"
import { setUser } from "../../redux/slices/authSlice"
import { RootState } from "../../redux/store"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import Loading from "../atoms/Loading"

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()
    const { user, status } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("AuthChecker: Initializing auth state check.")
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                console.log(
                    "AuthChecker: User detected. (firebaseUser)",
                    firebaseUser
                )
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
                    currentSelectedTeam: userData?.currentSelectedTeam || ""
                }
                dispatch(setUser(loggedUser))
                console.log(loggedUser)
            } else {
                console.log("AuthChecker: No user detected.")
                dispatch(setUser(null))
            }
        })

        return () => unsubscribe()
    }, [dispatch])

    console.log("AuthChecker: Loading state is", status)
    console.log("AuthChecker: User state is", user)

    if (status === "loading") {
        return <Loading />
    }

    if (user) {
        navigate("/app/dashboard")
    }

    return <>{children}</>
}

export default AuthChecker
