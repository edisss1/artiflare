import HidePassword from "../icons/HidePassword"
import ShowPassword from "../icons/ShowPassword"
import Button from "./Button"

interface RevealPasswordProps {
    inputType: "password" | "text"
    setInputType: React.Dispatch<React.SetStateAction<"password" | "text">>
}

const RevealPassword = ({ inputType, setInputType }: RevealPasswordProps) => {
    return (
        <>
            {inputType === "password" ? (
                <Button
                    type="button"
                    onClick={() => setInputType("text")}
                    className="absolute right-4 top-[50%] -translate-y-[50%] hover:bg-gray-300 p-2 rounded-full transition-colors duration-150"
                >
                    <ShowPassword />
                </Button>
            ) : (
                <Button
                    type="button"
                    onClick={() => setInputType("password")}
                    className="absolute right-4 top-[50%] -translate-y-[50%] hover:bg-gray-300 p-2 rounded-full transition-colors duration-150"
                >
                    <HidePassword />
                </Button>
            )}
        </>
    )
}
export default RevealPassword
