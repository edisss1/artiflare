interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className: string
    disabled?: boolean
    ariaLabel?: string
    type?: "submit" | "reset" | "button"
}

const Button = ({
    children,
    ariaLabel,
    onClick,
    className,
    disabled,
    type
}: ButtonProps) => {
    return (
        <button
            aria-label={ariaLabel}
            disabled={disabled}
            className={className}
            onClick={onClick}
            type={type!}
        >
            {children}
        </button>
    )
}
export default Button
