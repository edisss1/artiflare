import { IconProps } from "../../types/IconProps"

const InviteIcon = ({ className }: IconProps) => {
    return (
        <svg
            className={`${className} [&>*]:stroke-bg-dark dark:[&>*]:stroke-bg-light`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16.6668 15H11.6668M14.1668 12.5V17.5M3.3335 17.5C3.3335 14.2783 5.94517 11.6667 9.16683 11.6667C9.746 11.6667 10.3054 11.7511 10.8335 11.9082M12.5002 5.83333C12.5002 7.67428 11.0077 9.16667 9.16683 9.16667C7.32588 9.16667 5.8335 7.67428 5.8335 5.83333C5.8335 3.99238 7.32588 2.5 9.16683 2.5C11.0077 2.5 12.5002 3.99238 12.5002 5.83333Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    )
}
export default InviteIcon
