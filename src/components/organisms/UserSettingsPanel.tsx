import { Outlet } from "react-router-dom";
import SettingsInput from "../atoms/SettingsInput.tsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import Button from "../atoms/Button.tsx";

const UserSettingsPanel = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [username, setUsername] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  return (
    <div>
      <h2 className={"mb-12"}>Profile details</h2>
      <div className={`flex justify-between w-full max-w-[90%]`}>
        <div className={"grid gap-2"}>
          <SettingsInput
            className={"rounded-sm w-full max-w-[200px]"}
            label={"Name"}
            id={`name`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type={"text"}
          />
          <SettingsInput
            className={"rounded-sm w-full max-w-[200px]"}
            label={"Company name"}
            id={`company-name`}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            type={"text"}
          />
        </div>
        <div className={"flex flex-col gap-2"}>
          <h3>Your photo</h3>
          <img
            className={"aspect-square w-[clamp(2rem,40vw,10rem)]"}
            src={user.photoURL}
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
    </div>
  );
};

export default UserSettingsPanel;
