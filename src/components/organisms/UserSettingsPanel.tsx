import SettingsInput from "../atoms/SettingsInput.tsx";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store.ts";
import Button from "../atoms/Button.tsx";
import Modal from "../molecules/Modal.tsx";
import UserDeletionModalContent from "../atoms/UserDeletionModalContent.tsx";
import userIcon from "../../assets/UserIcon.svg";
import {
  setNewCompanyName,
  setNewDisplayName,
  updateUserName,
} from "../../redux/slices/userManagementSlice.ts";

const UserSettingsPanel = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();
  const { newDisplayName, newCompanyName } = useSelector(
    (state: RootState) => state.userManagement,
  );

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleUserInfoChange = () => {
    if (newDisplayName !== "") {
      dispatch(updateUserName({ user, newDisplayName }));
      return;
    }
    if (newCompanyName !== "") return;
  };

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div>
      <h2 className={"mb-12"}>Profile details</h2>
      <div className={`flex justify-between w-full max-w-[90%]`}>
        <div className={"grid gap-2 place-items-start"}>
          <SettingsInput
            className={"rounded-md w-full max-w-[200px] "}
            label={"Name"}
            id={`name`}
            value={newDisplayName}
            onChange={(e) => dispatch(setNewDisplayName(e.target.value))}
            type={"text"}
          />
          <SettingsInput
            className={"rounded-md w-full max-w-[200px] "}
            label={"Company name"}
            id={`company-name`}
            value={newCompanyName}
            onChange={(e) => dispatch(setNewCompanyName(e.target.value))}
            type={"text"}
          />
          <Button
            onClick={handleUserInfoChange}
            className={
              "border-2 border-typography-light px-2 py-1 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-colors duration-150"
            }
          >
            Change
          </Button>
        </div>
        <div className={"flex flex-col gap-2 items-center"}>
          <h3>Your photo</h3>
          <img
            className={"aspect-square rounded-md w-[clamp(2rem,40vw,10rem)]"}
            src={user?.img ? user.img : userIcon}
            alt={""}
          />
          <div className={"flex gap-2 justify-center items-center"}>
            <Button
              className={
                "border-2 border-typography-light p-2 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-colors duration-150"
              }
            >
              Upload
            </Button>
            <Button
              className={
                "border-2 border-typography-light p-2 rounded-md hover:bg-bg-dark hover:text-typography-dark transition-colors duration-150"
              }
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
      <div className={"mt-[clamp(3rem,30vh,9rem)] flex flex-col relative"}>
        <div className={"grid gap-2"}>
          <h3 className={"font-medium"}>Delete Profile</h3>
          <p>Deleting the profile will irreversibly remove all your boards </p>
        </div>
        <Button
          onClick={openModal}
          className={
            "border-2 border-danger text-danger rounded-md  hover:bg-danger hover:text-typography-dark transition-colors duration-150 w-fit p-2 mt-4"
          }
        >
          Delete profile
        </Button>
        <Modal modalRef={modalRef}>
          <UserDeletionModalContent />
        </Modal>
      </div>
    </div>
  );
};

export default UserSettingsPanel;
