import React from "react";
import Button from "./Button.tsx";

interface ShapeModalProps {
  shapeModalRef: React.RefObject<HTMLDivElement>;
  fns: { label: React.ReactNode; fn: () => void }[];
}

const ShapeModal = ({ shapeModalRef, fns }: ShapeModalProps) => {
  return (
    <div
      className={
        "z-10 absolute backdrop:bg-transparent w-screen max-w-[150px] flex items-center justify-center left-[105%] top-[50%] -translate-y-[50%] bg-primary  p-4"
      }
      ref={shapeModalRef}
    >
      <div
        className={
          "grid grid-cols-4 gap-4 w-full max-w-[100px] items-center justify-center "
        }
      >
        {fns.map((fn, index) => (
          <Button onClick={fn.fn} className={``}>
            {/*<img src={fn.label} alt={fn.label} />*/}
            {fn.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default ShapeModal;
