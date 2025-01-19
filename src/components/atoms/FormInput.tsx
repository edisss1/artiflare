interface FormInputProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    type: string
    bg?: string
    maxWidth?: string
    autoComplete?: string
    isIncorrect?: boolean
}

const FormInput = ({
    value,
    onChange,
    placeholder,
    type,
    bg,
    maxWidth,
    autoComplete,
    isIncorrect
}: FormInputProps) => {
    return (
        <input
            className={`${bg} ${maxWidth} w-full py-[0.9375rem] ps-3 border-2 ${
                isIncorrect
                    ? "border-danger"
                    : "border-typography-light dark:border-typography-dark"
            }  rounded-md outline-none`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            required
            autoComplete={autoComplete}
        />
    )
}
export default FormInput
