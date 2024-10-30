type ToolBarProps = {
  onClick: () => void
}

const ToolBar = ({ onClick }: ToolBarProps) => {
  return (
    <aside className="absolute top-[50%] left-8 p-4 bg-primary z-10 text-typography-light">
      <button onClick={onClick}>addRectangle</button>
    </aside>
  )
}
export default ToolBar
