import React, { useRef } from "react";
import ShapeModal from "../atoms/ShapeModal.tsx";

type ToolBarProps = {
  shapesList: {
    icon: React.ReactNode;
    fn: { label: React.ReactNode; fn: () => void }[];
  }[];
};

const ToolBar = ({ shapesList }: ToolBarProps) => {
  const shapeModalRefs = useRef(
    shapesList.map(() => React.createRef<HTMLDivElement>()),
  );

  const toggleModal = (index: number) => {
    if (shapeModalRefs.current[index]) {
      shapeModalRefs.current[index].current?.classList.toggle("hidden");
    }
  };

  return (
    <aside className="absolute top-[50%] left-4 p-4 bg-primary z-10 text-typography-light flex flex-col gap-2">
      {shapesList.map((shape, index) => {
        const fns = shape.fn;

        return (
          <>
            <button className={"relative"} onClick={() => toggleModal(index)}>
              {shape.icon}
            </button>
            <ShapeModal
              fns={fns}
              shapeModalRef={shapeModalRefs.current[index]}
            />
          </>
        );
      })}
    </aside>
  );
};
export default ToolBar;
