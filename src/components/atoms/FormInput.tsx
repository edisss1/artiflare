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
    className?: string
    id: string
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
    truncate,
    className,
    id
}: FormInputProps) => {
    return (
        <div
            className={`${bg} ${className} ${maxWidth} relative w-full border-2 ${
                isIncorrect
                    ? "border-danger"
                    : "border-typography-light dark:border-typography-dark text-typography-light"
            }  rounded-md outline-none `}
        >
            <input
                id={id}
                className={`${bg} ${className} ${maxWidth} ${
                    truncate && "truncate"
                }  py-[0.9375rem] w-full peer ps-3 outline-none rounded-md bg-bg-light dark:bg-bg-dark dark:text-typography-dark `}
                value={value}
                onChange={onChange}
                placeholder=""
                type={type}
                required
                autoComplete={autoComplete}
            />
            <label
                className="absolute text-nowrap left-3 top-[50%] -translate-y-[50%]  text-[clamp(0.75rem,1.5vw,1rem)] transition-all duration-[250ms] peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-[50%] peer-placeholder-shown:text-base  peer-focus:top-0 peer-focus:bg-bg-light label-placeholder  dark:peer-focus:bg-bg-dark  z-40 ps-1 peer-focus:text-sm  text-typography-light dark:text-typography-dark pointer-events-none opacity-70 peer-focus:opacity-100  "
                htmlFor={id}
            >
                {placeholder}
            </label>
        </div>
    )
}
export default FormInput
