import { Canvas } from "fabric"
import React, { useEffect, useState } from "react"
import {
    setWidth,
    setHeight,
    setColor,
    setDiameter,
    setStroke,
    setAngle
} from "../../redux/slices/shapeManagementSlice"
import { handleObjectSelection } from "../../utils/handleObjectSelection.ts"
import { AppDispatch } from "../../redux/store.ts"
import { clearSettings } from "../../utils/clearSettings.ts"
import RectParameters from "../molecules/RectParameters.tsx"
import CircleParameters from "../molecules/CircleParameters.tsx"
import LineParameters from "../molecules/LineParameters.tsx"

interface SettingProps {
    canvas: Canvas | null
    dispatch: AppDispatch
    width: string | number
    height: string | number
    diameter: string | number
    fill: string
    stroke: string
    angle: number
}

const ShapeParameters = ({
    canvas,
    dispatch,
    width,
    height,
    fill,
    diameter,
    stroke,
    angle
}: SettingProps) => {
    const [selectedObject, setSelectedObject] = useState<{
        obj: any
        name: string | null
    }>({ obj: null, name: null })
    const [settingsPosition, setSettingsPosition] = useState({
        top: 0,
        left: 0
    })

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const widthValue = parseInt(e.target.value.replace(/,/g, ""), 10)

        dispatch(setWidth(widthValue))

        if (
            (!selectedObject.obj && selectedObject?.obj.type !== "rect") ||
            (selectedObject.obj.type === "group" && !widthValue)
        )
            return
        selectedObject.obj.set({
            width: isNaN(widthValue)
                ? 0
                : widthValue / selectedObject.obj.scaleX
        })
        canvas?.renderAll()
    }
    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const heightValue = parseInt(e.target.value.replace(/,/g, ""), 10)

        dispatch(setHeight(heightValue))

        if (
            (!selectedObject.obj && selectedObject.obj.type !== "rect") ||
            (selectedObject.obj.type && heightValue === 0)
        )
            return

        selectedObject.obj.set({
            height: isNaN(heightValue)
                ? 0
                : heightValue / selectedObject.obj.scaleY
        })
        canvas?.renderAll()
    }

    const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const diameterValue = parseInt(e.target.value.replace(/,/, ""), 10)

        dispatch(setDiameter(diameterValue))

        if (
            !selectedObject.obj &&
            selectedObject.obj.type !== "circle" &&
            !diameterValue
        )
            return

        selectedObject.obj.set({
            radius: diameterValue / 2 / selectedObject.obj.scaleX
        })
        canvas?.renderAll()
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const colorValue = e.target.value
        dispatch(setColor(colorValue))

        if (!selectedObject.obj) return
        selectedObject.obj.set({ fill: colorValue })
        canvas?.renderAll()
    }

    const handleStrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const strokeValue = e.target.value
        dispatch(setStroke(strokeValue))

        if (!selectedObject.obj) return
        selectedObject.obj.set({ stroke: strokeValue })
        canvas?.renderAll()
    }

    const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const angleValue = e.target.value
        dispatch(setAngle(Number(angleValue)))

        if (!selectedObject) return
        selectedObject.obj.set({ angle: angleValue })
        canvas?.renderAll()
    }

    useEffect(() => {
        if (!canvas) return

        canvas.on("selection:created", (e) => {
            handleObjectSelection(
                e.selected[0],
                setSettingsPosition,
                canvas,
                setSelectedObject,
                dispatch
            )
        })
        canvas.on("selection:updated", (e) => {
            handleObjectSelection(
                e.selected[0],
                setSettingsPosition,
                canvas,
                setSelectedObject,
                dispatch
            )
        })
        canvas.on("selection:cleared", () => {
            setSelectedObject({ obj: null, name: null })
            clearSettings(dispatch)
        })

        canvas.on("object:modified", (e) => {
            handleObjectSelection(
                e.target,
                setSettingsPosition,
                canvas,
                setSelectedObject,
                dispatch
            )
        })
    }, [canvas])

    const deleteSelectedObject = () => {
        if (canvas && selectedObject) {
            canvas.remove(selectedObject.obj)
            canvas.renderAll()
        }
    }

    const handleKeyPress = (e: globalThis.KeyboardEvent) => {
        switch (e.key) {
            case "Delete":
                deleteSelectedObject()
                break
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [handleKeyPress])

    return (
        <aside
            style={{
                position: "absolute",
                top: settingsPosition.top,
                left: settingsPosition.left
            }}
            className={`${
                !selectedObject.obj
                    ? "hidden"
                    : "flex items-center bg-primary z-40 border-2 border-black p-4 -translate-y-[200%] -translate-x-[50%] text-typography-light"
            }`}
        >
            {selectedObject.obj && selectedObject.obj.type === "rect" && (
                <RectParameters
                    rectWidthValue={width}
                    onChangeWidth={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleWidthChange(e)
                    }
                    rectHeightValue={height}
                    onChangeHeight={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleHeightChange(e)
                    }
                    rectFillValue={fill}
                    onChangeFill={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleColorChange(e)
                    }
                    rectStrokeValue={stroke}
                    onChangeStroke={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleStrokeChange(e)
                    }
                    onClick={deleteSelectedObject}
                />
            )}
            {selectedObject.obj && selectedObject.obj.type === "circle" && (
                <CircleParameters
                    circleDiameterValue={diameter}
                    circleFillValue={fill}
                    circleStrokeValue={stroke}
                    onClick={deleteSelectedObject}
                    onChangeDiameter={(
                        e: React.ChangeEvent<HTMLInputElement>
                    ) => handleDiameterChange(e)}
                    onChangeFill={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleColorChange(e)
                    }
                    onChangeStroke={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleStrokeChange(e)
                    }
                />
            )}
            {selectedObject.obj && selectedObject.obj.type === "line" && (
                <LineParameters
                    lineStrokeValue={stroke}
                    onChangeStroke={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleStrokeChange(e)
                    }
                    onChangeWidth={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleWidthChange(e)
                    }
                    lineWidthValue={width}
                    lineAngleValue={angle}
                    onChangeAngle={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleAngleChange(e)
                    }
                />
            )}
        </aside>
    )
}
export default ShapeParameters
