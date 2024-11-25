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
        <div className="flex gap-4 w-full items-center justify-center">
            {currentPage !== 1 && (
                <Button
                    className="border-2 border-typography-light px-4 py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-all duration-150"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </Button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page, index) => (
                    <Button
                        onClick={() => handlePageChange(page)}
                        className={`${
                            currentPage === index + 1 &&
                            "bg-typography-light text-typography-dark"
                        } w-8 aspect-square flex items-center justify-center rounded-md`}
                    >
                        {page}
                    </Button>
                )
            )}
            {currentPage !== totalPages && (
                <Button
                    className="border-2 border-typography-light px-4 py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-all duration-150"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </Button>
            )}
        </div>
    )
}

export default Pagination
