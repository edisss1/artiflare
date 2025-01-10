export const formatRelativeDate = (
    lastAccess: string | Date | undefined
): string => {
    const lastAccessDate =
        typeof lastAccess === "string" ? new Date(lastAccess) : lastAccess
    const now = new Date()

    if (!lastAccessDate) return "Never"

    // Get local date representations without time
    const lastAccessLocalDate = new Date(lastAccessDate)
    const nowLocalDate = new Date(now.toLocaleDateString())

    // Calculate difference in days
    const diffTime = nowLocalDate.getTime() - lastAccessLocalDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)

    if (diffDays === 0) {
        return "Today"
    } else if (diffDays === 1) {
        return "Yesterday"
    } else if (diffDays < 7) {
        return `${Math.floor(diffDays)} days ago`
    } else {
        return new Intl.DateTimeFormat("en-UK", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true
        }).format(lastAccessDate)
    }
}
