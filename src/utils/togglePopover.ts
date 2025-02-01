export function togglePopover(
    isPopoverOpen: boolean,
    setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsPopoverOpen(!isPopoverOpen)
}
