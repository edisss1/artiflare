export interface NotificationType {
	senderID: string
	senderName: string
	receiverID: string
	receiverName: string
	notificationText: string
	isRead?: boolean
	actionUrl?: string
	timestamp: Date
}