import Button from "./Button"
import FallbackAvatar from "./FallbackAvatar"

interface TeamCardProps {
    name: string
    id: string | undefined
    onClick?: (id: string | undefined) => void
    cursor?: string
}

const TeamCard = ({
    cursor = "cursor-pointer",
    name,
    id,
    onClick
}: TeamCardProps) => {
    return (
        <Button
            type="button"
            onClick={() => onClick && onClick(id)}
            className={`${cursor} flex gap-2 items-center`}
        >
            <FallbackAvatar
                width="w-8"
                height="h-8"
                rounded="rounded-full"
                username={name}
            />
            <p>{name}</p>
        </Button>
    )
}
export default TeamCard
