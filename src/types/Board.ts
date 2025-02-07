import { TeamMember } from "./Team"

export interface Board {
    id?: string
    boardTitle: string
    teamID: string
    userUID: string
    createdAt: string
    updatedAt: string
    createdBy: string | null
    modifiedBy: string | null
    elements: any[]
    members: TeamMember[]
    isFavorite: boolean
    memberUIDs: string[]
}
