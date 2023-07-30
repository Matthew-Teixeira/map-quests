import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

export default function TimeTable() {
  const [token, setToken] = useState(null);
  const [timeData, setTimeData] = useState(null);

  useEffect(() => {
    const userToken = Auth.getToken();
    setToken(userToken);
    if (!userToken) {
      window.location.assign("/login");
    }

    //
    getTimeData();
    //
    console.log(userToken);
  }, []);

  useEffect(() => {
    getTimeData();
  }, [token]);

  const getTimeData = async () => {
    try {
      const response = await fetch("/api/time/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.times);
        setTimeData(data.times);
      } else throw new Error(data.error);
    } catch (error) {
      console.log("\n**** error ****\n");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {timeData ? (
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-slate-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      IN
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      OUT
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hours
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Minutes
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Over Hours
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Over Minutes
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-100">
                  {timeData.map((time) => (
                    <tr key={time._id}>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(time.start_time).toLocaleString()}
                        </div>
                      </td>

                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(time.end_time).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  text-center">
                        <div className="text-sm text-gray-500">
                          {time.reg_hours}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  text-center">
                        <div className="text-sm text-gray-500">
                          {time.reg_minutes}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  text-center">
                        <div className="text-sm text-gray-500">
                          {time.over_hours}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  text-center">
                        <div className="text-sm text-gray-500">
                          {time.over_minutes}
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  text-center text-sm font-medium">
                        <a
                          onClick={() => {
                            localStorage.setItem("time_data", [time.start_time,time.end_time]);
                          }}
                          href={`/edit_time/${time._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>LOADING...</p>
      )}
    </div>
  );
}
