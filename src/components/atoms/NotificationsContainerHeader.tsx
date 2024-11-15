import Button from "./Button.tsx"
import CloseIcon from "../icons/CloseIcon.tsx"

function NotificationsContainerHeader(props: { onClick: () => void }) {
	return <div className={"flex flex-col"}>
		<div className={"flex items-center  justify-between"}>
			<h2 className={"font-medium"}>Notifications</h2>
			<Button className={""} onClick={props.onClick}>
				<CloseIcon/>
			</Button>
		</div>
		<div>
			<p>Unread</p>
		</div>
	</div>
}


export default NotificationsContainerHeader