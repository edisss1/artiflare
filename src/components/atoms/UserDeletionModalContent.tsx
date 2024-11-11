import Button from "./Button.tsx";
import { AppDispatch } from "../../redux/store.ts";
import { useDispatch } from "react-redux";
import {
  clearUser,
  deleteUserFromDatabase,
} from "../../redux/slices/authSlice.ts";
import { useNavigate } from "react-router-dom";

const UserDeletionModalContent = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserDeletion = () => {
    console.log("user deleted and cleared");
    dispatch(deleteUserFromDatabase());
    dispatch(clearUser());
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <div className={"flex flex-col items-center"}>
      <div className={"grid gap-2 place-items-center"}>
        <h2 className={"text-3xl"}>Are you sure?</h2>
        <p className={"text-lg"}>This action is irreversible</p>
      </div>
      <Button
        onClick={handleUserDeletion}
        className={
          "mt-8 border-2 border-danger px-4 py-1 rounded-sm hover:rounded-md hover:bg-danger hover:text-typography-dark transition-colors duration-150"
        }
      >
        Delete
      </Button>
    </div>
  );
};
export default UserDeletionModalContent;
