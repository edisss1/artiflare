export const getRandomColor = () => {
    const hex = "0123456789ABCDEF"
    let color = "#"

    do {
        color = "#"

        for (let i = 0; i < 6; i++) {
            color += hex[Math.floor(Math.random() * 16)]
        }
    } while (getBrightness(color) < 128)

    return color
}

const getBrightness = (color: string) => {
    const r = parseInt(color.substring(1, 3), 16)
    const g = parseInt(color.substring(3, 5), 16)
    const b = parseInt(color.substring(5, 7), 16)

    return (r * 299 + g * 587 + b * 114) / 1000
}
