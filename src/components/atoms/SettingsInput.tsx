interface SettingsInputProps {
    id: string
    label?: string
    value: string | number | undefined
    onChange: (() => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    type: string
    className?: string
    defaultValue?: string
}

const SettingsInput = ({
    id,
    label,
    value,
    onChange,
    type,
    className,
    defaultValue
}: SettingsInputProps) => {
    return (
        <div className="flex flex-col gap-2 relative  ">
            <label htmlFor={id}>{label}</label>
            <input
                defaultValue={defaultValue}
                className={`${className} p-2  bg-transparent border-2 border-typography-light dark:border-typography-dark rounded-md`}
                value={value}
                onChange={onChange}
                type={type}
                id={id}
            />
        </div>
    )
}
export default SettingsInput
