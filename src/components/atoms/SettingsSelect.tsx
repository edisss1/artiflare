import React from "react"
import ChevronIcon from "../icons/ChevronIcon"

interface SettingsSelectProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: { label: string; value: string }[]
    value?: string
}

const SettingsSelect = ({ onChange, options, value }: SettingsSelectProps) => {
    return (
        <div className={`relative text-typography-light min-w-[200px]`}>
            <select
                className="appearance-none w-full max-w-[150px] outline-none bg-transparent truncate  py-[0.9375rem] ps-3 rounded-md overflow-hidden text-ellipsis"
                onChange={onChange}
                value={value}
            >
                {options.map((option, index) => (
                    <option className="" key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronIcon className="absolute top-[50%] -translate-y-[50%] right-3 pointer-events-none" />
        </div>
    )
}
export default SettingsSelect
