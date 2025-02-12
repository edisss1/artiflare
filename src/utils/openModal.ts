export function openModal(
    modalRef: React.MutableRefObject<HTMLDialogElement | null>
) {
    modalRef.current?.showModal()
}
