import ChevronIcon from "../icons/ChevronIcon"

interface SelectProps {
    options: { label: string; value: string }[]
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: string
}

const Select = ({ options, onChange }: SelectProps) => {
    return (
        <div className={`relative text-typography-light `}>
            <select
                className="appearance-none w-full border-2 bg-bg-light dark:bg-bg-dark  text-typography-light dark:text-typography-dark  border-typography-light dark:border-typography-dark py-[0.9375rem] ps-3 rounded-md"
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.label} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronIcon className="absolute top-[50%] -translate-y-[50%] right-3 pointer-events-none [&>*]:stroke-bg-dark [&>*]:dark:stroke-bg-light " />
        </div>
    )
}
export default Select
