import { useState } from "react"
import DashboardLinksContainer from "../atoms/DashboardLinksContainer"
import Search from "../atoms/Search"

const DashboardSidebar = () => {
  const [query, setQuery] = useState("")

  const handeQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <aside className="w-full py-9 px-4 min-w-fit max-w-[230px] bg-primary border-r-2 border-r-typography-light min-h-screen relative">
      <div className="gap-[clamp(1rem,40vh,5rem)] flex flex-col">
        <Search
          placeholder="Search by title"
          onChange={(e) => handeQueryChange(e)}
          value={query}
        />
        <DashboardLinksContainer />
      </div>
    </aside>
  )
}
export default DashboardSidebar
