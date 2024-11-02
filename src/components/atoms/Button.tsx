interface ButtonProps {
  text: string
  onClick: () => void
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="border-2 border-typography-light mt-4 py-2 px-4 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-all duration-150"
      onClick={onClick}>
      {text}
    </button>
  )
}
export default Button
