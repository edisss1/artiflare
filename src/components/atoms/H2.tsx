interface H2PRops {
    children: React.ReactNode
}

const H2 = ({ children }: H2PRops) => {
    return (
        <h2 className="text-typography-light dark:text-typography-dark text-3xl font-bold">
            {children}
        </h2>
    )
}
export default H2
