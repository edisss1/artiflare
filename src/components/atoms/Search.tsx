import SearchIcon from "../icons/SearchIcon"

interface SearchProps {
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

const Search = ({ placeholder, onChange, value }: SearchProps) => {
    return (
        <div className="relative ">
            <input
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="bg-transparent text-typography-dark border-2 py-1 border-typography-light dark:border-typography-dark rounded-md flex-row-reverse flex  outline-none ps-8"
                type="text"
            />
            <SearchIcon className="w-4 absolute top-[50%] left-2 -translate-y-[50%]" />
        </div>
    )
}
export default Search
