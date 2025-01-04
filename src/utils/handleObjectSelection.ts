import {
    setColor,
    setDiameter,
    setHeight,
    setWidth
} from "../redux/slices/shapeManagementSlice.ts"
import { Canvas } from "fabric"
import { AppDispatch } from "../redux/store.ts"

export const handleObjectSelection = (
    object: any,
    setSettingsPosition: (
        value: React.SetStateAction<{ top: number; left: number }>
    ) => void,
    canvas: Canvas | null,
    setSelectedObject: React.Dispatch<
        React.SetStateAction<{
            obj: any
            name: string | null
        }>
    >,
    dispatch: AppDispatch
) => {
    if (!object || !canvas) return

    const boundingRect = object.getBoundingRect()
    const transform = canvas.viewportTransform
    const zoom = canvas.getZoom()

    setSettingsPosition({
        top: (boundingRect.top + transform[5]) / zoom,
        left: (boundingRect.left + transform[4]) / zoom
    })

    setSelectedObject({ obj: object, name: object.name })
    console.log("Object type: ", object.type)
    console.log("Object name: ", object.name)

    switch (object.type) {
        case "rect":
        case "triangle":
        case "polygon":
            dispatch(setWidth(Math.round(object.width * object.scaleX)))
            dispatch(setHeight(Math.round(object.height * object.scaleY)))
            dispatch(setColor(object.fill))
            dispatch(setDiameter(""))
            break
        case "circle":
            dispatch(setDiameter(Math.round(object.radius * 2 * object.scaleX)))
            dispatch(setColor(object.fill))
            dispatch(setWidth(""))
            dispatch(setHeight(""))
            break
    }
}
