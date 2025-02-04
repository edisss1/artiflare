interface UserCardProps {
    name: string | null
    img: string | null
}

const UserCard = ({ name, img }: UserCardProps) => {
    return (
        <div className="flex gap-2 max-w-[140px] items-center justify-start px-1 py-1 border-2 border-typography-light dark:border-typography-dark  rounded-md">
            <img className="w-8 h-8 rounded-full" src={img!} />
            <p>{name}</p>
        </div>
    )
}
export default UserCard
