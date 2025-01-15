import { Team } from "./Team"

export interface NotificationType {
    id: string
    senderID: string
    senderName: string | null
    receiversID: string[]
    receiversName: (string | null)[]
    notificationText: string
    isRead: boolean
    actionUrl?: string
    timestamp: string
    type: "invitation" | "message"
    team: Team
}
