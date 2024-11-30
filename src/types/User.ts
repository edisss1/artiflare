export interface User {
    uid: string
    img: string | null
    displayName: string | null
    email: string | null
    teams: { teamID: string; role: "admin" | "member" | "owner" }[]
    boards: string[]
    currentSelectedTeam: string
    lastAccessAt?: string
}
