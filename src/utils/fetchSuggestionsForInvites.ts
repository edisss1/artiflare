import { search } from "./search"

export async function fetchSuggestionsForInvites(
    searchQueryText: string,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
) {
    if (searchQueryText.trim() === "") {
        setSuggestions([])
        return
    }

    try {
        const results = await search(searchQueryText, "users")
        if (!results || results.length === 0) {
            console.warn("No matching results found.")
            setSuggestions([])
            return
        }

        setSuggestions(results.map((user) => user.name))
        console.log("Suggestions:", results)
    } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
    }
}
