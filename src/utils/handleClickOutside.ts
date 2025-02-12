export function handleClickOutside(
    event: MouseEvent,
    ref:
        | React.MutableRefObject<HTMLDivElement | null>
        | React.MutableRefObject<HTMLDialogElement | null>,
    closeFunction: () => void
) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
        closeFunction()
    }
}
