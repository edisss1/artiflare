import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firestore/firebaseConfig"
import { User as LoggedUser } from "../../types/User"
import { setUser } from "../../redux/slices/authSlice"

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const loggedUser: LoggedUser = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    img: firebaseUser.photoURL,
                    displayName: firebaseUser.displayName,
                    teams: [],
                    boards: []
                }
                dispatch(setUser(loggedUser))
            } else {
                dispatch(setUser(null))
            }
        })

        return () => unsubscribe()
    }, [dispatch])

    return <>{children}</>
}

export default AuthChecker
