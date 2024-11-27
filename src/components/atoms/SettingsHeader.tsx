interface SettingsHeaderProps {
    children: React.ReactNode
}

const SettingsHeader = ({ children }: SettingsHeaderProps) => {
    return (
        <h2 className="mb-12 block w-fit relative after:w-full after:h-[2px] after:bg-secondary after:absolute after:top-[150%] after:left-0">
            {children}
        </h2>
    )
}
export default SettingsHeader
