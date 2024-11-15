import { useDispatch, useSelector } from "react-redux";
import CallToAction from "../components/molecules/CallToAction";
import Information from "../components/molecules/Information";
import Pricing from "../components/molecules/Pricing";
import WhyUs from "../components/molecules/WhyUs";
import NavBar from "../components/organisms/NavBar";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firestore/firebaseConfig";
import { User as LoggedUser } from "../types/User.ts";
import { Navigate } from "react-router-dom";
import { setUser } from "../redux/slices/authSlice.ts";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

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
        };
        console.log(loggedUser);
        dispatch(setUser(loggedUser));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (user) {
    return <Navigate to={"/app/dashboard"} />;
  }

  return (
    <>
      <NavBar />
      <CallToAction />
      <Information />
      <WhyUs />
      <Pricing />
    </>
  );
};
export default Home;
