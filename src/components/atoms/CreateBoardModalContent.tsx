interface CreateBoardModalContentProps {
  title: string
  setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
  createBoard: () => void
}

const CreateBoardModalContent = ({
  title,
  setTitle,
  createBoard,
}: CreateBoardModalContentProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl text-center ">Create new board</h2>
      <div className="flex flex-col gap-4 items-center">
        <input
          className="p-2 w-full max-w-[300px] border-2 border-typography-light rounded-md invalid:border-danger"
          minLength={4}
          type="text"
          placeholder="Board title"
          value={title}
          onChange={setTitle}
          required
        />
      </div>
      <button onClick={createBoard} className="mt-8">
        Create
      </button>
    </div>
  )
}
export default CreateBoardModalContent
