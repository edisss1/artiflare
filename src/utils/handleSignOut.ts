import { signOutUser } from "../redux/slices/authSlice"
import { AppDispatch } from "../redux/store"

export const handleSignOut = (dispatch: AppDispatch) => {
    dispatch(signOutUser(dispatch))
}
