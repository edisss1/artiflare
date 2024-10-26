import { Link } from "react-router-dom"

type ButtonProps = {
  className?: string
  textContent?: string
  children?: React.ReactNode
  path: string
}

const Anchor = ({ className, textContent, children, path }: ButtonProps) => {
  return (
    <Link to={path} className={`${className}`}>
      {textContent || children}
    </Link>
  )
}
export default Anchor
