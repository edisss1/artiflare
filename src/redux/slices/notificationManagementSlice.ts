import {NotificationType} from "../../types/NotificationType.ts"


interface NotificationState {
	notifications: NotificationType[]

}


const initialState: NotificationState = {
	notifications: []
}





const notificationManagementSlice = {
	name: "notificationManagement",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase()
	}
}



export default notificationManagementSlice.reducers