import * as React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../utils/apiCallUtils";
import { UserContext } from "../context/user";
import { LoginDataType } from "../types";

export default function Login(props: { handleSignupCB: () => void }) {
  const { setUser } = React.useContext(UserContext);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { register, handleSubmit } = useForm<LoginDataType>();
  const navigator = useNavigate();

  const submit: SubmitHandler<LoginDataType> = async (data) => {
    const { email, password } = data;
    try {
      const response = await signInUser({ email, password });
      if (!response.auth_token) {
        setError("Invalid Credentials");
      } else {
        if (rememberMe) {
          localStorage.setItem("token", response.auth_token);
        } else {
          sessionStorage.setItem("token", response.auth_token);
        }
        setUser(response.user);
        localStorage.setItem("userData", JSON.stringify(response.user));
        navigator("/home");
      }
    } catch (error: any) {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md p-6 rounded-lg border border-gray-300">
      <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">
        Login
      </h1>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Email Id"
          />
        </div>
        <div>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Password"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <label className="flex items-center text-gray-800">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          Remember me
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          Login
        </button>
        <div className="mt-6 flex justify-between text-gray-800">
          <Link to="/home" className="hover:cursor-pointer">
            Home?
          </Link>
          <span onClick={props.handleSignupCB} className="hover:cursor-pointer">
            Don't have an account? Sign Up
          </span>
        </div>
      </form>
    </div>
  );
}
