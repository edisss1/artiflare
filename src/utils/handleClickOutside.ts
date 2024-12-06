export function handleClickOutside(
    event: MouseEvent,
    ref:
        | React.MutableRefObject<HTMLDivElement | null>
        | React.MutableRefObject<HTMLDialogElement | null>,
    isPopoverOpen: boolean,
    setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsPopoverOpen(!isPopoverOpen)
    }
}
