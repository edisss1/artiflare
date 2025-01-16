export function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase()

    if (/mobile|android|touch|webos|iphone|ipad/i.test(userAgent)) {
        return "mobile"
    } else {
        return "desktop"
    }
}
