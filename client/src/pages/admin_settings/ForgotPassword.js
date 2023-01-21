import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [resetError, setResetError] = useState(null);

  const handleReset = async email => {
    try {
      const response = await fetch("/api/user/forgotpassword", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        window.location.assign("/password_reset/sent")
      } else throw new Error(data.error);
    } catch (error) {
        console.log(error.message)
      setResetError(error.message);
    }
  };

  const onChange = event => {
    setResetError(null);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    handleReset(formData.email);
  };

  return (
    <div className="relative flex flex-col justify-center h-[calc(100vh-66px)] overflow-hidden px-2">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center dark:text-[#fdf8ad] underline">
          Send Password Reset
        </h1>
        <form onSubmit={onSubmit} className="mt-6">
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
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Reset
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700 dark:text-[#fdf8ad]">
          {" "}Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-medium text-blue-400 hover:text-blue-700 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {resetError &&
          <p className="text-center mt-4 font-bold text-red-600">
            {resetError}
          </p>}
      </div>
      
    </div>
  );
};

export default ForgotPassword;
