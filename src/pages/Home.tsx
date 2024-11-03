import { useDispatch } from "react-redux"
import CallToAction from "../components/molecules/CallToAction"
import Information from "../components/molecules/Information"
import Pricing from "../components/molecules/Pricing"
import WhyUs from "../components/molecules/WhyUs"
import NavBar from "../components/organisms/NavBar"
import { AppDispatch } from "../redux/store"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firestore/firebaseConfig"
import { setUser, User as LoggedUser } from "../redux/slices/authSlice"

const Home = () => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const loggedUser: LoggedUser = {
          uid: user.uid,
          email: user.email,
          img: user.photoURL,
          displayName: user.displayName,
          teams: [],
          boards: [],
        }
        dispatch(setUser(loggedUser))
      } else {
        dispatch(setUser(null))
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <>
      <NavBar />
      <CallToAction />
      <Information />
      <WhyUs />
      <Pricing />
    </>
  )
}
export default Home
