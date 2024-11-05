interface SettingsInputProps {
  id: string
  label?: string
  value: string | number
  onChange: (() => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void)
  type: string
  className?: string
}

const SettingsInput = ({
  id,
  label,
  value,
  onChange,
  type,
  className,
}: SettingsInputProps) => {
  return (
    <div className="flex flex-col gap-2 relative  ">
      <label htmlFor={id}>{label}</label>
      <input
        className={`${className} p-2  bg-transparent border-2 border-typography-light rounded-sm`}
        value={value}
        onChange={onChange}
        type={type}
        id={id}
      />
    </div>
  )
}
export default SettingsInput
