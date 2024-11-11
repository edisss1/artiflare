import Form from "./Form";

import AuthWithProviders from "../atoms/AuthWithProviders";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { signInWithCredentials } from "../../redux/slices/authSlice";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { email, password } = useSelector((state: RootState) => state.auth);

  const handleUserSignIn = async () => {
    dispatch(signInWithCredentials({ email, password }));
  };

  return (
    <div
      aria-label="Login form"
      className="flex flex-col items-center justify-center min-h-screen "
    >
      <div className="flex flex-col items-center w-full max-w-[400px]">
        <div className="flex flex-col gap-2 max-w-[200px] items-center">
          <h2 className="text-typography-light dark:text-typography-dark text-3xl font-bold">
            Artiflare
          </h2>
          <p className="text-xl font-medium">Login</p>
        </div>
        <Form children={"Log in"} onSubmit={handleUserSignIn} />
        <AuthWithProviders />
        <div className="flex gap-2 mt-6 mb-9">
          <p>Don't have an account?</p>
          <Link
            className="relative after:absolute after:w-full after:h-px after:bg-bg-dark dark:after:bg-bg-light after:top-full after:left-0 hover:after:scale-x-0 after:transition-all after:duration-200 after:origin-right "
            to={"/auth/signup"}
          >
            Sign up
          </Link>
        </div>
        <Link
          className="relative after:absolute after:w-full after:h-px after:bg-bg-dark dark:after:bg-bg-light after:top-full after:left-0 hover:after:scale-x-0 after:transition-all after:duration-200 after:origin-right"
          to={"/"}
        >
          Go back
        </Link>
      </div>
    </div>
  );
};
export default Login;
