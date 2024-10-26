import { Link } from "react-router-dom"

const CallToAction = () => {
  return (
    <section className="mt-[clamp(1rem,30vh,9rem)] flex gap-9 flex-col items-center">
      <h2 className="w-full max-w-[600px] text-center text-balance font-medium text-[clamp(1rem,20vw,1.6rem)]">
        Start collaborating creatively with your team in real-time
      </h2>
      <Link
        className="bg-secondary hover:opacity-55 transition-opacity duration-150 rounded-sm text-typography-light px-6 py-4"
        to={"/auth/signup"}>
        Get Started
      </Link>
    </section>
  )
}
export default CallToAction
