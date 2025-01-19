interface CheckboxProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    checked: boolean | undefined
    id: string
    name?: string
}

const Checkbox = ({ onChange, checked, id, name }: CheckboxProps) => {
    return (
        <input
            className="accent-secondary  w-4 h-4 rounded-lg "
            type="checkbox"
            onChange={onChange}
            checked={checked}
            id={id}
            name={name}
        />
    )
}
export default Checkbox
