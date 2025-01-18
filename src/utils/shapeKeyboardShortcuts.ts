import { AppDispatch } from "../redux/store"
import { updateSelectedShape } from "./updateSelectedShape"

export function shapeKeyboardShortcuts(
    dispatch: AppDispatch,
    selectedShapeRef: React.MutableRefObject<string | null>
) {
    const keyMap: Record<string, string> = {
        r: "rectangle",
        o: "circle",
        t: "triangle",
        s: "star",
        h: "rhombus",
        p: "pencil"
    }

    const keyCombinationsMap: Record<string, string> = {
        "shift+p": "pen"
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        console.log(`Key pressed: ${event.key}`)
        const keys = []
        if (event.shiftKey) keys.push("shift")
        if (event.ctrlKey) keys.push("ctrl")
        keys.push(event.key.toLowerCase())

        const keyCombination = keys.join("+")

        const shapeFromCombination = keyCombinationsMap[keyCombination]

        if (shapeFromCombination) {
            updateSelectedShape(
                shapeFromCombination,
                dispatch,
                selectedShapeRef
            )
        }

        const shapeFromKey = keyMap[event.key.toLowerCase()]

        if (shapeFromKey) {
            updateSelectedShape(shapeFromKey, dispatch, selectedShapeRef)
        }

        window.addEventListener("keydown", () => {
            console.log("Key pressed: ", event.key)
        })

        return () => {
            window.removeEventListener("keydown", () =>
                console.log("Key pressed: ", event.key)
            )
        }
    }
}
