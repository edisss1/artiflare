import Button from "./Button"
import FallbackAvatar from "./FallbackAvatar"
import { useSelector } from "react-redux"
import {
    addNewUserToTeam,
    clearTeams
} from "../../redux/slices/teamManagementSlice"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"

interface TeamCardProps {
    name: string
    id: string | undefined
}

const TeamCard = ({ name, id }: TeamCardProps) => {
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch()

    const handleJoin = () => {
        if (!user?.teams.some((team) => team.teamID === id)) {
            addNewUserToTeam(id, user?.uid)

            dispatch(clearTeams())
        }
    }

    return (
        <Button onClick={handleJoin} className="flex gap-2 items-center">
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
