interface SuggestionListProps<T> {
    suggestions: T[]
    searchQuery: string
}

const SuggestionList = <T extends string>({
    suggestions,
    searchQuery
}: SuggestionListProps<T>) => {
    return (
        <div className="">
            <ul>
                {suggestions.length !== 0 &&
                    searchQuery &&
                    suggestions.map((suggestion) => <li>{suggestion}</li>)}
            </ul>
        </div>
    )
}
export default SuggestionList
