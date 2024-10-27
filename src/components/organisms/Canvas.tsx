import { useEffect, useRef, useState } from "react"
import { Canvas, Line, Group, TEvent } from "fabric"

const CanvasBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<Canvas | null>(null)

  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startDragPosition, setStartDragPosition] = useState<{
    x: number | undefined
    y: number | undefined
  }>({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseDown = (e: TEvent) => {
      setIsDragging(true)
      const pointer = canvas?.getViewportPoint(e.e as MouseEvent)
      setStartDragPosition({ x: pointer?.x, y: pointer?.y })
    }

    const onMouseMove = (e: TEvent) => {
      if (!isDragging) return
      const pointer = canvas?.getViewportPoint(e.e as MouseEvent)

      const deltaX = pointer!.x - startDragPosition.x!
      const deltaY = pointer!.y - startDragPosition.y!

      const currentTransform = canvas?.viewportTransform
      if (currentTransform) {
        currentTransform[4] += deltaX
        currentTransform[5] += deltaY
        canvas.setViewportTransform(currentTransform)
      }

      setStartDragPosition({ x: pointer?.x, y: pointer?.y })
    }

    const onMouseUp = () => {
      setIsDragging(false)
    }

    canvas?.on("mouse:down", onMouseDown)
    canvas?.on("mouse:move", onMouseMove)
    canvas?.on("mouse:up", onMouseUp)

    return () => {}
  }, [canvas, isDragging, startDragPosition])

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        preserveObjectStacking: true,
      })

      initCanvas.backgroundColor = "#fff"

      const drawGrid = (gridSize = 15) => {
        const gridLines = new Group([], { selectable: false })

        for (let x = 0; x <= initCanvas.width; x += gridSize) {
          const line = new Line([x, 0, x, initCanvas.height], {
            stroke: "#333333",
            strokeWidth: 1,
          })
          gridLines.add(line)
        }

        for (let y = 0; y <= initCanvas.height; y += gridSize) {
          const line = new Line([0, y, initCanvas.width, y], {
            stroke: "#333333",
            strokeWidth: 1,
          })
          gridLines.add(line)
        }

        initCanvas.add(gridLines)
        initCanvas.sendObjectToBack(gridLines)
        initCanvas.renderAll()
      }

      drawGrid()
      setCanvas(initCanvas)

      return () => {
        initCanvas.dispose()
      }
    }
  }, [])

  return <canvas ref={canvasRef}></canvas>
}

export default CanvasBoard
