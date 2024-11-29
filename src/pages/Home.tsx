import { useDispatch, useSelector } from "react-redux"
import CallToAction from "../components/molecules/CallToAction"
import Information from "../components/molecules/Information"
import Pricing from "../components/molecules/Pricing"
import WhyUs from "../components/molecules/WhyUs"
import NavBar from "../components/organisms/NavBar"
import { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firestore/firebaseConfig"
import { User as LoggedUser } from "../types/User.ts"
import { Navigate } from "react-router-dom"
import { setUser } from "../redux/slices/authSlice.ts"
import Footer from "../components/organisms/Footer.tsx"
import Loading from "../components/atoms/Loading.tsx"
import { doc, getDoc } from "firebase/firestore"

const Home = () => {
    // const dispatch: AppDispatch = useDispatch()
    // const { user, status } = useSelector((state: RootState) => state.auth)

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    //         if (firebaseUser && user) {
    //             const userDocRef = doc(db, "users", firebaseUser.uid)
    //             const userDoc = await getDoc(userDocRef)
    //             const userData = userDoc.data()

    //             const loggedUser: LoggedUser = {
    //                 uid: firebaseUser.uid,
    //                 email: firebaseUser.email,
    //                 img: firebaseUser.photoURL,
    //                 displayName: firebaseUser.displayName,
    //                 teams: userData?.teams || [],
    //                 boards: userData?.boards || [],
    //                 currentSelectedTeam: userData?.currentSelectedTeam
    //             }
    //             dispatch(setUser(loggedUser))
    //         } else {
    //             dispatch(setUser(null))
    //         }
    //     })

    //     return () => unsubscribe()
    // }, [dispatch])

    // if (status === "loading") {
    //     return <Loading />
    // }

    // if (user) {
    //     return <Navigate to={"/app/dashboard"} />
    // }

    return (
        <>
            <NavBar />
            <CallToAction />
            <Information />
            <WhyUs />
            <Pricing />
            <Footer />
        </>
    )
}

export default Home
