type ButtonProps = {
  className?: string
  onClick: () => void
  textContent?: string
  children?: React.ReactNode
}

const Button = ({ className, onClick, textContent, children }: ButtonProps) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {textContent || children}
    </button>
  )
}
export default Button
