import { Canvas } from "fabric"
import React, { KeyboardEvent, useCallback, useEffect, useState } from "react"
import {
  setWidth,
  setHeight,
  setColor,
  setDiameter,
  setStroke,
} from "../../redux/slices/shapeManagementSlice"
import SettingsInput from "../atoms/SettingsInput"
import Button from "../atoms/Button"

interface SettingProps {
  canvas: Canvas | null
  dispatch: any
  width: string | number
  height: string | number
  diameter: string | number
  color: string
  stroke: string
}

const Settings = ({
  canvas,
  dispatch,
  width,
  height,
  color,
  diameter,
  stroke,
}: SettingProps) => {
  const [selectedObject, setSelectedObject] = useState<any>(null)

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const widthValue = parseInt(e.target.value.replace(/,/g, ""), 10)

    dispatch(setWidth(widthValue))

    if (!selectedObject && selectedObject?.type !== "rect" && !widthValue)
      return
    selectedObject.set({
      width: isNaN(widthValue) ? 0 : widthValue / selectedObject.scaleX,
    })
    canvas?.renderAll()
  }
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const heightValue = parseInt(e.target.value.replace(/,/g, ""), 10)

    dispatch(setHeight(heightValue))

    if (!selectedObject && selectedObject?.type !== "rect" && heightValue === 0)
      return

    selectedObject.set({
      height: isNaN(heightValue) ? 0 : heightValue / selectedObject.scaleY,
    })
    canvas?.renderAll()
  }

  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const diameterValue = parseInt(e.target.value.replace(/,/, ""), 10)

    dispatch(setDiameter(diameterValue))

    if (!selectedObject && selectedObject.type !== "circle" && !diameterValue)
      return

    selectedObject.set({ radius: diameterValue / 2 / selectedObject.scaleX })
    canvas?.renderAll()
  }
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value
    dispatch(setColor(colorValue))

    if (!selectedObject) return
    selectedObject.set({ fill: colorValue })
    canvas?.renderAll()
  }

  const handleStrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strokeValue = e.target.value
    dispatch(setStroke(strokeValue))

    if (!selectedObject) return
    selectedObject.set({ stroke: strokeValue })
    canvas?.renderAll()
  }

  const handleObjectSelection = (object: any) => {
    if (!object) return

    setSelectedObject(object)

    switch (object.type) {
      case "rect":
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

  useEffect(() => {}, [])

  const clearSettings = () => {
    dispatch(setWidth(""))
    dispatch(setHeight(""))
    dispatch(setDiameter(""))
  }

  useEffect(() => {
    if (!canvas) return

    canvas.on("selection:created", (e) => {
      handleObjectSelection(e.selected[0])
    })
    canvas.on("selection:updated", (e) => {
      handleObjectSelection(e.selected[0])
    })
    canvas.on("selection:cleared", () => {
      setSelectedObject(null)
      clearSettings()
    })

    canvas.on("object:modified", (e) => {
      handleObjectSelection(e.target)
    })
  }, [canvas])

  const deleteSelectedObject = () => {
    canvas?.remove(selectedObject)
    canvas?.renderAll()
  }

  const handleKeyPress = useCallback((e: KeyboardEvent<Element>) => {
    switch (e.key) {
      case "delete":
        deleteSelectedObject()
        break
    }
  }, [])

  // useEffect(() => {
  //   document.addEventListener("keydown")

  //   return () => {
  //     document.removeEventListener("keydown", () => handleKeyPress)
  //   }
  // }, [handleKeyPress])

  return (
    <aside
      className={`${
        !selectedObject
          ? "hidden"
          : "flex flex-col fixed top-[50%] right-2 bg-primary z-40 border-2 border-black p-4 -translate-y-[50%] text-typography-light"
      }`}>
      {selectedObject && selectedObject.type === "rect" && (
        <div className="flex flex-col gap-2 ">
          <SettingsInput
            type="number"
            value={width}
            onChange={(e) => handleWidthChange(e)}
            id="width"
            label="Width"
          />
          <SettingsInput
            value={height}
            onChange={(e) => handleHeightChange(e)}
            id="height"
            label="Height"
            type="number"
          />
          <SettingsInput
            value={color}
            onChange={(e) => handleColorChange(e)}
            id="color"
            label="Color"
            type="color"
          />
          <SettingsInput
            value={stroke}
            onChange={(e) => handleStrokeChange(e)}
            id="stroke"
            label="Stroke"
            type="color"
          />
          <Button text="Delete" onClick={deleteSelectedObject} />
        </div>
      )}
      {selectedObject && selectedObject.type === "circle" && (
        <div className="flex flex-col gap-2 ">
          <SettingsInput
            value={diameter}
            onChange={(e) => handleDiameterChange(e)}
            type="number"
            id="Diameter"
            label="Diameter"
          />
          <SettingsInput
            value={color}
            onChange={(e) => handleColorChange(e)}
            id="color"
            label="Color"
            type="color"
          />
          <Button text="Delete" onClick={deleteSelectedObject} />
        </div>
      )}
    </aside>
  )
}
export default Settings
