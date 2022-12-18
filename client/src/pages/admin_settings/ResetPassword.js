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
    <div>
      <form onSubmit={onSubmit} className="mt-6">
        <div className="mb-2">
          <label
            for="newPassword"
            className="block text-sm font-semibold text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            name="newPassword"
            onChange={onChange}
            required
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            for="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={onChange}
            required
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <a href="#" className="text-xs text-purple-600 hover:underline">
          Forget Password?
        </a>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Submit
          </button>
        </div>
      </form>
      {reserError &&
        <p>
          {reserError}
        </p>}
    </div>
  );
};

export default ResetPassword;
