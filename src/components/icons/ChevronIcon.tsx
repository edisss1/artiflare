import { IconProps } from "../../types/IconProps"

const ChevronIcon = ({ className }: IconProps) => {
    return (
        <svg
            className={`${className} [&>*]:stroke-bg-dark `}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#333333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default ChevronIcon
