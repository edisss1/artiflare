import { t } from "i18next"
import Button from "./Button"

interface CreateBoardModalContentProps {
    title: string
    setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
    createBoard: () => void
    isChecked: boolean
    setIsChecked: () => void
}

const CreateBoardModalContent = ({
    title,
    setTitle,
    createBoard,
    isChecked,
    setIsChecked
}: CreateBoardModalContentProps) => {
    return (
        <div className="flex flex-col gap-6 bg-bg-light dark:bg-bg-dark text-typography-light dark:text-typography-dark">
            <h2 className="text-xl text-center  ">{t("createNewBoard")}</h2>
            <div className="w-full max-w-[80%] mx-auto flex items-center justify-center">
                <div className="flex flex-col gap-4 items-start">
                    <input
                        className="p-2 w-full max-w-[300px] bg-transparent border-2 border-typography-light dark:border-typography-dark rounded-md modal-input"
                        minLength={4}
                        type="text"
                        placeholder={t("boardTitle")}
                        value={title}
                        onChange={setTitle}
                        required
                    />
                    {title.length < 4 && title !== "" && (
                        <p className="text-danger">{t("boardTitleWarning")}</p>
                    )}
                    <div className=" flex gap-2 items-center justify-center ">
                        <input
                            checked={isChecked}
                            onChange={setIsChecked}
                            type="checkbox"
                            className="accent-secondary "
                        />
                        <p>Board available for all team members</p>
                    </div>
                </div>
            </div>
            <Button
                disabled={title.length < 4}
                onClick={createBoard}
                className="absolute bottom-6 disabled:opacity-70 disabled:hover:bg-transparent disabled:select-none mt-8 px-6 py-2 border-2 border-typography-light dark:border-typography-dark hover:bg-secondary  w-fit self-center transition-colors duration-150 rounded-lg"
            >
                {t("create")}
            </Button>
        </div>
    )
}
export default CreateBoardModalContent
