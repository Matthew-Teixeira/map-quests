import { useEffect, useState } from "react";
import { Date_Time_Edit } from "../components/Time/Date_Time_Edit";
import Auth from "../utils/auth";
import { DateTime } from "luxon";

const EditTime = () => {
  const [token, setToken] = useState(null);
  const [timeData, setTimeData] = useState(null);

  useEffect(() => {
    const userToken = Auth.getToken();
    setToken(userToken);
    if (!userToken) {
      window.location.assign("/login");
    }
    console.log(token);

    set_time_data();
  }, []);

  const set_time_data = async () => {
    const time_data = localStorage.getItem("time_data").split(",");
    setTimeData({
      start_time: time_data[0],
      end_time: time_data[1]
    });
    console.log({
      start_time: time_data[0],
      end_time: time_data[1]
    });
    setTimeout(() => {
      localStorage.removeItem("time_data");
    }, 1000);
  };
  return <div>{timeData ? <Date_Time_Edit token={token} timeData={timeData} /> : <>LOADING...</>}</div>;
};

export default EditTime;
