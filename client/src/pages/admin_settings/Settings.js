import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Settings = () => {
  const userToken = Auth.getToken();

  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          setUserData({ username: data.username, email: data.email });
          console.log(userData);
        } else throw new Error(data.error);
      } catch (error) {
        setUserError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async (username, email) => {
    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        body: JSON.stringify({
          username,
          email
        }),
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        window.location.assign("/dashboard");
      } else throw new Error(data.error);
    } catch (error) {
      setUserError(error.message);
    }
  };

  const onChange = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    console.log(userData);
  };

  const onSubmit = event => {
    event.preventDefault();
    updateUser(userData.username, userData.email);
  };

  return (
    <div className="py-4 px-2">
      <h1 className="text-center text-3xl font-bold">Settings</h1>
      {!userData
        ? <p>Loading...</p>
        : <form
            onSubmit={onSubmit}
            className="mt-6 p-2 max-w-3xl mx-auto bg-slate-300 dark:bg-slate-500 rounded-md shadow-lg"
          >
            <h2 className="text-2xl font-bold my-2">User Profile</h2>
            <div className="mb-2">
              <label
                for="username"
                className="block text-md font-semibold text-gray-800 dark:text-[#fdf8ad]"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                defaultValue={userData.username}
                onChange={onChange}
                required
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="email"
                className="block text-md font-semibold text-gray-800 dark:text-[#fdf8ad]"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={userData.email}
                onChange={onChange}
                required
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6 max-w-sm mx-auto">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>}
      {userError &&
        <p>
          {userError}
        </p>}
    </div>
  );
};

export default Settings;
