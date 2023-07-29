import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

export const Date_Time = ({ token }) => {
  const [dateTimeParams, setDateTimeParams] = useState(null);
  const [dateTimeStart, setdateTimeStart] = useState(null);
  const [dateTimeEnd, setdateTimeEnd] = useState(null);
  const [timeError, setTimeError] = useState(null);

  useEffect(() => {
    const date = DateTime.now().setZone("America/New_York").toISO();
    const min = DateTime.now()
      .setZone("America/New_York")
      .minus({ months: 24 })
      .toISO();
    const max = DateTime.now()
      .setZone("America/New_York")
      .plus({ months: 24 })
      .toISO();

    setDateTimeParams({
      now: date.slice(0, 16),
      min: min.slice(0, 16),
      max: max.slice(0, 16)
    });

    setdateTimeEnd({ end_time: date.slice(0, 16) });
  }, []);

  const startTimeChange = (event) => {
    setTimeError(null);
    setdateTimeStart({
      ...dateTimeStart,
      [event.target.name]: event.target.value
    });
    console.log(dateTimeStart);
  };

  const endTimeChange = (event) => {
    setTimeError(null);
    setdateTimeEnd({
      ...dateTimeEnd,
      [event.target.name]: event.target.value
    });
    console.log(dateTimeEnd);
  };

  const time_sub = async (start_time, end_time) => {
    try {
      const response = await fetch("/api/time/", {
        method: "POST",
        body: JSON.stringify({
          start_time,
          end_time
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        window.location.assign("/dashboard");
      } else {
        setTimeError("An error occured. Please try again.");
      }
    } catch (error) {
      setTimeError(error.message);
      console.log(error);
    }
  };

  const submitTime = (event) => {
    event.preventDefault();
    time_sub(dateTimeStart.start_time, dateTimeEnd.end_time);
  };

  return (
    <div className="relative flex px-2 flex-col justify-center h-[calc(100vh-66px)] overflow-hidden">
      <div className="w-full px-2 bg-slate-400 rounded-md shadow-md lg:max-w-xl dark:bg-gray-800">
        {dateTimeParams ? (
          <form onSubmit={submitTime}>
            <div className="my-4 px-2 pb-4 bg-slate-200 flex flex-col justify-center rounded-sm dark:bg-slate-500">
              <label
                className="mt-2 mb-8 font-bold text-center text-2xl"
                htmlFor="start_time"
              >
                Start Time
              </label>

              <input
                className="text-center text-xl font-semibold"
                type="datetime-local"
                id="start_time"
                name="start_time"
                defaultValue={dateTimeParams.now}
                min={dateTimeParams.min}
                max={dateTimeParams.max}
                onChange={startTimeChange}
              ></input>
            </div>
            <div className="mb-8 px-2 pb-4 mt-8 bg-slate-200 flex flex-col justify-center rounded-sm dark:bg-slate-500">
              <label
                className="mt-2 mb-8 font-bold text-center text-2xl"
                htmlFor="end_time"
              >
                End Time
              </label>

              <input
                className="text-center text-xl font-semibold"
                type="datetime-local"
                id="end_time"
                name="end_time"
                defaultValue={dateTimeParams.now}
                min={dateTimeParams.min}
                max={dateTimeParams.max}
                onChange={endTimeChange}
              ></input>
            </div>
            <div className="mt-6 mb-4">
              <button
                type="submit"
                className="block mx-auto w-[80%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </div>
            {timeError ? (
              <p className="my-2 font-semibold text-red-600 text-center">
                {timeError}
              </p>
            ) : (
              false
            )}
          </form>
        ) : (
          <p>LOADING</p>
        )}
      </div>
    </div>
  );
};
