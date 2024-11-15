import {closeModal} from "../../utils/closeModal.ts"
import CloseIcon from "../icons/CloseIcon.tsx"

interface ModalProps {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
}

const Modal = ({ modalRef, children }: ModalProps) => {


  return (
    <dialog
      className="modal w-full max-w-[500px] p-9 dark:bg-bg-dark rounded-sm relative bg-bg-light dark:backdrop:bg-bg-light/25 backdrop:bg-bg-dark/30"
      ref={modalRef}
    >
      <button
        onClick={() => closeModal(modalRef)}
        className="absolute right-4 top-4 text-lg font-semibold hover:bg-bg-dark/40 dark:hover:bg-bg-light/40 p-1 rounded-full transition-colors duration-100"
        aria-label="CloseIcon modal"
      >
        <CloseIcon />
      </button>
      {children}
    </dialog>
  );
};
export default Modal;
