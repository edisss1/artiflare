interface CreateBoardModalContentProps {
  title: string;
  setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createBoard: () => void;
}

const CreateBoardModalContent = ({
  title,
  setTitle,
  createBoard,
}: CreateBoardModalContentProps) => {
  return (
    <div className="flex flex-col gap-6 bg-bg-light dark:bg-bg-dark text-typography-light dark:text-typography-dark">
      <h2 className="text-xl text-center  ">Create new board</h2>
      <div className="flex flex-col gap-4 items-center">
        <input
          className="p-2 w-full max-w-[300px] bg-transparent border-2 border-typography-light dark:border-typography-dark rounded-md invalid:border-danger"
          minLength={4}
          type="text"
          placeholder="Board title"
          value={title}
          onChange={setTitle}
          required
        />
      </div>
      <button
        onClick={createBoard}
        className="mt-8 px-6 py-2 rounded-sm border-2 border-typography-light dark:border-typography-dark hover:bg-secondary transition-colors duration-100 w-fit self-center"
      >
        Create
      </button>
    </div>
  );
};
export default CreateBoardModalContent;
