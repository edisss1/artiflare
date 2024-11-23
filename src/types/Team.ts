export interface Team {
    name: string
    members: string[]
    creatorID: string
    creatorName: string | null
    teamType: "private" | "invite-only" | "public" | ""
}
