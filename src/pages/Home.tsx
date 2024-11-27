import CallToAction from "../components/molecules/CallToAction"
import Information from "../components/molecules/Information"
import Pricing from "../components/molecules/Pricing"
import WhyUs from "../components/molecules/WhyUs"
import NavBar from "../components/organisms/NavBar"
import Footer from "../components/organisms/Footer.tsx"

const Home = () => {
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
