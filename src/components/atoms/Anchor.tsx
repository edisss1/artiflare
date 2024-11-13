import { Link } from "react-router-dom"

type AnchorProps = {
  className?: string
  children?: React.ReactNode
  path: string
}

const Anchor = ({ className,  children, path }: AnchorProps) => {
  return (
    <Link to={path} className={`${className}`}>
      { children}
    </Link>
  )
}
export default Anchor
