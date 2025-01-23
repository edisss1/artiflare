export const formatRelativeDate = (lastAccess: string): string => {
    const lastAccessDate = new Date(lastAccess)
    if (isNaN(lastAccessDate.getTime())) return "Never"

    const now = new Date()

    const diffTime = now.getTime() - lastAccessDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
        return "Today"
    } else if (diffDays === 1) {
        return "Yesterday"
    } else if (diffDays < 7) {
        return `${diffDays} days ago`
    } else {
        return new Intl.DateTimeFormat("en-GB", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
            timeZone: "Europe/Amsterdam" // Specify the desired time zone
        }).format(lastAccessDate)
    }
}
