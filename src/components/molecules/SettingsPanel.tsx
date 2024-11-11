import { NavLink } from "react-router-dom";

const SettingsPanel = () => {
  return (
    <div className="flex flex-col bg-primary w-fit p-4 rounded-sm">
      <NavLink className={"mb-4"} to={""}>
        Profile settings
      </NavLink>
      <div className={"flex flex-col gap-6"}>
        <div>
          <h2 className={"font-medium"}>Account</h2>
          <div>
            <NavLink to={""}>Team profile</NavLink>
          </div>
        </div>

        <div>
          <h2 className={"font-medium"}>User management</h2>
          <div>
            <NavLink to={""}>Team members</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPanel;
