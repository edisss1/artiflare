interface BoardContainer {
  id: string
  scale: number
  updatedAt: Date
  createdAt: Date
  shapes: {
    shape: string
    x: number
    y: number
    width: number
    height: number
    fill: string
    zIndex: number
    scale: number
  }[]
}

const BoardContainer = () => {
  return <div></div>
}
export default BoardContainer
