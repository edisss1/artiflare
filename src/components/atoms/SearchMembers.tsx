import { useState } from "react"
import SearchIcon from "../icons/SearchIcon"

const SearchMembers = () => {
    const [query, setQuery] = useState("")

    const handleMembersSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div
            className={`mx-8 mt-5 w-full max-w-[270px] flex gap-2 items-center relative after:w-full after:scale-0 after:absolute after:h-[2px] after:bg-bg-dark dark:after:bg-bg-light after:top-[140%] after:left-0 focus-within:after:scale-100 after:transition-all after:duration-200 after:origin-bottom`}
        >
            <SearchIcon className="w-[20px] h-[20px]" />
            <input
                onChange={(e) => handleMembersSearch(e)}
                value={query}
                id="member-search"
                placeholder="Search member by name or email"
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
