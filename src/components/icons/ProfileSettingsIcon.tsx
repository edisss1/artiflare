import { SettingsIconProps } from "../../types/SettingsIconProps"

const ProfileSettingsIcon = ({ className }: SettingsIconProps) => {
    return (
        <svg
            className={`${className} [&>*]:fill-bg-dark dark:[&>*]:fill-bg-light `}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 9.68939C10.8357 9.68939 11.6371 9.35741 12.228 8.7665C12.819 8.17558 13.1509 7.37413 13.1509 6.53845C13.1509 5.70277 12.819 4.90132 12.228 4.3104C11.6371 3.71949 10.8357 3.38751 10 3.38751C9.16432 3.38751 8.36287 3.71949 7.77195 4.3104C7.18104 4.90132 6.84906 5.70277 6.84906 6.53845C6.84906 7.37413 7.18104 8.17558 7.77195 8.7665C8.36287 9.35741 9.16432 9.68939 10 9.68939ZM10 11.0738C5.81063 11.0738 3.125 13.3856 3.125 14.5113V16.6131H16.875V14.5113C16.875 13.15 14.3325 11.0738 10 11.0738Z"
                fill="#333333"
            />
        </svg>
    )
}
export default ProfileSettingsIcon
