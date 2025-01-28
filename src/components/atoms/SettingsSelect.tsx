import React from "react"
import ChevronIcon from "../icons/ChevronIcon"

interface SettingsSelectProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: { label: string; value: string }[]
}

const SettingsSelect = ({ onChange, options }: SettingsSelectProps) => {
    return (
        <div className={`relative text-typography-light min-w-[200px]`}>
            <select
                className="appearance-none w-full outline-none bg-transparent truncate w-calc(100%)  py-[0.9375rem] ps-3 rounded-md"
                onChange={onChange}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronIcon className="absolute top-[50%] -translate-y-[50%] right-3 pointer-events-none" />
        </div>
    )
}
export default SettingsSelect
