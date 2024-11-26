interface SettingsHeaderProps {
    children: React.ReactNode
}

const SettingsHeader = ({ children }: SettingsHeaderProps) => {
    return <h2 className="mb-12">{children}</h2>
}
export default SettingsHeader
