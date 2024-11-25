import React from "react"
import ChevronIcon from "../icons/ChevronIcon"

interface SettingsSelectProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: { label: string; value: string }[]
}

const SettingsSelect = ({ onChange, options }: SettingsSelectProps) => {
    return (
        <div className={`relative text-typography-light `}>
            <select
                className="appearance-none w-full outline-none bg-transparent mb-4 py-[0.9375rem] ps-3 rounded-md"
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.label} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronIcon className="absolute top-[50%] -translate-y-[50%] right-3 pointer-events-none" />
        </div>
    )
}
export default SettingsSelect
