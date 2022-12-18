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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Send Password Reset
        </h1>
        <form onSubmit={onSubmit} className="mt-6">
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={onChange}
              required
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Reset
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="font-medium text-purple-600 hover:underline"
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
