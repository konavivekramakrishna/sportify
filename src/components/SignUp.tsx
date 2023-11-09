import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../utils/apiCallUtils";
import { SignUpInputDataType } from "../types";
import { Link as Navigate } from "react-router-dom";
import { UserContext } from "../context/user";

export default function SignUp(props: { handleSignupCB: () => void }) {
  const { setUser } = React.useContext(UserContext);
  const navigator = useNavigate();
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { register, handleSubmit } = useForm<SignUpInputDataType>();

  const onSubmit: SubmitHandler<SignUpInputDataType> = async (data) => {
    const { name, email, password } = data;
    try {
      const res = await createNewUser({
        name,
        email,
        password,
      });

      if (rememberMe) {
        localStorage.setItem("token", res.auth_token);
      } else {
        sessionStorage.setItem("token", res.auth_token);
      }
      setUser(res.user);
      localStorage.setItem("userData", JSON.stringify(res.user));
      navigator("/home");
    } catch (error: any) {
      setError("Oops! Something went wrong.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md p-6 rounded-lg border  border-gray-300">
      <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue -300"
            placeholder="Password"
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <div className="mt-6 flex justify-between text-gray-800">
        <Navigate to="/home" className="hover:cursor-pointer">
          Home?
        </Navigate>
        <span onClick={props.handleSignupCB} className="hover:cursor-pointer">
          Already have an account? Login
        </span>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}
