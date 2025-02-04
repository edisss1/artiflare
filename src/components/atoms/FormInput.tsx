interface FormInputProps {
    value: string | undefined
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    type: string
    bg?: string
    maxWidth?: string
    autoComplete?: string
    isIncorrect?: boolean
    truncate?: boolean
}

const FormInput = ({
    value,
    onChange,
    placeholder,
    type,
    bg,
    maxWidth,
    autoComplete,
    isIncorrect,
    truncate
}: FormInputProps) => {
    return (
        <input
            className={`${bg} ${maxWidth} ${
                truncate && "truncate"
            }  w-full py-[0.9375rem] ps-3 border-2 ${
                isIncorrect
                    ? "border-danger"
                    : "border-typography-light dark:border-typography-dark text-typography-light"
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
