import CloseIcon from "../icons/CloseIcon"
import Button from "./Button"

interface UserCardProps {
    name: string | null
    img: string | null
    onClick: () => void
}

const UserCard = ({ name, img, onClick }: UserCardProps) => {
    return (
        <div className="grid grid-cols-4 gap-2 max-w-[150px] items-center justify-start px-1 py-1 border-2 border-typography-light dark:border-typography-dark  rounded-md">
            <img
                className="w-full max-w-8 aspect-square rounded-full col-span-1"
                src={img!}
            />
            <p className="col-span-2 col-start-2 max-w-[80px] truncate text-xs">
                {name}
            </p>
            <Button type="button" onClick={onClick} className="col-start-4  ">
                <CloseIcon className="w-4 h-4" />
            </Button>
        </div>
    )
}
export default UserCard
