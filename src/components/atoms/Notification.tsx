import {NotificationType} from "../../types/NotificationType.ts"

interface Notification {
	notification: NotificationType
}

const Notification = ({notification}: Notification) => {
	return (
		<div className={"grid grid-rows-2"}>
			<h5>{notification.senderName}</h5>
			<p>{notification.notificationText}</p>
		</div>
	)
}
export default Notification
