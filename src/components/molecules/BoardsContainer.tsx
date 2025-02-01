import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import Board from "../atoms/Board"
import { useEffect, useMemo, useState } from "react"
import {
    fetchAllUserBoards,
    updateBoards,
    updateBoardsPerPage
} from "../../redux/slices/boardSlice"
import Pagination from "../atoms/Pagination"
import { Board as BoardType } from "../../types/Board"
import { t } from "i18next"

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
    const { sortedBy, boardSearchQuery } = useSelector(
        (state: RootState) => state.boards
    )

    const totalPages = Math.ceil(boards.length / boardsPerPage)

    const windowWidth = window.innerWidth

    const sortedBoards = useMemo(() => {
        const boardsForSort = [...boards]

        switch (sortedBy) {
            case "last-opened":
                return boardsForSort.sort((a, b) =>
                    a.updatedAt > b.updatedAt ? -1 : 1
                )
            case "newest-first":
                return boardsForSort.sort((a, b) =>
                    a.updatedAt < b.updatedAt ? -1 : 1
                )
            case "oldest-first":
                return boardsForSort.sort((a, b) =>
                    a.updatedAt > b.updatedAt ? -1 : 1
                )

            default:
                return boardsForSort.sort((a, b) =>
                    a.updatedAt < b.updatedAt ? -1 : 1
                )
        }
    }, [sortedBy, boards])

    const queriedBoards = useMemo(() => {
        return sortedBoards.filter((board) =>
            board.boardTitle.includes(boardSearchQuery)
        )
    }, [boardSearchQuery, boards])

    const paginatedBoards = useMemo(() => {
        const startIndex = (currentPage - 1) * boardsPerPage
        const endIndex = startIndex + boardsPerPage
        return queriedBoards?.slice(startIndex, endIndex)
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

    useEffect(() => {
        windowWidth <= 1280 && dispatch(updateBoardsPerPage(3))
    }, [windowWidth])

    return (
        <>
            <div className="flex flex-col gap-4 relative min-h-[420px] ">
                {paginatedBoards?.length === 0 && (
                    <p className="text-center text-sm font-normal opacity-70 mt-8 ">
                        {t("noBoards")}
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
        </>
    )
}
export default BoardsContainer
