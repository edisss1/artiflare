import { useDispatch, useSelector } from "react-redux"
import FormInput from "../atoms/FormInput"
import { AppDispatch, RootState } from "../../redux/store"
import { setEmail, setPassword } from "../../redux/slices/authSlice"

interface FormProps {
  onSubmit: () => void
}

const Form = ({ onSubmit }: FormProps) => {
  const dispatch: AppDispatch = useDispatch()
  const { email, password } = useSelector((state: RootState) => state.auth)

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 items-center mt-4 w-full text-typography-light">
      <FormInput
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
        placeholder="you@example.com"
        type="email"
      />
      <FormInput
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
        placeholder="password"
        type="password"
      />
    </form>
  )
}
export default Form
