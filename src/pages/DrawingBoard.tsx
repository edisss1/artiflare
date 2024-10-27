import CanvasBoard from "../components/organisms/Canvas"
import CanvasNav from "../components/organisms/CanvasNav"

const DrawingBoard = () => {
  return (
    <main>
      <CanvasNav />
      <div>
        <CanvasBoard />
      </div>
    </main>
  )
}
export default DrawingBoard
