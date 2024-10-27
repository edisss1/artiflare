import { Link } from "react-router-dom"

type AnchorProps = {
  className?: string
  textContent?: string
  children?: React.ReactNode
  path: string
}

const Anchor = ({ className, textContent, children, path }: AnchorProps) => {
  return (
    <Link to={path} className={`${className}`}>
      {textContent || children}
    </Link>
  )
}
export default Anchor
