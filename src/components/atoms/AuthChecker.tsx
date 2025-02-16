import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../../firestore/firebaseConfig"
import { User as LoggedUser, User } from "../../types/User"
import { setUser } from "../../redux/slices/authSlice"
import { AppDispatch, RootState } from "../../redux/store"
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore"
import Loading from "./Loading"
import { useLocation, useNavigate } from "react-router-dom"
import { Team } from "../../types/Team"

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const dispatch: AppDispatch = useDispatch()
    const { user, status } = useSelector((state: RootState) => state.auth)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const userDocRef = doc(db, "users", firebaseUser.uid)

                const unsubscribeUser = onSnapshot(
                    userDocRef,
                    (docSnapshot) => {
                        if (!docSnapshot.exists()) {
                            console.error("User document does not exist!")
                            return
                        }
                        const userData = docSnapshot.data() as User

                        if (
                            firebaseUser.emailVerified &&
                            !userData.emailVerified
                        ) {
                            updateDoc(userDocRef, {
                                emailVerified: true
                            }).catch((err) =>
                                console.error(
                                    "Error updating emailVerified:",
                                    err
                                )
                            )
                        }

                        const lastAccess = userData.lastAccessAt
                            ? new Date(userData.lastAccessAt).getTime()
                            : 0
                        const now = Date.now()
                        if (now - lastAccess > 60000) {
                            if (userData.currentSelectedTeam) {
                                const currentTeamDocRef = doc(
                                    db,
                                    "teams",
                                    userData.currentSelectedTeam
                                )
                                getDoc(currentTeamDocRef)
                                    .then((currentTeamSnap) => {
                                        if (currentTeamSnap.exists()) {
                                            const currentTeamData =
                                                currentTeamSnap.data() as Team
                                            const updatedTeamMembers =
                                                currentTeamData.members.map(
                                                    (member) =>
                                                        member.uid ===
                                                        firebaseUser.uid
                                                            ? {
                                                                  ...member,
                                                                  lastAccessAt:
                                                                      new Date().toISOString()
                                                              }
                                                            : member
                                                )
                                            updateDoc(currentTeamDocRef, {
                                                members: updatedTeamMembers
                                            }).catch((err) =>
                                                console.error(
                                                    "Error updating team members:",
                                                    err
                                                )
                                            )
                                        }
                                    })
                                    .catch((err) =>
                                        console.error(
                                            "Error fetching team document:",
                                            err
                                        )
                                    )
                            }

                            updateDoc(userDocRef, {
                                lastAccessAt: new Date().toISOString()
                            }).catch((err) =>
                                console.error(
                                    "Error updating lastAccessAt:",
                                    err
                                )
                            )
                        }

                        const loggedUser: LoggedUser = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            img: firebaseUser.photoURL,
                            displayName: userData.displayName,
                            teams: userData.teams || [],
                            boards: userData.boards || [],
                            currentSelectedTeam: userData.currentSelectedTeam,
                            lastAccessAt: userData.lastAccessAt,
                            emailVerified: userData.emailVerified,
                            plan: userData.plan
                        }

                        dispatch(setUser(loggedUser))
                    }
                )

                return () => {
                    unsubscribeUser && unsubscribeUser()
                }
            } else {
                dispatch(setUser(null))
            }
        })

        return () => {
            unsubscribeAuth()
        }
    }, [dispatch])

    useEffect(() => {
        if (status === "authenticated" && user) {
            if (
                !user.emailVerified &&
                location.pathname.startsWith("/app") &&
                location.pathname !== "/auth/email-verification"
            ) {
                navigate("/auth/email-verification", { replace: true })
            } else if (
                user.emailVerified &&
                location.pathname === "/auth/email-verification"
            ) {
                navigate("/app/dashboard", { replace: true })
            } else if (
                location.pathname === "/auth/signup" ||
                location.pathname === "/auth/login" ||
                location.pathname === "/"
            ) {
                navigate("/app/dashboard", { replace: true })
            }
        } else if (status === "unauthenticated") {
            if (location.pathname.startsWith("/app")) {
                navigate("/auth/signup", { replace: true })
            }
        }
    }, [status, user, location.pathname, navigate])

    if (status === "loading") {
        return <Loading />
    }

    return <>{children}</>
}

export default AuthChecker
