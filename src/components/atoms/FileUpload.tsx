interface FileUploadProps {
    id: string
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    accept?: string
}

const FileUpload = ({ id, label, onChange, accept }: FileUploadProps) => {
    return (
        <div>
            <label
                className="border-2 border-typography-light dark:border-typography-dark rounded-md hover:bg-typography-light hover:text-typography-dark transition-colors duration-150 dark:hover:bg-typography-dark dark:hover:text-typography-light inline-block px-4 py-1"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                accept={accept}
                onChange={onChange}
                className="hidden"
                type="file"
                id={id}
            />
        </div>
    )
}
export default FileUpload
