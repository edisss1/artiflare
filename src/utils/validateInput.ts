export const validateInput = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (value.trim().length === 0) {
        setValue(false)
    } else {
        setValue(true)
    }
}
