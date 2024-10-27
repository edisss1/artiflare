import { useEffect, useRef, useState } from "react"
import { Canvas, Line, Group } from "fabric"

const CanvasBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<Canvas | null>(null)
  const gridSize = 25

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
      })

      initCanvas.backgroundColor = "#fff"

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
