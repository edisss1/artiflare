import { useEffect, useRef, useState } from "react"
import { Canvas, Line, Group } from "fabric"

const CanvasBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const gridSize = 15

  //   const [isDragging, setIsDragging] = useState(false)
  //   const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  //   const onMouseDown = (e: any) => {
  //     setIsDragging(true)
  //     setLastPos({ x: e.e.offsetX, y: e.e.offsetY })
  //   }
  //   const onMouseMove = (e: any) => {
  //     if (!isDragging || !lastPos || !canvas) return

  //     const deltaX = e.e.offsetX - lastPos.x
  //     const deltaY = e.e.offsetY - lastPos.y

  //     canvas.viewportTransform[4] += deltaX
  //     canvas.viewportTransform[5] += deltaY

  //     canvas.renderAll()

  //     setLastPos({ x: e.e.offsetX, y: e.e.offsetY })
  //   }

  //   const onMouseUp = () => {
  //     setIsDragging(false)
  //     setLastPos(null)
  //   }

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
      })

      initCanvas.backgroundColor = "#fff"

      //   initCanvas.on("mouse:down", onMouseDown)
      //   initCanvas.on("mouse:move", onMouseMove)
      //   initCanvas.on("mouse:up", onMouseUp)

      const drawGrid = () => {
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
