export function togglePopover(
    isPopoverOpen: boolean,
    setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    console.log("popover toggled")
    setIsPopoverOpen(!isPopoverOpen)
}
