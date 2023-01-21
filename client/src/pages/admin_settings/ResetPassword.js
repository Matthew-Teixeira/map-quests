import { useState } from "react";

const ResetPassword = () => {
  const resetToken = window.location.pathname.split("/")[2];

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [reserError, setResetError] = useState(null);

  const onChange = event => {
    setResetError(null);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleReset = async (newPassword, confirmPassword) => {
    try {
      const response = await fetch(`/api/user/resetpassword/${resetToken}`, {
        method: "PUT",
        body: JSON.stringify({
          newPassword,
          confirmPassword
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (response.ok) {
        window.location.assign("/");
      } else throw new Error(data.error);
    } catch (error) {
      setResetError(error.message);
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    handleReset(formData.newPassword, formData.confirmPassword);
  };

  return (
    <div className="relative flex flex-col justify-center h-[calc(100vh-66px)] overflow-hidden px-2">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center underline dark:text-[#fdf8ad]">
          Reset Password
        </h1>
        <form onSubmit={onSubmit} className="mt-6">
          <div className="mb-2">
            <label
              for="newPassword"
              className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
            >
              Password
            </label>
            <input
              type="password"
              name="newPassword"
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
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
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
        {reserError &&
          <p className="text-center mt-4 font-bold text-red-600">
            {reserError}
          </p>}
      </div>
    </div>
  );
};

export default ResetPassword;
