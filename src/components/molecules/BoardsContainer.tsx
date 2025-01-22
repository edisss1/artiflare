import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import Board from "../atoms/Board"
import { useEffect, useMemo, useState } from "react"
import { fetchAllUserBoards, updateBoards } from "../../redux/slices/boardSlice"
import Pagination from "../atoms/Pagination"
import { Board as BoardType } from "../../types/Board"

interface BoardsContainerProps {
    boards: BoardType[]
}

const BoardsContainer = ({ boards }: BoardsContainerProps) => {
    const dispatch: AppDispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const [currentPage, setCurrentPage] = useState(1)
    const boardsPerPage = useSelector(
        (state: RootState) => state.boards.boardsPerPage
    )
    const { sortedBy } = useSelector((state: RootState) => state.boards)
    const boardsForSort = [...boards]

    const totalPages = Math.ceil(boards.length / boardsPerPage)

    const sortedBoards = useMemo(() => {
        switch (sortedBy) {
            case "last-opened":
                return boardsForSort.sort((a, b) =>
                    a.updatedAt > b.updatedAt ? -1 : 1
                )
            case "newest-first":
                return boardsForSort.sort((a, b) =>
                    a.updatedAt < b.updatedAt ? -1 : 1
                )
        }
    }, [sortedBy, boardsForSort])

    const paginatedBoards = useMemo(() => {
        const startIndex = (currentPage - 1) * boardsPerPage
        const endIndex = startIndex + boardsPerPage
        return sortedBoards?.slice(startIndex, endIndex)
    }, [currentPage, boardsPerPage, boards])

    useEffect(() => {
        if (user) {
            const unsubscribe = dispatch(fetchAllUserBoards(user.uid))

            return () => unsubscribe()
        }
    }, [])

    useEffect(() => {
        dispatch(updateBoards(sortedBoards!))
    }, [sortedBy, dispatch])

    console.log("Boards: ", boards)
    return (
        <div className="flex flex-col gap-4 relative ">
            {paginatedBoards?.length === 0 && (
                <p className="text-center text-sm font-normal opacity-70 mt-8 ">
                    You don't have any boards yet
                </p>
            )}
            {paginatedBoards?.map((board) => (
                <Board
                    isFavorite={board.isFavorite}
                    createdBy={board.createdBy}
                    updatedAt={board.updatedAt}
                    id={board.id}
                    modifiedBy={board.modifiedBy}
                    title={board.boardTitle}
                    key={board.id}
                />
            ))}
            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    )
}
export default BoardsContainer
