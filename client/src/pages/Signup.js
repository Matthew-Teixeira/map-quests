import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: ""
  });
  const [registerError, setRegisterError] = useState(null);

  const registerUser = async (username, email, password, confirmPass) => {
    try {
      const response = await fetch("/api/user/register", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPass
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      });

      const data = await response.json();

      if (response.ok) {
        Auth.login(data.token);
      } else throw new Error(data.error);
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  const onChange = event => {
    setRegisterError(null);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    registerUser(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPass
    );
  };

  return (
    <div className="relative flex flex-col justify-center h-[calc(100vh-66px)] overflow-hidden px-2">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center underline dark:text-[#fdf8ad]">
          Sign Up
        </h1>
        <form onSubmit={onSubmit} className="mt-6">
          <div className="mb-2">
            <label
              for="username"
              className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={onChange}
              required
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={onChange}
              required
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              required
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="confirmPass"
              className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPass"
              onChange={onChange}
              required
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700 dark:text-[#fdf8ad]">
          {" "}Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-blue-400 hover:text-blue-700 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {registerError &&
          <p className="text-center mt-4 font-bold text-red-600">
            {registerError}
          </p>}
      </div>
    </div>
  );
}
