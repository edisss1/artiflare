import { NavLink } from "react-router-dom";

interface SettingsLinksProps {
  uid: string | undefined;
}

const SettingsLinks = ({ uid }: SettingsLinksProps) => {
  return (
    <aside className="flex flex-col bg-primary w-full max-w-[300px] p-4 rounded-sm h-full min-h-[500px]  ">
      <NavLink className={"mb-4"} to={`profile/${uid}`}>
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
    </aside>
  );
};
export default SettingsLinks;
