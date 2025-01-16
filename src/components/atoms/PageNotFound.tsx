const PageNotFound = () => {
    return (
        <div className="w-screen h-screen overflow-hidden relative z-40">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center justify-center gap-4">
                <p>This page doesn’t exist</p>
            </div>
        </div>
    )
}
export default PageNotFound
