interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className: string
    disabled?: boolean
}

const Button = ({ children, onClick, className, disabled }: ButtonProps) => {
    return (
        <button disabled={disabled} className={className} onClick={onClick}>
            {children}
        </button>
    )
}
export default Button
