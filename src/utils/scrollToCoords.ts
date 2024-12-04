export function scrollToCoords(x: number, y: number) {
    window.scrollTo({ left: x, top: y, behavior: "smooth" })
    // window.scrollTo(x, y)
}
