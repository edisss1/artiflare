import React, { useState } from "react"
import ShapeModal from "../atoms/ShapeModal.tsx"

type ToolBarProps = {
    shapesList: {
        icon: React.ReactNode
        fn: { label: React.ReactNode; fn: () => void }[]
    }[]
}

const ToolBar = ({ shapesList }: ToolBarProps) => {
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null)

    const toggleModal = (index: number) => {
        setOpenModalIndex((prevIndex) => (prevIndex === index ? null : index))
    }

    return (
        <aside className="absolute rounded-md top-[50%] left-4 p-4 bg-primary z-10 text-typography-light flex flex-col gap-4 ites-center justify-center">
            {shapesList.map((shape, index) => {
                const fns = shape.fn

                return (
                    <div key={index} className="flex flex-col items-center">
                        <button
                            className="relative hover:bg-bg-dark/30 p-1 rounded-md transition-colors duration-150"
                            onClick={() => toggleModal(index)}
                        >
                            {shape.icon}
                        </button>
                        {openModalIndex === index && <ShapeModal fns={fns} />}
                    </div>
                )
            })}
        </aside>
    )
}

export default ToolBar
