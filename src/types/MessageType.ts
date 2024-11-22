export interface Message {
    id: string
    senderID: string
    senderName: string
    receiverID: string
    receiverName: string
    messageText: string
    timestamp: Date
}
