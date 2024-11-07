import { useState } from "react"
import DashboardLinksContainer from "../atoms/DashboardLinksContainer"
import Search from "../atoms/Search"
import User from "../molecules/User"

const DashboardSidebar = () => {
  const [query, setQuery] = useState("")

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <aside className="w-full h-screen py-9 px-4 min-w-fit max-w-[230px] bg-primary border-r-2 border-r-typography-light min-h-screen relative text-typography-light">
      <div className="gap-[clamp(1rem,40vh,5rem)] h-full flex flex-col relative">
        <Search
          placeholder="Search by title"
          onChange={(e) => handleQueryChange(e)}
          value={query}
        />
        <DashboardLinksContainer />
        <User position="absolute bottom-0" />
      </div>
    </aside>
  )
}
export default DashboardSidebar
