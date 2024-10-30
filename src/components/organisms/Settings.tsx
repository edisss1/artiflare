import { Canvas, FabricObject } from "fabric"
import { useEffect, useState } from "react"

interface SettingProps {
  canvas: Canvas | null
}

const Settings = ({ canvas }: SettingProps) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  )
  const [width, setWidth] = useState<number | string>("")
  const [height, setHeight] = useState<number | string>("")
  const [diameter, setDiameter] = useState<number | string>("")
  const [color, setColor] = useState("")

  const handleObjectSelection = (object: any) => {
    if (!object) return

    switch (object.type) {
      case "rect":
        setWidth(Math.round(object.width * object.scaleX))
        setHeight(Math.round(object.height * object.scaleY))
        setColor(object.fill)
        setDiameter("")
        break
      case "circle":
        setDiameter(Math.round(object.radius * 2 * object.scaleX))
        setColor(object.fill)
        setWidth("")
        setHeight("")
        break
    }
  }

  const clearSettings = () => {
    setWidth("")
    setHeight("")
    setDiameter("")
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

  return <div className={`${!selectedObject?.type ? "hidden" : "block"}`}></div>
}
export default Settings
