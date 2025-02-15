const SunIcon = ({ darkMode }: { darkMode: boolean }) => {
    return (
        <svg
            className={`[&>*]:fill-bg-dark dark:[&>*]:bg-bg-dark absolute  transition-opacity ${
                darkMode ? "opacity-0" : "opacity-100"
            }`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 2.5V3.33333M10 16.6667V17.5M3.33333 10H2.5M5.26177 5.26177L4.58333 4.58333M14.7382 5.26177L15.4167 4.58333M5.26177 14.7417L4.58333 15.4167M14.7382 14.7417L15.4167 15.4167M17.5 10H16.6667M13.3333 10C13.3333 11.8409 11.8409 13.3333 10 13.3333C8.15905 13.3333 6.66667 11.8409 6.66667 10C6.66667 8.15905 8.15905 6.66667 10 6.66667C11.8409 6.66667 13.3333 8.15905 13.3333 10Z"
                stroke="#333333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
export default SunIcon
