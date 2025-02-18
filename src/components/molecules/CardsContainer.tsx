interface InviteesContainerProps {
    children: React.ReactNode
}

const CardsContainer = ({ children }: InviteesContainerProps) => {
    return (
        <div className="grid grid-cols-2 gap-2 max-h-[100px] overflow-y-auto custom-scrollbar-modal mt-4">
            {children}
        </div>
    )
}
export default CardsContainer
