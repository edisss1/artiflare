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
    return (
        <div className="flex gap-4 w-full items-center flex-wrap   justify-center absolute bottom-0 max-lg:bg-bg-light max-lg:dark:bg-bg-dark">
            {currentPage !== 1 && (
                <Button
                    className="border-2 border-typography-light px-4 py-1 rounded-md hover:bg-bg-dark dark:hover:bg-bg-light dark:hover:text-typography-light hover:text-typography-dark transition-all duration-150"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </Button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page, index) => (
                    <Button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        className={`${
                            currentPage === index + 1 &&
                            "bg-bg-dark dark:bg-bg-light dark:text-typography-light text-typography-dark "
                        } w-8 aspect-square flex items-center justify-center rounded-md`}
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
