import { useEffect } from "react"
import { closeModal } from "../../utils/closeModal.ts"
import CloseIcon from "../icons/CloseIcon.tsx"

interface ModalProps {
    modalRef: React.MutableRefObject<HTMLDialogElement | null>
    children: React.ReactNode
    minHeight?: string
}

const Modal = ({
    modalRef,
    children,
    minHeight = "lg:min-h-[600px] max-lg:min-h-[300px]"
}: ModalProps) => {
    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal(modalRef)
        }
    }

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside)

        return () => {
            window.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <dialog
            className={`${minHeight} modal w-full max-w-[500px]  p-9 text-typography-light dark:text-typography-dark dark:bg-bg-dark rounded-lg relative bg-bg-light dark:backdrop:bg-bg-light/25 backdrop:bg-bg-dark/30 backdrop:pointer-events-none`}
            ref={modalRef}
        >
            <button
                onClick={() => closeModal(modalRef)}
                className="absolute right-4 top-4 text-lg font-semibold hover:bg-bg-dark/40 dark:hover:bg-bg-light/40 p-1 rounded-full transition-colors duration-100"
                aria-label="Close modal"
            >
                <CloseIcon />
            </button>
            {children}
        </dialog>
    )
}
export default Modal
