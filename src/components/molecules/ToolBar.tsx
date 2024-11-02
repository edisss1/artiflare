import { Canvas } from "fabric"

type ToolBarProps = {
  shapesList: {
    icon: string
    fn: () => void
  }[]
}

const ToolBar = ({ shapesList }: ToolBarProps) => {
  return (
    <aside className="absolute top-[50%] left-8 p-4 bg-primary z-10 text-typography-light flex flex-col gap-2">
      {shapesList.map((shape) => (
        <button
          key={shape.icon}
          className="border-2 border-black px-3 py-1"
          onClick={shape.fn}>
          {shape.icon}
        </button>
      ))}
    </aside>
  )
}
export default ToolBar
