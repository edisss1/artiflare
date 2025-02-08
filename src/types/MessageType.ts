export interface Message {
    id?: string
    senderID: string
    senderName: string | null
    messageText: string
    timestamp: string
    roomID: string
}
