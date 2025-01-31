interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    className: string
    disabled?: boolean
    ariaLabel?: string
}

const Button = ({
    children,
    ariaLabel,
    onClick,
    className,
    disabled
}: ButtonProps) => {
    return (
        <button
            aria-label={ariaLabel}
            disabled={disabled}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default Button
