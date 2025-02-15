import Button from "./Button"

interface PaginationProps {
    totalPages: number
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({
    totalPages,
    currentPage,
    setCurrentPage
}: PaginationProps) => {
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const getPageNumbers = () => {
        const pages = []
        const maxVisible = 3
        const ellipsis = "..."

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 3; i++) {
                    pages.push(i)
                }
                pages.push(ellipsis)
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push(ellipsis)
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push(ellipsis)
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push(ellipsis)
                pages.push(totalPages)
            }
        }
        return pages
    }

    return (
        <div className="flex gap-2 w-full items-center  justify-center absolute bottom-0 max-lg:bg-bg-light max-lg:dark:bg-bg-dark">
            {currentPage !== 1 && (
                <Button
                    className="border-2  border-typography-light px-4 py-1 rounded-md hover:bg-bg-dark dark:hover:bg-bg-light dark:hover:text-typography-light hover:text-typography-dark transition-all duration-150"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </Button>
            )}
            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span
                        key={index}
                        className="text-typography-light row-start-1 dark:text-typography-dark"
                    >
                        ...
                    </span>
                ) : (
                    <Button
                        key={index}
                        onClick={() => handlePageChange(page as number)}
                        className={`${
                            currentPage === page &&
                            "bg-bg-dark row-start-1 dark:bg-bg-light dark:text-typography-light text-typography-dark"
                        } w-8 aspect-square flex items-center justify-center rounded-md `}
                    >
                        {page}
                    </Button>
                )
            )}
            {currentPage !== totalPages && (
                <Button
                    className="border-2 border-typography-light px-4 py-1 rounded-md hover:bg-bg-dark dark:hover:bg-bg-light dark:hover:text-typography-light hover:text-typography-dark transition-all duration-150"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </Button>
            )}
        </div>
    )
}

export default Pagination
