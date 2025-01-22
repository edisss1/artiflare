import { useSelector } from "react-redux"
import H2 from "../components/atoms/H2"
import { RootState } from "../redux/store"
import Button from "../components/atoms/Button"
import { useNavigate } from "react-router-dom"
import { auth } from "../firestore/firebaseConfig"
import { useEffect, useState } from "react"

const EmailVerification = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const [isVerified, setIsVerified] = useState(user?.emailVerified || false)

    const checkEmailVerified = async () => {
        try {
            await auth.currentUser?.reload()
            const updatedUser = auth.currentUser
            setIsVerified(updatedUser?.emailVerified || false)
        } catch (error) {
            console.error("Error checking email verification:", error)
        }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            if (!isVerified) {
                await checkEmailVerified()
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [isVerified])

    return (
        <div className="w-screen h-screen flex flex-col gap-6 items-center justify-center">
            <H2>Artiflare</H2>
            <div className="grid place-items-center gap-4">
                <h3 className="text-xl font-medium">
                    Verify your email address
                </h3>
                <p>
                    We’ve sent you a link — just click on it to confirm you’re
                    not a bot!
                </p>
                <Button
                    onClick={() => navigate("/app/dashboard")}
                    disabled={!isVerified}
                    className=" bg-secondary w-full max-w-[200px] py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed "
                >
                    Proceed
                </Button>
                {!isVerified && (
                    <>
                        <p className="text-sm text-typography-light/60 dark:text-typography-dark/60">
                            If you’ve verified your email, click the button
                            after a few moments.
                        </p>
                        <p className="text-sm text-typography-light/60 dark:text-typography-dark/60">
                            If this doesn't work, please try refreshing the page
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
export default EmailVerification
