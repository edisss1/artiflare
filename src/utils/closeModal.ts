export const closeModal = (
    modalRef: React.MutableRefObject<HTMLDialogElement | null>
) => {
    modalRef.current?.close()
}
