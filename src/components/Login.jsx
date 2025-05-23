import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login as storelogin } from "../features/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authservice from "../appwrite/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.loginUser(data);
      if (session) {
        const userData = await authservice.getCurrentUser();
        if (userData) dispatch(storelogin(userData));

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form 
        onSubmit={handleSubmit(login)}
        className="mt-8">
        <div className='space-y-5'>
            <Input 
            label="Email: " 
            type="email" 
            placeholder="Enter Your Email"
            {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
  
            })}
            />

            <Input 
            label="Password: " 
            type="password" 
            placeholder="Enter Your Password"
            {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                }
            })}
            />

            <Button 
            type="submit"
            className="w-full"
            >Sign In</Button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
