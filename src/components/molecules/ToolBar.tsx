type ToolBarProps = {
  shapesList: {
    placeholder: string
    fn: () => void
  }[]
}

const ToolBar = ({ shapesList }: ToolBarProps) => {
  return (
    <aside className="absolute top-[50%] left-8 p-4 bg-primary z-10 text-typography-light flex flex-col gap-2">
      {shapesList.map((shape) => (
        <button className="border-2 border-black px-3 py-1" onClick={shape.fn}>
          {shape.placeholder}
        </button>
      ))}
    </aside>
  )
}
export default ToolBar
