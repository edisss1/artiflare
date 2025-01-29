import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../../firestore/firebaseConfig"
import { User as LoggedUser, User } from "../../types/User"
import { setUser } from "../../redux/slices/authSlice"
import { AppDispatch, RootState } from "../../redux/store"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import Loading from "./Loading"
import { useLocation, useNavigate } from "react-router-dom"
import { Team } from "../../types/Team"

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const dispatch: AppDispatch = useDispatch()
    const { user, status } = useSelector((state: RootState) => state.auth)
    const { currentTeam } = useSelector(
        (state: RootState) => state.teamManagement
    )

    const location = useLocation()
    const navigate = useNavigate()
    // const { boardID } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userDocRef = doc(db, "users", firebaseUser.uid)
                    const userDoc = await getDoc(userDocRef)
                    const userData = userDoc.data() as User
                    // const isMemberOfBoard = userData?.boards.some(
                    //     (board) => board.id === boardID
                    // )

                    const isEmailVerifiedInFirestore = userData?.emailVerified
                    const isEmailVerifiedInAuth = firebaseUser.emailVerified

                    if (isEmailVerifiedInAuth && !isEmailVerifiedInFirestore) {
                        // Update emailVerified in Firestore if needed
                        await updateDoc(userDocRef, {
                            emailVerified: true
                        })
                    }

                    const currentTeamDocRef = doc(
                        db,
                        "teams",
                        userData?.currentSelectedTeam
                    )

                    const loggedUser: LoggedUser = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        img: firebaseUser.photoURL,
                        displayName: firebaseUser.displayName,
                        teams: userData?.teams || [],
                        boards: userData?.boards || [],
                        currentSelectedTeam: userData?.currentSelectedTeam,
                        lastAccessAt: userData?.lastAccessAt,
                        emailVerified: firebaseUser.emailVerified
                    }

                    console.log(
                        `Current selected team in auth checker: ${loggedUser.currentSelectedTeam}`
                    )
                    console.log(
                        `Current team object's id in auth checker: ${currentTeam?.id}`
                    )

                    const currentTeamSnap = await getDoc(currentTeamDocRef)
                    if (currentTeamSnap.exists()) {
                        const currentTeamData = currentTeamSnap.data() as Team
                        const updatedTeamMembers = currentTeamData.members.map(
                            (member) =>
                                member.uid === loggedUser.uid
                                    ? {
                                          ...member,
                                          lastAccessAt: new Date().toISOString()
                                      }
                                    : member
                        )

                        await updateDoc(currentTeamDocRef, {
                            members: updatedTeamMembers
                        })
                    }

                    await updateDoc(userDocRef, {
                        lastAccessAt: new Date().toISOString()
                    })

                    console.log(
                        `User's selected team: ${loggedUser.currentSelectedTeam}`
                    )

                    dispatch(setUser(loggedUser))
                } catch (error) {
                    console.error("Error during authentication check:", error)
                }
            } else {
                dispatch(setUser(null))
            }
        })

        return () => unsubscribe()
    }, [dispatch, user?.uid])

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
            if (
                !location.pathname.startsWith("/") ||
                location.pathname.startsWith("/app")
            ) {
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
