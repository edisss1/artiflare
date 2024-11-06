const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="lds-ring ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
export default Loading
