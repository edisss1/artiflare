interface PopoverProps {
    id: string
    children: React.ReactNode
}

const Popover = () => {
    return (
        <div popover="true" id="" className="bg-red-500">
            Popover
        </div>
    )
}
export default Popover
