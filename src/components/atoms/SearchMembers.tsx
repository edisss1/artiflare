import SearchIcon from "../icons/SearchIcon"

interface SearchMembersProps {
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchMembers = ({ query, setQuery }: SearchMembersProps) => {
    return (
        <div
            className={`mx-8 mt-5 w-full max-w-[270px] flex gap-2 items-center relative after:w-full after:scale-0 after:absolute after:h-[2px] after:bg-bg-dark dark:after:bg-bg-light after:top-[140%] after:left-0 focus-within:after:scale-100 after:transition-all after:duration-200 after:origin-bottom`}
        >
            <SearchIcon className="w-[20px] h-[20px] [&>*]:dark:fill-bg-light" />
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                id="member-search"
                placeholder="Search member by name "
                type="text"
                className="relative bg-transparent outline-none w-full  "
            />
            <label htmlFor="member-search" className="sr-only">
                Search team members
            </label>
        </div>
    )
}
export default SearchMembers
