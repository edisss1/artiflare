import Button from "./Button"

interface CreateBoardModalContentProps {
    title: string
    setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
    createBoard: () => void
}

const CreateBoardModalContent = ({
    title,
    setTitle,
    createBoard
}: CreateBoardModalContentProps) => {
    return (
        <div className="flex flex-col gap-6 bg-bg-light dark:bg-bg-dark text-typography-light dark:text-typography-dark">
            <h2 className="text-xl text-center  ">Create new board</h2>
            <div className="flex flex-col gap-4 items-center">
                <input
                    className="p-2 w-full max-w-[300px] bg-transparent border-2 border-typography-light dark:border-typography-dark rounded-md modal-input"
                    minLength={4}
                    type="text"
                    placeholder="Board title"
                    value={title}
                    onChange={setTitle}
                    required
                />
                {title.length < 4 && (
                    <p className="text-danger">
                        Board title should be at least 4 characters long
                    </p>
                )}
            </div>
            <Button
                disabled={title.length < 4}
                onClick={createBoard}
                className="absolute bottom-6 disabled:opacity-70 disabled:hover:bg-transparent disabled:select-none mt-8 px-6 py-2 border-2 border-typography-light dark:border-typography-dark hover:bg-secondary  w-fit self-center transition-colors duration-150 rounded-lg"
            >
                Create
            </Button>
        </div>
    )
}
export default CreateBoardModalContent
