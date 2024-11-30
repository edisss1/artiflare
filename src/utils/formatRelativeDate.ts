import { Timestamp } from "firebase/firestore"

export const formatRelativeDate = (
    lastAccess: Timestamp | undefined
): string => {
    if (typeof lastAccess === "undefined") return "Never"

    const lastAccessDate = lastAccess.toDate()
    const now = new Date()

    if (isNaN(lastAccessDate.getTime())) {
        return "Invalid date"
    }

    const lastAccessLocalDate = new Date(lastAccessDate.toLocaleDateString())
    const nowLocalDate = new Date(now.toLocaleDateString())

    const diffTime = nowLocalDate.getTime() - lastAccessLocalDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)

    if (diffDays === 0) {
        return "Today"
    } else if (diffDays === 1) {
        return "Yesterday"
    } else if (diffDays < 7) {
        return `${Math.floor(diffDays)} days ago`
    } else {
        return new Intl.DateTimeFormat("it-IT", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false
        }).format(lastAccessDate)
    }
}
