import { useEffect, useState } from "react"
import { getRandomColor } from "../../utils/getRandomColor"

interface FallbackAvatar {
    username: string
    width?: string
    height?: string
    rounded?: string
}
const FallbackAvatar = ({
    username,
    width,
    height,
    rounded
}: FallbackAvatar) => {
    const [background, setBackground] = useState(
        localStorage.getItem("fallback-avatar-background")
    )

    useEffect(() => {
        if (!background) {
            const color = getRandomColor()
            localStorage.setItem("fallback-avatar-background", color)
            setBackground(color)
        }
    }, [])

    return (
        <div
            style={{ backgroundColor: background ?? "rebeccapurple" }}
            className={`${width} ${height} ${rounded}   aspect-square flex items-center justify-center  `}
        >
            <p>{username[0].toUpperCase()}</p>
        </div>
    )
}
export default FallbackAvatar
