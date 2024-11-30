export interface TeamMember {
    role: "owner" | "admin" | "member"
    uid: string
    displayName: string | null
    img: string | null
    email: string | null
    lastAccessAt?: string
}

export interface Team {
    id?: string
    name: string
    members: TeamMember[]
    creatorID: string
    creatorName: string | null
    teamType: "private" | "invite-only" | "public" | ""
    logo: string
}
