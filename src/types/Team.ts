export interface TeamMember {
    role: "owner" | "admin" | "member"
    uid: string
    displayName: string | null
}

export interface Team {
    name: string
    members: TeamMember[]
    creatorID: string
    creatorName: string | null
    teamType: "private" | "invite-only" | "public" | ""
}
