import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import Board from "../atoms/Board"
import { useEffect, useMemo, useState } from "react"
import { fetchAllUserBoards, updateBoards } from "../../redux/slices/boardSlice"
import Pagination from "../atoms/Pagination"

const BoardsContainer = () => {
    const dispatch: AppDispatch = useDispatch()
    const { boards } = useSelector((state: RootState) => state.boards)
    const user = useSelector((state: RootState) => state.auth.user)
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
        <div className="flex flex-col gap-4 relative">
            {paginatedBoards?.map((board) => (
                <Board
                    createdBy={board.createdBy}
                    updatedAt={board.updatedAt}
                    id={board.id}
                    modifiedBy={board.modifiedBy}
                    title={board.boardTitle}
                    key={board.id}
                />
            ))}
            <Pagination
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    )
}
export default BoardsContainer
